package com.example.demo.controller;

import com.example.demo.entity.OrderItem;
import com.example.demo.response.TopSaleProductsResponse;
import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam(value = "storeId", required = false) String storeId,
            @RequestParam(value = "limit", required = false) String limit
    ) {
        List<TopSaleProductsResponse> topSale = chartService.getTopSaleProducts();

        return ResponseEntity.ok(topSale);
    }

    @GetMapping("/products/top-sale/stores/{storeId}")
    public ResponseEntity getTopSaleProductsByStoreId(
            @PathVariable Integer storeId
    ) {
        List<TopSaleProductsResponse> topSale = chartService.getTopSaleProductsByStoreId(storeId);

        return ResponseEntity.ok(topSale);
    }
}
