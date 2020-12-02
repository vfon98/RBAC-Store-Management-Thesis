package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.enums.OrderStatusEnum;
import lombok.Data;

@Data
public class OrderUpdateForm {
    private OrderStatusEnum status;
}
