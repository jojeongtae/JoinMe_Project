package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.AddCourseDTO;
import com.example.project_joinme.data.dto.AdminMatchDTO;
import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin")
public class AdminController {
    private final AdminService adminService;
    @GetMapping("/matches")
    public ResponseEntity<List<AdminMatchDTO>> getAllMatches() {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.findAllMatches());
    }
    @PostMapping("/add-course")
    public ResponseEntity<AddCourseDTO> addCourse(@RequestBody AddCourseDTO addCourseDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.addCourse(addCourseDTO));
    }
    @GetMapping("/five-hatelist")
    public ResponseEntity<List<HateDTO>> getAllHates() {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.findAllHates());
    }

}
