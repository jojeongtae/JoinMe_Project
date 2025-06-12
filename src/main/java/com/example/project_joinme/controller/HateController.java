package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.service.HateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HateController {
    private final HateService hateService;
    // 신고하기
    @PostMapping(value = "/hate-user")
    public ResponseEntity<HateDTO> hateUserInfo(@RequestParam String hater , @RequestParam String hated) {
        HateDTO reportUser = this.hateService.selectHateByUsername(hater,hated);
        return ResponseEntity.status(HttpStatus.OK).body(reportUser);
    }
    //유저 개인 신고 목록 조회
    @GetMapping(value = "/hate-list/{hater}")
    public ResponseEntity<List<HateDTO>> findHateByUsername(@PathVariable String hater) {
        List<HateDTO> reportList = this.hateService.getMyHateLogs(hater);
        return ResponseEntity.status(HttpStatus.OK).body(reportList);
    }
}
