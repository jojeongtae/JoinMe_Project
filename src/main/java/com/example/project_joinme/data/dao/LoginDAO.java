package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginDAO {
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    public LoginTbl addUser(LoginTbl loginTbl) {
        LoginTbl saveLogin = LoginTbl.builder()
                .username(loginTbl.getUsername())
                .password(passwordEncoder.encode(loginTbl.getPassword()))
                .role(loginTbl.getRole())
                .phone(loginTbl.getPhone())
                .build();
        return this.loginRepository.save(saveLogin);
    }

    public LoginTbl findByUsername(String username) {
        return this.loginRepository.findById(username).orElse(null);
    }

    public Boolean existsByUsername(String username) {
        return this.loginRepository.existsById(username);
    }

    public void deleteByUsername(String username) {loginRepository.deleteById(username);}

}
