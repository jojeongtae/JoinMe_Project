package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.MatchDTO;
import com.example.project_joinme.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/match")
public class MatchController {
    private final MatchService matchService;

    @GetMapping(value = "/{username}")
    public ResponseEntity<List<MatchDTO>> getMatchesByUsername(@PathVariable("username") String username) {
        List<MatchDTO> matchDTOS = this.matchService.getMatchesByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(matchDTOS);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMatch(
            @RequestParam(name = "male") String male,
            @RequestParam(name = "female") String female
    ) {
        matchService.deleteMatch(male, female);
        return ResponseEntity.ok("삭제 완료");
    }

}
