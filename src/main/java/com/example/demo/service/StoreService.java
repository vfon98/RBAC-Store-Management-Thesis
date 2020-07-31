package com.example.demo.service;

import com.example.demo.entity.Staff;
import com.example.demo.entity.Store;
import com.example.demo.entity.StoreProduct;
import com.example.demo.form.StoreForm;
import com.example.demo.form.StoreUpdateForm;

import java.util.List;
import java.util.Set;

public interface StoreService {

    List<Store> findAll();

    Store findById(Integer id);

    Store save(StoreForm storeForm);

    void addProductToStore(Integer storeId, Integer productId, Integer quantity);

    Store update(Integer id, StoreUpdateForm storeUpdateForm);

    String deleteById(Integer id);

    void addStaffListToStore(Integer storeId, Set<Integer> idStaff);

    List<Staff> findStaffsByStoreAndIsManager(Integer storeId, Boolean isManager);
}
