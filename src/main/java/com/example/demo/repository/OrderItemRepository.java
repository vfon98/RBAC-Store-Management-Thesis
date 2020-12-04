package com.example.demo.repository;

import com.example.demo.entity.OrderItem;
import com.example.demo.response.StoreRevenueResponse;
import com.example.demo.response.TopSaleProductsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    @Query("select new com.example.demo.response.TopSaleProductsResponse(product.id, product.name, sum(quantity)) " +
            "FROM OrderItem " +
            "WHERE product.id is not null " +
            "GROUP BY product.id " +
            "ORDER BY SUM(quantity) DESC")
    List<TopSaleProductsResponse> getTopSaleProducts();

    @Query("select new com.example.demo.response.TopSaleProductsResponse(product.id, product.name, sum(quantity)) " +
            "FROM OrderItem " +
            "WHERE product.id is not null " +
            "AND store.id = :storeId " +
            "GROUP BY product.id " +
            "ORDER BY SUM(quantity) DESC")
    List<TopSaleProductsResponse> getTopSaleProductsByStoreId(@Param("storeId") Integer storeId);

    @Query("select new com.example.demo.response.BestSellerProductsResponse(oi.product, oi.store, sum(oi.quantity)) FROM OrderItem oi " +
            "where oi.product.id is not null " +
            "group by oi.product.id " +
            "order by sum(oi.quantity) desc, oi.createdAt desc")
    List getTop10BestSellerProducts();

    @Query("SELECT NEW com.example.demo.response.StoreRevenueResponse(store.id, store.name, sum(quantity), sum(product.price)) " +
            "FROM OrderItem " +
            "WHERE store.id is not null " +
            "GROUP BY store.id")
    List<StoreRevenueResponse> getStoreRevenueStatistics();
}
