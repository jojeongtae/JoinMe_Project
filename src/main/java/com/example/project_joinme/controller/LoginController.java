package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // 회원탈퇴
    @DeleteMapping(value = "/user-delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        this.loginService.deleteUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("회원탈퇴 성공");
    }


}
