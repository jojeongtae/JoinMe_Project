package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDAO {
    private final UserRepository userRepository;
    public UserTbl findByUsername(String username) {
        return this.userRepository.findById(username).orElse(null);
    }

    // 회원정보추가
    public UserTbl addUserInfo(UserTbl user) {
        return userRepository.save(user);
    }
    public UserTbl findByUsernameWithLogin(String username) {
        return userRepository.findByUsernameWithLogin(username);
    }

}
