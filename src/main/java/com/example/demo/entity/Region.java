package com.example.demo.entity;

import com.example.demo.service.RegionForm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "region")
@NamedEntityGraph(
        name = "region_store",
        attributeNodes = {
                @NamedAttributeNode("stores")
        }
)
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String description;

    private int numberOfStore = 0;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "region")
    @Fetch(FetchMode.JOIN)
    private List<Store> stores;

    public static Region updateData(Region oldRegion, RegionForm regionForm) {
        oldRegion.setName(regionForm.getName());
        oldRegion.setDescription(regionForm.getDescription());
        return oldRegion;
    }
}
