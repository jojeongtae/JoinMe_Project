package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.ImageDAO;
import com.example.project_joinme.data.dto.ImageDTO;
import com.example.project_joinme.data.entity.ImageTbl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageDAO imageDAO;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ImageDTO addImage(MultipartFile file){
        try {
            String originalFilename = file.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalFilename;
            Path filePath = Paths.get(uploadDir, fileName);

            Files.createDirectories(filePath.getParent()); // 디렉토리 없으면 생성
            Files.write(filePath, file.getBytes()); // 파일저장*

            // 클라이언트 URL
            String webPath = "http://localhost:8080/images/" + fileName;

            // DB에 경로 저장
            ImageTbl imageTbl = new ImageTbl();
            imageTbl.setPath(webPath);
            this.imageDAO.addImage(imageTbl);

            return ImageDTO.builder()
                    .filePathName(webPath)
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("파일업로드 실패", e);
        }
    }


}
