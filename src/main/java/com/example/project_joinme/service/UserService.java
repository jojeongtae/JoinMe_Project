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

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDAO userDAO;
    private final LoginDAO loginDAO;
    private final HateRepository hateRepository;
    private final UserRepository userRepository;


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
    public UserInfoDTO updateUserInfo(UserInfoDTO userInfoDTO){
        LoginTbl loginTbl = this.loginDAO.findByUsername(userInfoDTO.getUsername());

        UserTbl userTbl = UserTbl.builder()
                .username(loginTbl.getUsername())
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
        this.userDAO.updateUserInfo(userTbl);
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

    // 신고하기
    public HateDTO selectHateByUsername(String haterUser , String hatedUser) {
        UserTbl hater = userRepository.findByUsernameWithLogin(haterUser);
        UserTbl hated = userRepository.findByUsernameWithLogin(hatedUser);

        if (hater == null || hated == null) {
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }

        HateTbl saveHate = HateTbl.builder()
                .hater(hater)
                .hated(hated)
                .hatetime(Instant.now())
                .build();

        this.hateRepository.save(saveHate);
        return HateDTO.builder()
                .hater(saveHate.getHater().getUsername())
                .hated(saveHate.getHated().getUsername())
                .hate_time(Instant.now())
                .build();
    }


}
