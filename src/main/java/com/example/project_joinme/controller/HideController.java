package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.HideuserDTO;
import com.example.project_joinme.data.repository.HideRepository;
import com.example.project_joinme.service.HideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HideController {
    private final HideService hideService;
    @PostMapping("/hide")
    public ResponseEntity<String> hideUser(@RequestBody HideuserDTO dto) {
        hideService.hideUser(dto);  // void 메서드
        return ResponseEntity.status(HttpStatus.OK).body("숨김 완");
    }
   @DeleteMapping("/hide-delete")
    public ResponseEntity<String> deleteUser(@RequestBody HideuserDTO dto) {
        if (this.hideService.deleteByUsername(dto)){
            return ResponseEntity.status(HttpStatus.OK).body("성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
   }
}
