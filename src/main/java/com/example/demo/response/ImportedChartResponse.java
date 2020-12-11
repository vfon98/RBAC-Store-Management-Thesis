package com.example.demo.response;

import com.example.demo.entity.Product;
import io.swagger.models.auth.In;
import lombok.*;

import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportedChartResponse {

    private Collection<Product> products;

    private Date date;

    private Integer totalImported;

}
