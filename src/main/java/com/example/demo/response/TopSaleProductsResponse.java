package com.example.demo.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopSaleProductsResponse {

    private Integer productId;

    private String productName;

    private Long total;

}
