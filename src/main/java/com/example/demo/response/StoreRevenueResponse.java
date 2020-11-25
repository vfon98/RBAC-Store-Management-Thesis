package com.example.demo.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreRevenueResponse {

    private Integer storeId;

    private String storeName;

    private Long totalQuantity;

    private BigDecimal totalRevenue;

//    private Long totalOrder;

}
