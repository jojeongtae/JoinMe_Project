package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.MatchDTO;
import com.example.project_joinme.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @GetMapping(value = "/match/{username}")
    public ResponseEntity<List<MatchDTO>> getMatchesByUsername(@PathVariable("username") String username) {
        List<MatchDTO> matchDTOS = this.matchService.getMatchesByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(matchDTOS);
    }

}
