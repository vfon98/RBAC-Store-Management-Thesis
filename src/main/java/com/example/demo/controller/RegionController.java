package com.example.demo.controller;

import com.example.demo.entity.Region;
import com.example.demo.service.RegionForm;
import com.example.demo.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RequestMapping("/api/regions")
@RestController
public class RegionController {

    @Autowired
    RegionService regionService;


    @GetMapping
    public ResponseEntity<Collection<Region>> findAllRegions() {
        return ResponseEntity.ok(regionService.findAllRegions());
    }

    @GetMapping("{regionId}")
    public ResponseEntity<Region> findById(@PathVariable Integer regionId) {
        return ResponseEntity.ok(regionService.findById(regionId));
    }

    @PostMapping
    public ResponseEntity<Region> createRegion(@Valid @RequestBody RegionForm regionForm) {
        return ResponseEntity.ok(regionService.createRegion(regionForm));
    }

    @PutMapping("{regionId}")
    public ResponseEntity<Region> updateRegion(
            @PathVariable Integer regionId,
            @Valid @RequestBody RegionForm regionForm) {
        return ResponseEntity.ok(regionService.updateRegion(regionId, regionForm));
    }

    @DeleteMapping("{regionId}")
    public ResponseEntity<Region> deleteRegion(@PathVariable Integer regionId) {
        return ResponseEntity.ok(regionService.deleteRegion(regionId));
    }

}
