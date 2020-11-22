package com.example.demo.controller;

import com.example.demo.entity.OrderItem;
import com.example.demo.response.TopSaleProductsResponse;
import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/charts")
public class ChartController {

    @Autowired
    private ChartService chartService;

    @GetMapping("/products/top-sale")
    public ResponseEntity getTopSaleProducts(
            @RequestParam(value = "storeId", required = false) Integer storeId,
            @RequestParam(value = "limit", required = false) Integer limit
    ) {
        List<TopSaleProductsResponse> topSale = chartService.getTopSaleProducts();

        return ResponseEntity.ok(topSale);
    }
}
