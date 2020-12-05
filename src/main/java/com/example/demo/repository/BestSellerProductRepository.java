package com.example.demo.repository;

import com.example.demo.entity.BestSellerProduct;
import com.example.demo.response.BestSellerProductsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BestSellerProductRepository extends JpaRepository<BestSellerProduct, Integer> {

    @Query("select new com.example.demo.response.BestSellerProductsResponse(bs.product, bs.store, bs.quantity) " +
            "from BestSellerProduct bs " +
            "where bs.insertedAt = (select max(bs.insertedAt) from bs) " +
            "order by bs.quantity desc")
    List<BestSellerProductsResponse> findTopByInsertedAtDesc();

}
