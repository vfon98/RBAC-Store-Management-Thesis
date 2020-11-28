package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.Store;
import com.example.demo.form.CartItemMergeForm;
import com.example.demo.form.CartItemUpdateForm;
import com.example.demo.form.PaymentForm;
import com.example.demo.response.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerService {

    CartResponse getMyCart();

    CartItemResponse addCartItem(Integer storeId, Integer productId, Integer quantity) throws JsonProcessingException;

    @Transactional void removeCartItem(Integer idCartItem);

    List<Integer> updateQuantityCartItems(List<CartItemUpdateForm> itemUpdateForms);

    List<Integer> mergeCart(List<CartItemMergeForm> cartItemMergeForms) throws JsonProcessingException;

    List<ProductResponse> findProductsByStoreAndCategory(Integer storeId, Integer CategoryId);

    Product getProductDetails(Integer productId);

    List<StoreHasProductResponse> getStoreListFromProductId(Integer productId);

    PageableProductResponse searchProducts(Integer storeId, Integer categoryId, Pageable pageable, String keyword);

    PageableProductResponse findProductsByStoreAndCategory(Integer storeId, Integer categoryId, Pageable pageable);

    void clearCart(Integer cartId);

    Charge paymentCheckout(PaymentForm paymentForm) throws StripeException;

    List<Order> findAllOrder();

    List<Order> findAllOrdersByStore(Integer storeId);

    List<Order> findAllOrdersByStoreAndStatus(Integer storeId, Order.Status status);

    Order updateOrderStatus(Integer orderId, OrderUpdateForm orderUpdateForm);

}
