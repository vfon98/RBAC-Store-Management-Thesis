package com.example.demo.controller;

import com.example.demo.response.CloudinaryResponse;
import com.example.demo.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/upload")
    public ResponseEntity<CloudinaryResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        CloudinaryResponse response = uploadService.uploadFile(file);
        return ResponseEntity.ok(response);
    }
}
