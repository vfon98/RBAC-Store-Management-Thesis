package com.example.demo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CloudinaryResponse {

    private String public_id;
    private String asset_id;
    private Integer version;
    private String signature;
    private Integer width;
    private Integer height;
    private String format;
    private String resource_type;
    private String created_at;
    private Double bytes;
    private String type;
    private String url;
    private String secure_url;
    private String etag;

}
