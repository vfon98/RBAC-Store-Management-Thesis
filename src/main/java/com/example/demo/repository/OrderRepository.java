package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Store;
import com.example.demo.enums.OrderStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findAllByStaff(Staff staff);

    List<Order> findAllByStore(Store store);

    List<Order> findAllByStoreAndStatus(Store store, OrderStatusEnum status);
}
