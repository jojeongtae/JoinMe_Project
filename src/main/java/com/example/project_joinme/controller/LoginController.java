package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.service.LoginService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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


    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh_token", "");
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        response.addCookie(cookie);
        return ResponseEntity.ok("로그아웃 완료");
    // 회원탈퇴
    @DeleteMapping(value = "/user-delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        this.loginService.deleteUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("회원탈퇴 성공");

    }


}
