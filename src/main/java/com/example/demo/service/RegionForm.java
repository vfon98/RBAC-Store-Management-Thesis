package com.example.demo.service;

import com.example.demo.entity.Region;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegionForm {

    @NotBlank
    @NotNull
    @Size(min = 4)
    private String name;

    private String description;

    public static Region buildRegion(RegionForm regionForm) {
        return Region.builder()
                .name(regionForm.getName())
                .description(regionForm.getDescription())
                .build();
    }

}
