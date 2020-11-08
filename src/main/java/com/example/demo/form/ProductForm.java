package com.example.demo.form;

import com.example.demo.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductForm {

    @NotNull
    private String name;

    private BigDecimal price;

    private Integer quantity;

    private Integer discount;

    private Integer storeId;

    Set<Integer> categories;

    public static Product buildProduct(
            ProductForm productForm,
            Store store,
            Staff createByStaff,
            Set<Category> categories,
            Image savedImage
    ) {
        return Product.builder()
                .name(productForm.getName())
                .price(productForm.getPrice())
                .quantity(productForm.getQuantity())
                .store(store)
                .images(List.of(savedImage))
                .createdAt(new Date())
                .createdBy(createByStaff)
                .categories(categories).build();
    }
}
