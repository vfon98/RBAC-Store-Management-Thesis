package com.example.demo.form;

import com.example.demo.entity.Product;
import com.example.demo.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportedReceiptForm {

    private Store store;

    private Collection<Product> products;

    private Integer importedQuantity;

}
