package com.example.demo.service;

import com.example.demo.repository.ImportedReceiptRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.response.ImportedChartResponse;
import com.example.demo.response.StoreRevenueResponse;
import com.example.demo.response.TopSaleProductsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChartServiceImpl implements ChartService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ImportedReceiptRepository importedReceiptRepository;

    public List<TopSaleProductsResponse> getTopSaleProducts() {
        return orderItemRepository.getTopSaleProducts();
    }

    public List<TopSaleProductsResponse> getTopSaleProductsByStoreId(Integer storeId) {
        return orderItemRepository.getTopSaleProductsByStoreId(storeId);
    }

    @Override
    public List<StoreRevenueResponse> getStoreRevenueStatistics() {
        return orderItemRepository.getStoreRevenueStatistics();
    }

    @Override
    public List<ImportedChartResponse> getImportedChartAllStores() {
        var response = importedReceiptRepository.getImportedChartAllStores();

        return response.stream().map(res -> {
            return ImportedChartResponse.builder()
                    .products(null)
                    .date(res.getCreatedAt())
                    .totalImported(res.getImportedQuantity())
                    .build();
        }).collect(Collectors.toList());
    }
}
