package com.example.demo.enums;

public enum OrderStatusEnum {
//    STANDARD
    PENDING,
    SHIPPING,
    SHIPPING_SUCCESS,

//    EXTENDED
    STORE_APPROVED,
    CUSTOMER_CANCELED,
    STORE_CANCELED,
    CUSTOMER_REJECTED,
    SHIPPING_FAILED,
    INVALID,
    EXPIRED,
    CUSTOMER_REFUND
}
