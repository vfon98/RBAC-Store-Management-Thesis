package com.example.demo.repository;

import com.example.demo.entity.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Override
    @EntityGraph(value = "graph.Category.createdBy")
    Optional<Category> findById(Integer integer);

    Set<Category> findAllByIds(Set<Integer> ids);

}
