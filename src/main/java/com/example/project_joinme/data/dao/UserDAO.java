package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDAO {
    private final UserRepository userRepository;

    public List<UserTbl> findAllUser(){
        return userRepository.findAll();
    }
    public UserTbl findByUsername(String username) {
        return this.userRepository.findById(username).orElse(null);
    }

    // 회원정보추가
    public UserTbl addUserInfo(UserTbl user) {
        return userRepository.save(user);
    }

    // 회원정보 수정
    public UserTbl updateUserInfo(UserTbl user) {
        return userRepository.save(user);
    }

    public UserTbl findByUsernameWithLogin(String username) {
        return userRepository.findByUsernameWithLogin(username);
    }

    // 회원탈퇴
    public void deleteUser(UserTbl user) {
        this.userRepository.delete(user);
    }


}
