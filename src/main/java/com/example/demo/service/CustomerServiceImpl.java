package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.enums.OrderStatusEnum;
import com.example.demo.enums.PaymentMethodEnums;
import com.example.demo.exception.*;
import com.example.demo.form.CartItemMergeForm;
import com.example.demo.form.CartItemUpdateForm;
import com.example.demo.form.PaymentForm;
import com.example.demo.repository.*;
import com.example.demo.response.*;
import com.example.demo.security.SecurityUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service(value = "customerService")
public class CustomerServiceImpl implements CustomerService {

    @Value("${stripe.secret.key}")
    private String stripe_api_key;

    private SecurityUtil securityUtil;
    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private OrderRepository orderRepository;
    private OrderItemRepository orderItemRepository;

    private ProductService productService;
    private StoreService storeService;
    private CategoryService categoryService;
    private StoreProductService storeProductService;
    private StaffService staffService;
    private BestSellerProductRepository bestSellerProductRepository;

    @Autowired
    public CustomerServiceImpl(SecurityUtil securityUtil,
                               CartRepository cartRepository,
                               CartItemRepository cartItemRepository,
                               OrderRepository orderRepository,
                               OrderItemRepository orderItemRepository,
                               ProductService productService,
                               StoreService storeService,
                               CategoryService categoryService,
                               StoreProductService storeProductService,
                               StaffService staffService,
                               BestSellerProductRepository bestSellerProductRepository) {

        this.securityUtil = securityUtil;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;

        this.productService = productService;
        this.storeService = storeService;
        this.categoryService = categoryService;
        this.storeProductService = storeProductService;
        this.staffService = staffService;
        this.bestSellerProductRepository = bestSellerProductRepository;
    }

    @Override
    public CartResponse getMyCart() {
        Cart cart = getCartByCurrentStaff();
        if (cart != null) {
            List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);
            return CartResponse.build(cart, cartItems);
        }

