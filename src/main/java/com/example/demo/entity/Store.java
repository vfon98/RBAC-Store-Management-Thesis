package com.example.demo.entity;

import com.example.demo.form.StoreForm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "store")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Store  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String address;

    private String email;

    private String phone;

    private Status status;

    private Date createdAt;

    @JsonIgnore
    @OneToMany(mappedBy = "store")
    private List<StoreProduct> storeProductList;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Staff createdBy;

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.REMOVE)
    private List<Staff> staff;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    public enum Status {
        Open, Closed
    }

    public static Store updateData(Store store, StoreForm storeForm) {
        store.setName(storeForm.getName());
        store.setAddress(storeForm.getAddress());
        store.setPhone(storeForm.getPhone());
        store.setEmail(storeForm.getEmail());
        store.setStatus(storeForm.getStatus());
        return store;
    }

}
