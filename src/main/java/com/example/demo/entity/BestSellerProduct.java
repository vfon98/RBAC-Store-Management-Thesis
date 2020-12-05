package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class BestSellerProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_store")
    private Store store;

    @OneToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @ColumnDefault("0")
    private long quantity = 0L;

    @CreationTimestamp
    private Date insertedAt;

}
