package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {
    private final UserService userService;

    // 회원정보추가
    @PostMapping(value = "/add-info")
    public ResponseEntity<UserInfoDTO> addUserInfo(@RequestBody UserInfoDTO userInfoDTO) {
        UserInfoDTO saveUserinfoDTO = userService.addUserInfo(userInfoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveUserinfoDTO);
    }
    //한명의 정보 가져오기
    @GetMapping("/userinfo/{username}")
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserInfo(username));
    }

    // 회원정보수정
    @PutMapping(value = "/update-info")
    public  ResponseEntity<UserInfoDTO> updateUserInfo(@RequestBody UserInfoDTO userInfoDTO) {
        UserInfoDTO saveUserinfoDTO = userService.updateUserInfo(userInfoDTO);
        return ResponseEntity.status(HttpStatus.OK).body(saveUserinfoDTO);
    }
    //모든 유저 정보 가져오기
    @GetMapping(value = "/list")
    public ResponseEntity<List<UserInfoDTO>> getAllUsers() {
        System.out.println("SecurityContext 인증: " + SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.findAllUserInfo());
    }





}
