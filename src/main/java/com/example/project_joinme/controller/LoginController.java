package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    // 회원가입
    @PostMapping(value = "/signup")
    public ResponseEntity<String> addUser(@RequestBody AddUserDTO addUserDTO) {
        this.loginService.addUser(addUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
    }


}
