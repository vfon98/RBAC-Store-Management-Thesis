package com.example.demo.controller.ui;

import com.example.demo.entity.Order;

import java.util.List;

public interface IOrder {

    List<Order> findAllOrders(Integer status);

    Order findOrderById(Integer id);

    Order changeStatusOrder(Integer id, Order.Status status);

}
