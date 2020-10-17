package com.example.demo.entity;

import com.example.demo.service.RegionForm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String description;

    private Integer numberOfStore = 0;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "region")
    private List<Store> stores;

    public static Region updateData(Region oldRegion, RegionForm regionForm) {
        oldRegion.setName(regionForm.getName());
        oldRegion.setName(regionForm.getDescription());
        return oldRegion;
    }
}
