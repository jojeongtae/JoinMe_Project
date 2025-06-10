package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDAO {
    private final UserRepository userRepository;

    // 회원정보추가
    public UserTbl addUserInfo(UserTbl user) {
        return userRepository.save(user);
    }


}
