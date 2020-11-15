package com.example.demo.enums;

public enum UserGroupEnums {
    ADMIN("admin"),
    SUBADMIN("subadmin"),
    MANAGER("manager"),
    STAFF("staff"),
    CUSTOMER("customer");

    public final String value;

    UserGroupEnums(String value) {
        this.value = value;
    }

}
