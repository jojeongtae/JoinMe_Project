package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LoginDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.exception.MyException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDAO userDAO;
    private final LoginDAO loginDAO;

    // 회원정보추가
    public UserInfoDTO addUserInfo(UserInfoDTO userInfoDTO) {

        LoginTbl loginTbl = this.loginDAO.findByUsername(userInfoDTO.getUsername());
        if (loginTbl == null) {
            throw new MyException("로그인 정보가 존재하지 않습니다");
        }
        UserTbl userTbl = UserTbl.builder()
                .loginTbl(loginTbl)
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .weight(userInfoDTO.getWeight())
                .interest(userInfoDTO.getInterest())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();

        userDAO.addUserInfo(userTbl);

        return UserInfoDTO.builder()
                .username(userInfoDTO.getUsername())
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .weight(userInfoDTO.getWeight())
                .interest(userInfoDTO.getInterest())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();
    }



}
