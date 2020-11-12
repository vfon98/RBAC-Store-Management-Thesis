package com.example.demo.form;

import com.example.demo.entity.Region;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Store;
import com.example.demo.entity.Store.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreForm {

    @NotBlank
    private String name;

    private String address;

    private Double latitude;

    private Double longitude;

    @Email
    private String email;

    @Pattern(regexp = "\\d{1,11}")
    private String phone;

    private Status status;

    private Integer regionId;

    public static Store buildStore(StoreForm storeForm, Staff createdBy, Region region) {
        return Store.builder()
                .name(storeForm.getName())
                .address(storeForm.getAddress())
                .latitude(storeForm.getLatitude())
                .longitude(storeForm.getLongitude())
                .email(storeForm.getEmail())
                .phone(storeForm.getPhone())
                .status(storeForm.getStatus())
                .region(region)
                .createdBy(createdBy)
                .createdAt(new Date()).build();
    }

}
