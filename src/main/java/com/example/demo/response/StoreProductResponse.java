package com.example.demo.response;

import com.example.demo.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreProductResponse extends Product {
    private Integer storeProductQuantity;

    public StoreProductResponse(Product product, Integer storeProductQuantity) {
        super(
                product.getId(),
                product.getName(),
                product.getPrice(),
                0,
                product.getQuantity(),
                product.getDescription(),
                product.getStore(),
                product.getCreatedAt(),
                null,
                product.getCategories(),
                product.getImages()
        );
        this.storeProductQuantity = storeProductQuantity;
    }
}
