package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.constant.Uploader;
import com.example.demo.entity.Image;
import com.example.demo.response.CloudinaryResponse;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Service
public class UploadServiceImpl implements UploadService {

    @Autowired
    private Cloudinary cloudinaryConfig;

    @Autowired
    private ImageService imageService;


    public Image uploadFile(MultipartFile file) {
        try {
            File uploadedFile = convertMultipartToFile(file);
            Map mapResponse = cloudinaryConfig.uploader().upload(uploadedFile, Uploader.OPTIONS);
            uploadedFile.delete(); // Remove file in local

            ObjectMapper om = new ObjectMapper();
            om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            CloudinaryResponse response = om.convertValue(mapResponse, CloudinaryResponse.class);

            return saveImageToDB(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Image saveImageToDB(CloudinaryResponse response) {
        Image image = Image.builder()
                .publicId(response.getPublic_id())
                .url(response.getUrl())
                .secureUrl(response.getSecure_url())
                .originalName(response.getOriginal_filename())
                .bytes(response.getBytes())
                .etag(response.getEtag())
                .format(response.getFormat())
                .signature(response.getSignature())
                .created_at(response.getCreated_at())
                .build();

        return imageService.save(image);
    }

    private boolean saveMultipleImagesToDB(MultipartFile[] files) {
        return true;
    }

    public String uploadFileAndGetUrl(MultipartFile file) {
        try {
            File uploadedFile = convertMultipartToFile(file);
            Map mapResponse = cloudinaryConfig.uploader().upload(uploadedFile, Uploader.OPTIONS);
            uploadedFile.delete();
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
