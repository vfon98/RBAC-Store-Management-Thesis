package com.example.demo.entity;

import com.example.demo.enums.OrderStatusEnum;
import com.example.demo.enums.PaymentMethodEnums;
import com.example.demo.form.PaymentForm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private BigDecimal totalPrice;

    private Date createdAt;

    private String phone;

    private String shipAddress;

    private String transactionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @Enumerated(EnumType.STRING)
    private OrderStatusEnum status;

    @Enumerated(EnumType.STRING)
    private PaymentMethodEnums paymentMethod;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    public enum Status {
        Shipping, Shipped
    }

    public static Order build(Cart cart, List<CartItem> cartItems, PaymentForm paymentForm, String transactionId) {
        BigDecimal totalPrice = new BigDecimal(0);
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            totalPrice = totalPrice.add(product.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));
        }
        return Order.builder()
                .totalPrice(totalPrice)
                .createdAt(new Date())
                .phone(paymentForm.getPhone())
                .shipAddress(paymentForm.getShipAddress())
                .transactionId(transactionId)
                .staff(cart.getStaff())
                .store(cart.getStore())
                .status(OrderStatusEnum.PENDING)
                .paymentMethod(paymentForm.getPaymentMethod())
                .build();
    }
}
