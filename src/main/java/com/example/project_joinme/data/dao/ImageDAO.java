package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.ImageTbl;
import com.example.project_joinme.data.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageDAO {
    private final ImageRepository imageRepository;

    public ImageTbl addImage(ImageTbl imageTbl) {
        return imageRepository.save(imageTbl);
    }


}
