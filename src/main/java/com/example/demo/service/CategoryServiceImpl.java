package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.entity.Staff;
import com.example.demo.exception.CategoryNotFoundException;
import com.example.demo.form.CategoryForm;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.response.SimpleCategoryResponse;
import com.example.demo.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private StaffServiceImpl staffService;
    private SecurityUtil securityUtil;

    @Autowired
    public CategoryServiceImpl(
            CategoryRepository categoryRepository,
            StaffServiceImpl staffService,
            SecurityUtil securityUtil) {
        this.categoryRepository = categoryRepository;
        this.securityUtil = securityUtil;
        this.staffService = staffService;
    }

    @Override
    public List<SimpleCategoryResponse> findAll() {
        List<Category> categoryList = categoryRepository.findAll();
        return categoryList.stream()
                .map(SimpleCategoryResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public Category findById(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Override
    public Category save(CategoryForm categoryForm) {
        Staff createByStaff = staffService.findByUsername(
                securityUtil.getCurrentPrincipal().getUsername());
        Category category = CategoryForm.buildCategory(categoryForm, createByStaff);
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Integer id, CategoryForm categoryForm) {
        Category category = findById(id);
        return categoryRepository.save(Category.updateDate(category, categoryForm));
    }

    @Override
    public String deleteById(Integer id) {
        categoryRepository.deleteById(id);
        return String.valueOf(id);
    }

}
