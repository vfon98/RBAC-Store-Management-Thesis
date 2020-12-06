package com.example.demo.response;

import com.example.demo.entity.CartItem;
import com.example.demo.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Integer id;
    private String name;
    private String storeName;
    private BigDecimal price;
    private Integer quantity;
    private Integer productId;
    private Collection<Image> images;
    private Integer discountPercent = 0;

    public static CartItemResponse build(CartItem cartItem) {
        return new CartItemResponse(
                cartItem.getId(),
                cartItem.getProduct().getName(),
                cartItem.getStore().getName(),
                cartItem.getProduct().getPrice(),
                cartItem.getQuantity(),
                cartItem.getProduct().getId(),
                cartItem.getProduct().getImages(),
                cartItem.getProduct().getDiscountPercent());
    }

}
