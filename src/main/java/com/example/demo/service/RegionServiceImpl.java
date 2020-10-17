package com.example.demo.service;

import com.example.demo.entity.Region;
import com.example.demo.exception.RegionNotFoundException;
import com.example.demo.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public Collection<Region> findAllRegions() {
        return regionRepository.findAll();
    }

    @Override
    public Region findById(Integer regionId) {
        return regionRepository.findById(regionId)
                .orElseThrow(RegionNotFoundException::new);
    }

    @Override
    public Region createRegion(RegionForm regionForm) {
        return regionRepository.save(RegionForm.buildRegion(regionForm));
    }

    @Override
    public Region updateRegion(Integer regionId, RegionForm regionForm) {
        Region oldRegion = findById(regionId);
        return regionRepository.save(Region.updateData(oldRegion, regionForm));
    }

    @Override
    public Region deleteRegion(Integer regionId) {
        Region region = findById(regionId);
        regionRepository.deleteById(regionId);
        return region;
    }

}
