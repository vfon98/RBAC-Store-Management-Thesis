package com.example.demo.service;

import com.example.demo.repository.OrderItemRepository;
import com.example.demo.response.TopSaleProductsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartServiceImpl implements ChartService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<TopSaleProductsResponse> getTopSaleProducts() {
        return orderItemRepository.getTopSaleProducts();
    }

    public List<TopSaleProductsResponse> getTopSaleProductsByStoreId(Integer storeId) {
        return orderItemRepository.getTopSaleProductsByStoreId(storeId);
    }
}
