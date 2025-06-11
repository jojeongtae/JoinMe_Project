package com.example.project_joinme.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import java.util.List;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Override
    public void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        /* 1️⃣ 헤더 존재 + Bearer 여부 확인 */
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);   // 인증 없이 다음 필터
            return;
        }

        /* 2️⃣ "Bearer " 이후 토큰 추출 */
        String token = header.substring(7);

        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            response.sendError(456, "Token expired");
            return;
        } catch (io.jsonwebtoken.MalformedJwtException e) {       // ⬅️ 직접 캐치
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Malformed JWT");
            return;
        }

        /* 4️⃣ access 토큰인지 확인 */
        if (!"access".equals(jwtUtil.getCategory(token))) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalid");
            return;
        }

        /* 5️⃣ SecurityContext에 인증 객체 주입 */
        String username = jwtUtil.getUsername(token);
        String role     = jwtUtil.getRole(token);
        List<GrantedAuthority> auths = List.of(new SimpleGrantedAuthority("ROLE_" + role));
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(new User(username, "", auths), null, auths);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
