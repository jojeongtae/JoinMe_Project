package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.ImageTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageTbl, Long> {
}
