package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.DateDTO;
import com.example.project_joinme.data.entity.DateTbl;
import com.example.project_joinme.service.DateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/date")
public class DateController {
    private final DateService dateService;
    //센더기준 가져오기
    @GetMapping("/by-sender")
    public ResponseEntity<List<DateDTO>> getBySender(@RequestParam String sender) {
        return ResponseEntity.ok(dateService.getDatesBySender(sender));
    }
    //리시버기준 가져오기
    @GetMapping("/by-receiver")
    public ResponseEntity<List<DateDTO>> getByReceiver(@RequestParam String receiver) {
        return ResponseEntity.ok(dateService.getDatesByReceiver(receiver));
    }
    @PostMapping("/add")
    public ResponseEntity<DateDTO> addDate(@RequestBody DateDTO dateDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(this.dateService.addDate(dateDTO));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteDate(@RequestBody DateDTO dateDTO) {
        if(this.dateService.deleteDate(dateDTO)) {
            return ResponseEntity.status(HttpStatus.OK).body("삭제완료");
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("삭제 실패");
    }
}
