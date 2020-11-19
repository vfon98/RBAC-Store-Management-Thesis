package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class ImportedReceipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_staff")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "id_store")
    private Store store;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            joinColumns = @JoinColumn(name = "id_imported_receipt"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private Collection<Product> products;

    private Integer importedQuantity;

    @CreationTimestamp
    private Date createdAt;

    public static ImportedReceipt buildFrom(Staff staff, Store store,
                                            Collection<Product> products, int importedQuantity) {
        return ImportedReceipt.builder()
                .staff(staff)
                .store(store)
                .products(products)
                .importedQuantity(importedQuantity)
                .build();
    }
}
