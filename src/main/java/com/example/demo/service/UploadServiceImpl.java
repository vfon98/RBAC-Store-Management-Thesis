package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.constant.Uploader;
import com.example.demo.response.CloudinaryResponse;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class UploadServiceImpl implements UploadService {

    @Autowired
    private Cloudinary cloudinaryConfig;

    public CloudinaryResponse uploadFile(MultipartFile file) {
        try {
            File uploadedFile = convertMultipartToFile(file);
            Map mapResponse = cloudinaryConfig.uploader().upload(uploadedFile, Uploader.OPTIONS);
            ObjectMapper om = new ObjectMapper();
            om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return om.convertValue(mapResponse, CloudinaryResponse.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String uploadFileAndGetUrl(MultipartFile file) {
        try {
            File uploadedFile = convertMultipartToFile(file);
            Map mapResponse = cloudinaryConfig.uploader().upload(uploadedFile, Uploader.OPTIONS);
            return (String) mapResponse.get("url");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private File convertMultipartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }
}
