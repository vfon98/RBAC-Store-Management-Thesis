package com.example.demo.service;

import com.example.demo.response.CloudinaryResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

    CloudinaryResponse uploadFile(MultipartFile file);

    String uploadFileAndGetUrl(MultipartFile file);
}
