package com.example.demo.enums;

public enum PaymentMethodEnums {
    CASH("cash"),
    ONLINE("online");

    public final String value;

    private PaymentMethodEnums(String value) {
        this.value = value;
    }
}
