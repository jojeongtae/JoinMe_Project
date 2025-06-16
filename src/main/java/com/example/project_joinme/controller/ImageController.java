package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.ImageDTO;
import com.example.project_joinme.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping(value = "/upload")
    public ResponseEntity<ImageDTO> uploadImage(@RequestParam("image") MultipartFile file) {

        ImageDTO imageDTO = this.imageService.addImage(file);

        return ResponseEntity.ok().body(imageDTO);
    }


}