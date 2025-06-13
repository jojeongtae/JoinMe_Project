package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.DateDTO;
import com.example.project_joinme.service.DateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/date")
public class DateController {
    private final DateService dateService;
    @PostMapping("/add")
    public ResponseEntity<DateDTO> addDate(@RequestBody DateDTO dateDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(this.dateService.addDate(dateDTO));
    }
}
