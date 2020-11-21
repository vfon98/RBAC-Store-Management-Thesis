package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentMethodEnums {
    @JsonProperty("cash")
    CASH("cash"),

    @JsonProperty("online")
    ONLINE("online");

    public final String value;

    private PaymentMethodEnums(String value) {
        this.value = value;
    }
}
