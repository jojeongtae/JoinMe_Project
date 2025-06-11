package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 회원정보추가
    @PostMapping(value = "/add-info")
    public ResponseEntity<UserInfoDTO> addUserInfo(@RequestBody UserInfoDTO userInfoDTO) {
        UserInfoDTO saveUserinfoDTO = userService.addUserInfo(userInfoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveUserinfoDTO);
    }

    // 회원정보수정
    @PutMapping(value = "/update-info")
    public  ResponseEntity<UserInfoDTO> updateUserInfo(@RequestBody UserInfoDTO userInfoDTO) {
        UserInfoDTO saveUserinfoDTO = userService.updateUserInfo(userInfoDTO);
        return ResponseEntity.status(HttpStatus.OK).body(saveUserinfoDTO);
    }


}
