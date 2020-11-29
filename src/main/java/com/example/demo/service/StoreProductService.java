package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.Store;
import com.example.demo.entity.StoreProduct;
import com.example.demo.form.ProductImportForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StoreProductService {
    List<StoreProduct> findAll();

    List<StoreProduct> findAllByStore(Store store);
    
    StoreProduct findById(StoreProduct.StoreProductID id);

    List<StoreProduct> findAllByProduct(Product product);

    Page<StoreProduct> findAllByStore(Store store, Pageable pageable);

    void addProductToStore(Integer storeId, Integer productId, Integer quantity, boolean isMultiple);

    boolean importMultipleProductsToStore(Integer storeId, List<ProductImportForm> products);

    void deleteByStore(Store store);

    List<StoreProduct> findAllByProductIsNotIn(List<Product> products);

    void deleteProductFormStore(Integer storeId, Integer productId);

    void save(StoreProduct storeProduct);

    void updateQuantityOfProductInStore(Integer storeId, Integer productId, Integer quantity);
}
