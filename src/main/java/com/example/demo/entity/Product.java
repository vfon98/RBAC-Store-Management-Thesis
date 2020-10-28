package com.example.demo.entity;

import com.example.demo.form.ProductForm;
import com.example.demo.service.CategoryService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.math.BigDecimal;
import java.net.PortUnreachableException;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "product")
@NamedEntityGraph(name = "graph.Product.categories", attributeNodes = @NamedAttributeNode("categories"))
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private BigDecimal price;

    private Integer quantity;

    @OneToOne
    @JoinColumn(name = "id_store")
    private Store store;

    private Date createdAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Staff createdBy;

    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "id_product"),
            inverseJoinColumns = @JoinColumn(name = "id_category"))
    private Set<Category> categories;

    @ManyToMany
    @JoinTable(
            name = "product_image",
            joinColumns = @JoinColumn(name = "id_product"),
            inverseJoinColumns = @JoinColumn(name ="id_image"))
    private Collection<Image> images;

    public static Product updateData(Product product, ProductForm productForm, Set<Category> categorySet) {
        product.setName(productForm.getName());
        product.setPrice(productForm.getPrice());
        product.setCategories(categorySet);
        product.setQuantity(productForm.getQuantity());
        return product;
    }
}