        Staff staff = securityUtil.getCurrentStaff();
        cart = cartRepository.save(new Cart(null, staff, null, new Date()));
        return CartResponse.build(cart, Collections.emptyList());
    }

    @Override
    public CartItemResponse addCartItem(Integer storeId, Integer productId, Integer quantity) throws JsonProcessingException {
        Cart cart = getCartByCurrentStaff();
        Product product = productService.findById(productId);

        Store store = storeService.findById(storeId);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem(null, cart, product, store, 0, new Date()));

        if (cartItem.getQuantity() + quantity > product.getQuantity()) {
            throw new NotEnoughQuantityException("not enough quantity !!!");
        }

        if (cart.getStore() == null) {
            cart.setStore(store);
            cartRepository.save(cart);
        } else {
            if (!cart.getStore().getId().equals(storeId)) {
                throw new ProductNotSameStoreException(Collections.singletonList(productId));
            }
        }

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        return CartItemResponse.build(cartItemRepository.save(cartItem));
    }

    @Override
    public void removeCartItem(Integer idCartItem) {
        Cart cart = getCartByCurrentStaff();
        cartItemRepository.deleteByIdAndCart(idCartItem, cart);

        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);
        if (cartItems.size() == 0) {
            cart.setStore(null);
            cartRepository.save(cart);
        }
    }

    @Override
    public List<Integer> updateQuantityCartItems(List<CartItemUpdateForm> itemUpdateForms) {
        return updateCart(itemUpdateForms);
    }

    @Override
    public List<Integer> mergeCart(List<CartItemMergeForm> cartItemMergeForms) throws JsonProcessingException {
        List<Integer> invalid = new ArrayList<>();

        Cart cart = getCartByCurrentStaff();
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);

        List<Integer> idsProductNotSameStore = new ArrayList<>();
        if (cart.getStore() == null) {
            Integer firstStoreId = cartItemMergeForms.get(0).getStoreId();
            for (int i = 1; i < cartItemMergeForms.size(); i++) {
                Integer nextStoreId = cartItemMergeForms.get(i).getStoreId();
                if (!nextStoreId.equals(firstStoreId)) {
                    idsProductNotSameStore.add(cartItemMergeForms.get(i).getProductId());
                }
            }
        } else {
            idsProductNotSameStore = cartItemMergeForms.stream()
                    .filter(cartItemMergeForm -> !cartItemMergeForm.getStoreId().equals(cart.getStore().getId()))
                    .map(CartItemMergeForm::getProductId)
                    .collect(Collectors.toList());
        }

        if (idsProductNotSameStore.size() != 0) {
            throw new ProductNotSameStoreException(idsProductNotSameStore);
        }

        cartItemMergeForms.forEach(cartItemMergeForm -> {
            CartItem cartItem = getCartItemInCart(cartItemMergeForm, cartItems);

            int quantity = (cartItem == null)
                    ? cartItemMergeForm.getQuantity()
                    : cartItem.getQuantity() + cartItemMergeForm.getQuantity();

            Product product = (cartItem == null)
                    ? storeService.getProductById(cartItemMergeForm.getStoreId(), cartItemMergeForm.getProductId())
                    : cartItem.getProduct();

            if (cartItem == null) {
                Store store = storeService.findById(cartItemMergeForm.getStoreId());
                cartItem = new CartItem(null, cart, product, store, Integer.MIN_VALUE, new Date());
                cartItems.add(cartItem);
            }

            if (product.getQuantity() < quantity) {
                invalid.add(cartItemMergeForm.getProductId());
            } else {
                cartItem.setQuantity(quantity);
            }
        });

        cart.setStore(cartItems.get(0).getStore());
        cartRepository.save(cart);
        cartItemRepository.saveAll(cartItems);
        return invalid;
    }

    @Override
    public List<ProductResponse> findProductsByStoreAndCategory(Integer storeId, Integer categoryId) {
        Store store = storeService.findById(storeId);

        return storeProductService.findAllByStore(store).stream()
                .filter(storeProduct -> {
                    if (categoryId != -1) {
                        return storeProduct.getProduct().getCategories().stream()
                                .anyMatch(category -> category.getId().equals(categoryId));
                    }
                    return true;
                })
                .map(storeProduct -> ProductResponse.build(storeProduct, store.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public Product getProductDetails(Integer productId) {
//        Product product = productService.findById(productId);
//        List<StoreProduct> storeProducts = storeProductService.findAllByProduct(product);
//        storeProducts.stream().forEach(storeProduct -> {
//            Store store = storeProduct.getStore();
//            Integer id = store.getId();
//        });
        return productService.findById(productId);
    }

    @Override
    public List<StoreHasProductResponse> getStoreListFromProductId(Integer productId) {
        List<StoreHasProductResponse> storeList = new ArrayList<>();
        Product product = productService.findById(productId);
        List<StoreProduct> storeProducts = storeProductService.findAllByProduct(product);
        storeProducts.stream().forEach(storeProduct -> {
            Store store= storeProduct.getStore();
            storeList.add(new StoreHasProductResponse(store, storeProduct.getQuantity()));
        });

        return storeList;
    }

    @Override
    public PageableProductResponse searchProducts(
            Integer storeId, Integer categoryId, Pageable pageable, String keyword, String priceFrom, String priceTo) {
//        Store store = storeService.findById(storeId);

        PageableProductResponse response;
        if (categoryId == -1) {
            response =
//                    productService.findAllByStoreAndNameMatches(store, keyword, pageable);
                    productService.findAll(keyword, pageable);
        } else {
            Category category = categoryService.findById(categoryId);
            response =
//                    productService.findAllByStoreAndCategoriesIsContainingAndNameMatchesRegex(store, category, keyword, pageable);
                    productService.findAllByCategoryAndKeywordSearch(category, keyword, pageable);
        }

        response = addStockStatus(response, storeId);

        if (storeId != null && storeId > 0) {
            Store store = storeService.findById(storeId);

            List<ProductResponse> productResponses = response.getProducts().stream().map(product -> {
                product.setStoreName(store.getName());
                return product;
            }).collect(Collectors.toList());

            response.setProducts(productResponses);
        } else if (StringUtils.isNotBlank(priceFrom) && StringUtils.isNotBlank(priceTo)) {
            List<ProductResponse> productResponses = response.getProducts().stream()
                    .filter(product ->
                            product.getPrice().doubleValue() >= Double.valueOf(priceFrom) &&
                            product.getPrice().doubleValue() <= Double.valueOf(priceTo))
                    .collect(Collectors.toList());

            response.setProducts(productResponses);
        }


        return response;
    }

    private PageableProductResponse addStockStatus(PageableProductResponse response, Integer storeId) {
        List<StoreProduct> storeProductList;
        if (storeId != null && storeId > 0) {
            Store store = storeService.findById(storeId);
            storeProductList = storeProductService.findAllByStore(store);
        } else {
            storeProductList = storeProductService.findAll();
        }

        // Check if StoreProduct table has this productId => inStock
        List<StoreProduct> finalStoreProductList = storeProductList;
        List<ProductResponse> productResponses = response.getProducts().stream().map(product -> {
            boolean existed = finalStoreProductList.stream()
                    .anyMatch(storeProduct -> storeProduct.getProduct().getId().equals(product.getId()));
            product.setOutStock(!existed);
            return product;
        }).collect(Collectors.toList());

        response.setProducts(productResponses);
        return response;
    }

    @Override
    public PageableProductResponse findProductsByStoreAndCategory(Integer storeId, Integer categoryId, Pageable pageable) {
        Store store = storeService.findById(storeId);
        Category category = categoryService.findById(categoryId);

        return productService.findAllByStoreAndCategoriesIsContaining(store, category, pageable);
    }

    @Override
    public void clearCart(Integer cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException(String.valueOf(cartId)));
        cartItemRepository.deleteByCart(cart);

        cart.setStore(null);
        cartRepository.save(cart);
    }

    @Override
    public Charge paymentCheckout(PaymentForm paymentForm) throws StripeException {
        Charge charge = pay(paymentForm);

        Cart cart = cartRepository.findByStaff(securityUtil.getCurrentStaff())
                .orElseThrow(() -> new CartNotFoundException("... unknown"));
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);

        Order order = Order.build(cart, cartItems, paymentForm, charge.getId());
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> OrderItem.build(cartItem, order))
                .collect(Collectors.toList());

//        updateProductQuantity(cartItems);

        cartItemRepository.deleteAll(cartItems);

        orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        cart.setStore(null);
        cartRepository.save(cart);

        return charge;
    }

    @Override
    public List<Order> findAllOrder() {
        return orderRepository.findAllByStaff(securityUtil.getCurrentStaff());
    }

    @Override
    public List<Order> findAllOrdersByStore(Integer storeId) {
        Store store = storeService.findById(storeId);
        return orderRepository.findAllByStore(store);
    }

    @Override
    public List<Order> findAllOrdersByStoreAndStatus(Integer storeId, OrderStatusEnum status) {
        Store store = storeService.findById(storeId);
        return orderRepository.findAllByStoreAndStatus(store, status);
    }

    @Override
    public Order updateOrderStatus(Integer orderId, OrderUpdateForm orderUpdateForm) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        order.setStatus(orderUpdateForm.getStatus());
        return orderRepository.save(order);
    }

    @Override
    public List findTop10BestSellerProducts() {
        List<BestSellerProduct> bestSellerProducts = orderItemRepository.getTop10BestSellerProducts();
        List<BestSellerProductsResponse> topBestSellers = bestSellerProductRepository.findTopByInsertedAtDesc();
        return topBestSellers;
    }

    private CartItem getCartItemInCart(CartItemMergeForm cartItemMergeForm, List<CartItem> cartItems) {
        CartItem temp = null;
        Optional<CartItem> optionalCartItem = cartItems.stream()
                .filter(cartItem -> {
                    Product product = cartItem.getProduct();
                    return product.getId().equals(cartItemMergeForm.getProductId());
                })
                .findFirst();
        if (optionalCartItem.isPresent()) temp = optionalCartItem.get();

        return temp;
    }

    private Cart getCartByCurrentStaff() {
        Optional<Cart> optionalCart = cartRepository.findByStaff(securityUtil.getCurrentStaff());
        return optionalCart.orElse(null);
    }

    private Charge pay(PaymentForm paymentForm) throws StripeException {
        if (paymentForm.getPaymentMethod().equals(PaymentMethodEnums.CASH)) {
            return new Charge();
        }

        Stripe.apiKey = stripe_api_key;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentForm.getTotalPrice() * 100);
        params.put("currency", "usd");
        params.put("source", paymentForm.getStripeToken());
        params.put("description", "Charge With User " + securityUtil.getCurrentStaff().getId());

        return Charge.create(params);
    }

    private List<Integer> updateCart(List<CartItemUpdateForm> cartItemUpdateForms) {
        List<Integer> invalid = new ArrayList<>();

        Cart cart = getCartByCurrentStaff();

        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);

        for (CartItemUpdateForm cartItemUpdateForm : cartItemUpdateForms) {
            CartItem cartItem = cartItems.stream()
                    .filter(c -> c.getId().equals(cartItemUpdateForm.getIdCartItem()))
                    .findFirst()
                    .orElse(null);

            if (cartItem == null) { continue; }

            Product product = cartItem.getProduct();
            if (cartItemUpdateForm.getQuantity() > product.getQuantity()) {
                invalid.add(cartItem.getId());
            } else {
                cartItem.setQuantity(cartItemUpdateForm.getQuantity());
            }
        }

        cartItemRepository.saveAll(cartItems);
        return invalid;
    }

    private void updateProductQuantity(List<CartItem> cartItems) {
        cartItems.forEach(cartItem -> {
            Product product = cartItem.getProduct();
            Integer _quantity = product.getQuantity();

            product.setQuantity(_quantity - cartItem.getQuantity());
            productService.save(product);
        });
    }

}
