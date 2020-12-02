package com.example.demo.enums;

public enum OrderStatusEnum {
//    STANDARD
    PENDING("pending"),
    SHIPPING("shipping"),
    SHIPPED("shipped"),

//    EXTENDED
    STORE_APPROVED("approved"),
    CUSTOMER_CANCELED("customer_canceled"),
    STORE_CANCELED("store_canceled"),
    CUSTOMER_REJECTED("rejected"),
    SHIPPING_FAILED("failed"),
    INVALID("invalid"),
    EXPIRED("expired"),
    CUSTOMER_REFUND("refund");

    public final String value;

    private OrderStatusEnum(String value) {
        this.value = value;
    }
}
