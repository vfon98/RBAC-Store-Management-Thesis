package com.example.demo.service;

import com.example.demo.repository.*;
import com.example.demo.response.AdminStatsResponse;
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
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private StaffRepository staffRepository;

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

//        return response.stream().map(
//                res -> ImportedChartResponse.builder()
//                .date(res.getCreatedAt())
//                .totalImported(res.getImportedQuantity())
//                .build()).collect(Collectors.toList());
        return response;
    }

    public AdminStatsResponse getAdminStatistics() {
        return AdminStatsResponse.builder()
                .totalStore(storeRepository.count())
                .totalProduct(productRepository.count())
                .totalCategory(categoryRepository.count())
                .totalStaff(storeRepository.count())
                .build();
    }
}
