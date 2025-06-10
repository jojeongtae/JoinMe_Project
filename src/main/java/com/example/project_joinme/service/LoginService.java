package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LoginDAO;
import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginDAO loginDAO;

    // 회원가입
    public AddUserDTO addUser(AddUserDTO addUserDTO) {
        if(this.loginDAO.existsByUsername(addUserDTO.getUsername())) {
            throw new DuplicateRequestException("동일 ID(username) 존재");
        }
        LoginTbl loginTbl = LoginTbl.builder()
                .username(addUserDTO.getUsername())
                .password(addUserDTO.getPassword())
                .usernickname(addUserDTO.getUsername())
                .role("ROLE_USER")
                .phone(addUserDTO.getPhone())
                .build();
        this.loginDAO.addUser(loginTbl);

        return AddUserDTO.builder()
                .username(addUserDTO.getUsername())
                .usernickname(addUserDTO.getUsername())
                .phone(addUserDTO.getPhone())
                .build();
    }






}
