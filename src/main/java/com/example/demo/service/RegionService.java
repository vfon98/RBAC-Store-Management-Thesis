package com.example.demo.service;

import com.example.demo.entity.Region;

import java.util.Collection;

public interface RegionService {

    Collection<Region> findAllRegions();

    Region findById(Integer regionId);

    Region createRegion(RegionForm regionForm);

    Region updateRegion(Integer regionId, RegionForm regionForm);

    Region deleteRegion(Integer regionId);

}