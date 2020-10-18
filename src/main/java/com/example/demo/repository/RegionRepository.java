package com.example.demo.repository;

import com.example.demo.entity.Region;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {

    @Override
    @EntityGraph("region_store")
    List<Region> findAll(Sort sort);

}
