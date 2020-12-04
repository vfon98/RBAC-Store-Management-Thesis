package com.example.demo.service.cron;

import com.example.demo.entity.BestSellerProduct;
import com.example.demo.repository.BestSellerProductRepository;
import com.example.demo.response.BestSellerProductsResponse;
import com.example.demo.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CronServiceImp {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BestSellerProductRepository bestSellerProductRepository;

    @Scheduled(cron = "0 0 0/1 * * ?") // Every hour or each rebuild
    private void runCronForBestSellerProducts() {
        List<BestSellerProductsResponse> bestSellerProductsResponse = customerService.findTop10BestSellerProducts();
        List<BestSellerProduct> bestSellerProducts = bestSellerProductsResponse
                .stream().map(bestSeller -> {
                    return BestSellerProduct.builder()
                            .product(bestSeller.getProduct())
                            .store(bestSeller.getStore())
                            .quantity(bestSeller.getTotalSold())
                            .build();
                }).collect(Collectors.toList());

        var savedRecords = bestSellerProductRepository.saveAll(bestSellerProducts);

        log.info("==== Running CRON JOB: Saved {} records ==== ", savedRecords.size());
    }

}
