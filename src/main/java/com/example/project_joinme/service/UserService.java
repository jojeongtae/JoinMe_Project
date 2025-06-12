package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LoginDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.data.entity.HateTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.HateRepository;
import com.example.project_joinme.data.repository.UserRepository;
import com.example.project_joinme.exception.MyException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.Instant;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDAO userDAO;
    private final LoginDAO loginDAO;
    private final HateRepository hateRepository;
    private final UserRepository userRepository;

    //모든 유저 정보가져오기
    public List<UserInfoDTO> findAllUserInfo() {
        List<UserInfoDTO> userInfoDTOs = new ArrayList<>();
        List<UserTbl> userTbls = this.userDAO.findAllUser();
        for (UserTbl userTbl : userTbls) {
            UserInfoDTO user = UserInfoDTO.builder()
                    .username(userTbl.getUsername())
                    .address(userTbl.getAddress())
                    .mbti(userTbl.getMbti())
                    .usernickname(userTbl.getUsernickname())
                    .weight(userTbl.getWeight())
                    .height(userTbl.getHeight())
                    .sexuality(userTbl.getSexuality())
                    .profileimg(userTbl.getProfileimg())
                    .interest(userTbl.getInterest())
                    .introduction(userTbl.getIntroduction())
                    .age(userTbl.getAge())
                    .build();
            userInfoDTOs.add(user);
        }
        return userInfoDTOs;
    }

    //로그인 한 아이디 정보 주기
    public UserInfoDTO getUserInfo(String username) {
        UserTbl user = userDAO.findByUsernameWithLogin(username);
        if (user == null) {
            throw new MyException("없는 아이디입니다");
        }
        return UserInfoDTO.builder()
                .username(user.getUsername())
                .sexuality(user.getSexuality())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .usernickname(user.getUsernickname())
                .interest(user.getInterest())
                .address(user.getAddress())
                .introduction(user.getIntroduction())
                .mbti(user.getMbti())
                .profileimg(user.getProfileimg())
                .build();

    }

    // 회원정보추가
    public UserInfoDTO addUserInfo(UserInfoDTO userInfoDTO) {

        LoginTbl loginTbl = this.loginDAO.findByUsername(userInfoDTO.getUsername());
        if (loginTbl == null) {
            throw new MyException("로그인 정보가 존재하지 않습니다");
        }
        UserTbl userTbl = UserTbl.builder()
                .logintbl(loginTbl)
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .weight(userInfoDTO.getWeight())
                .usernickname(userInfoDTO.getUsernickname())
                .interest(userInfoDTO.getInterest())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();

        this.userDAO.addUserInfo(userTbl);

        return UserInfoDTO.builder()
                .username(userInfoDTO.getUsername())
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .usernickname(userInfoDTO.getUsernickname())
                .weight(userInfoDTO.getWeight())
                .interest(userInfoDTO.getInterest())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();
    }


    // 회원정보 수정
    public UserInfoDTO updateUserInfo(UserInfoDTO userInfoDTO) {
        LoginTbl loginTbl = this.loginDAO.findByUsername(userInfoDTO.getUsername());

        UserTbl userTbl = UserTbl.builder()
                .username(loginTbl.getUsername())
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .weight(userInfoDTO.getWeight())
                .interest(userInfoDTO.getInterest())
                .usernickname(userInfoDTO.getUsernickname())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();
        this.userDAO.updateUserInfo(userTbl);
        userDAO.addUserInfo(userTbl);

        return UserInfoDTO.builder()
                .username(userInfoDTO.getUsername())
                .sexuality(userInfoDTO.getSexuality())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .usernickname(userInfoDTO.getUsernickname())
                .weight(userInfoDTO.getWeight())
                .interest(userInfoDTO.getInterest())
                .address(userInfoDTO.getAddress())
                .introduction(userInfoDTO.getIntroduction())
                .mbti(userInfoDTO.getMbti())
                .profileimg(userInfoDTO.getProfileimg())
                .build();

    }




}
