package com.example.demo.response;

import com.example.demo.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StoreHasProductResponse extends Store {

    private int quantity;

    public StoreHasProductResponse(Store store, int quantity) {
        this.setId(store.getId());
        this.setAddress(store.getAddress());
        this.setName(store.getName());
        this.setEmail(store.getEmail());
        this.setLatitude(store.getLatitude());
        this.setLongitude(store.getLongitude());
        this.setPhone(store.getPhone());
        this.setRegion(store.getRegion());
        this.setStatus(store.getStatus());
        this.quantity = quantity;
    }
}
