package com.example.demo.response;

import com.example.demo.entity.Product;
import com.example.demo.entity.Store;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BestSellerProductsResponse {

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "description" })
    private Product product;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Store store;

    private Long totalSold;

}
