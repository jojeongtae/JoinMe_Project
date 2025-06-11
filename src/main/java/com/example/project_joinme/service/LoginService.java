package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LoginDAO;
import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.exception.DuplicateIdException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
    private final LoginDAO loginDAO;
    // 로그인
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginTbl loginInfo = this.loginDAO.findByUsername(username);
        if (loginInfo == null) {
            throw new UsernameNotFoundException(username);
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(loginInfo.getRole()));
        return new User(loginInfo.getUsername(), loginInfo.getPassword(), grantedAuthorities);
    }

    // 회원가입
    public AddUserDTO addUser(AddUserDTO addUserDTO) {
        if(this.loginDAO.existsByUsername(addUserDTO.getUsername())) {
            throw new DuplicateIdException("동일 ID(username) 존재");
        }
        LoginTbl loginTbl = LoginTbl.builder()
                .username(addUserDTO.getUsername())
                .password(addUserDTO.getPassword())
                .role("ROLE_USER")
                .phone(addUserDTO.getPhone())
                .build();
        this.loginDAO.addUser(loginTbl);
        return AddUserDTO.builder()
                .username(addUserDTO.getUsername())
                .phone(addUserDTO.getPhone())
                .build();
    }


}
