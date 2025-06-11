package com.example.project_joinme.jwt;

import com.example.project_joinme.data.dao.LoginDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RequiredArgsConstructor
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDAO userDAO;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = obtainUsername(request);
        String password = obtainPassword(request);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        return this.authenticationManager.authenticate(token);
    }

    public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                         Authentication authResult) throws IOException, ServletException {
        UserDetails user = (UserDetails) authResult.getPrincipal();
        String username = user.getUsername();

        UserTbl userTbl = this.userDAO.findByUsernameWithLogin(username);
        String nickname = userTbl.getLoginTbl().getUsernickname();
        UserInfoDTO dto = UserInfoDTO.builder()
                .username(userTbl.getUsername())
                .usernickname(nickname)
                .sexuality(userTbl.getSexuality())
                .age(userTbl.getAge())
                .height(userTbl.getHeight())
                .weight(userTbl.getWeight())
                .interest(userTbl.getInterest())
                .address(userTbl.getAddress())
                .introduction(userTbl.getIntroduction())
                .mbti(userTbl.getMbti())
                .profileimg(userTbl.getProfileimg())
                .build();

        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority grantedAuthority = iterator.next();

        String role = grantedAuthority.getAuthority();
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("user", dto);
        responseData.put("role", role);
        responseData.put("result", "로그인 성공");
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(responseData);
        String access = this.jwtUtil.createToken("access", username, role, 60 * 10 * 1000L);
        String refresh = this.jwtUtil.createToken("refresh", username, role, 60 * 60 * 24 * 1000L);

        response.addCookie(this.createCookie("refresh", refresh));
        response.addHeader("Authorization", "Bearer " + access);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(json);

    }

    @Override
    public void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                           AuthenticationException failed) throws IOException, ServletException {
    Map<String, Object> responseData = new HashMap<>();
    responseData.put("result", "로그인 실패");
    ObjectMapper objectMapper = new ObjectMapper();
    String json = objectMapper.writeValueAsString(responseData);
    response.setCharacterEncoding("UTF-8");
    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.getWriter().write(json);

    }

    private Cookie createCookie(String key,String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60*60*24*1000);
        return cookie;
    }
}
