package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.exception.StoreNotFoundException;
import com.example.demo.form.ProductForm;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.StoreRepository;
import com.example.demo.response.PageableProductResponse;
import com.example.demo.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SecurityUtil securityUtil;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private UploadService uploadService;

    @Override
    public List<Product> findAll() {
        Sort sort = Sort.by("createdAt").descending();
        return productRepository.findAll(sort);
    }

    @Override
    public List<Product> findAllByStore(Store store) {
        return productRepository.findAllByStore(store);
    }

    @Override
    public PageableProductResponse findAllByStoreAndNameMatches(Store store, String term, Pageable pageable) {
        Page<Product> products =
                productRepository.findAllByStoreAndNameContains(store, term, pageable);
        return PageableProductResponse.build(products);
    }

    @Override
    public PageableProductResponse findAllByStoreAndCategoriesIsContainingAndNameMatchesRegex(Store store, Category category, String term, Pageable pageable) {
        Page<Product> products =
                productRepository.findAllByStoreAndCategoriesIsContainingAndNameContains(store, category, term, pageable);
        return PageableProductResponse.build(products);
    }

    @Override
    public PageableProductResponse findAllByStoreAndCategoriesIsContaining(Store store, Category category, Pageable pageable) {
        Page<Product> products =
                productRepository.findAllByStoreAndCategoriesIsContaining(store, category, pageable);
        return PageableProductResponse.build(products);
    }

    @Override
    public PageableProductResponse findAll(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findAll(pageRequest);
        return PageableProductResponse.build(products);
    }

    @Override
    public PageableProductResponse findAll(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return PageableProductResponse.build(products);
    }

    @Override
    public PageableProductResponse findAllByCategoryAndKeywordSearch(Category category, String keyword, Pageable pageable) {
        Page<Product> products =
                productRepository.findAllByCategoriesAndAndNameContains(category, keyword, pageable);
        return PageableProductResponse.build(products);
    }

    @Override
    public Product findById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public Product save(ProductForm productForm, MultipartFile image) {
        Staff createByStaff = securityUtil.getCurrentStaff();
        Set<Category> categories = categoryRepository.findAllByIdIsIn(productForm.getCategories());
//        Store store = storeRepository.findById(productForm.getStoreId())
//                .orElseThrow(() -> new StoreNotFoundException(productForm.getStoreId()));
        Image savedImage = uploadService.uploadFile(image);

        return productRepository.save(
                ProductForm.buildProduct(productForm, null, createByStaff, categories, savedImage));
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product update(Integer id, ProductForm productForm, MultipartFile image) {
        Product product = findById(id);
        Set<Category> categories = categoryRepository.findAllByIdIsIn(productForm.getCategories());

        Image savedImage = uploadService.uploadFile(image);
        return productRepository.save(
                Product.updateData(product, productForm, categories, savedImage));
    }

    @Override
    public Integer delete(Integer id) {
        productRepository.deleteById(id);
        return id;
    }

    @Override
    public void save(List<Product> products) {
        productRepository.saveAll(products);
    }

}
