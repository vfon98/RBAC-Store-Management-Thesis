package com.example.demo.controller.ui;

import com.example.demo.entity.Product;
import com.example.demo.form.ProductForm;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

public interface IProduct {

    Product createProduct(@Valid ProductForm productForm, MultipartFile file);

    Product updateProduct(Integer id, @Valid ProductForm productForm, MultipartFile image);

    Product findProductById(Integer id);

    List<Product> findAllProducts();

    Integer deleteProductById(Integer id);

}
