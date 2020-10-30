package com.example.demo.service;

import com.example.demo.entity.Image;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

    Image uploadFile(MultipartFile file);

    String uploadFileAndGetUrl(MultipartFile file);
}
