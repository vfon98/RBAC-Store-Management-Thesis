package com.example.demo.service;

import com.example.demo.response.StoreRevenueResponse;
import com.example.demo.response.TopSaleProductsResponse;

import java.util.List;

public interface ChartService {
    List<TopSaleProductsResponse> getTopSaleProducts();

    List<TopSaleProductsResponse> getTopSaleProductsByStoreId(Integer storeId);

    List<StoreRevenueResponse> getStoreRevenueStatistics();
}
