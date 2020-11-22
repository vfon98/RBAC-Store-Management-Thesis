package com.example.demo.response;

import com.example.demo.entity.Product;
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
