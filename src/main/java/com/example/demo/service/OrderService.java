package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Store;

import java.util.List;

public interface OrderService {

    List<Order> findAllOrdersByStore(Store store);

    List<Order> findAllOrdersByStaff(Staff staff);

    List<Order> findAllOrdersByStoreAndStatus(Store store, Order.Status status);

    Order findById(Integer id);

    Order save(Order order);
}
