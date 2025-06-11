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

    private static final List<String> EXCLUDE_URLS = List.of("/signup", "/login", "/refresh-cookie");

    @Override
    public void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        // 인증 필요 없는 경로면 필터 동작 안 함
        if (EXCLUDE_URLS.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            response.sendError(456, "Token expired");
            return;
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Malformed JWT");
            return;
        }

        if (!"access".equals(jwtUtil.getCategory(token))) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalid");
            return;
        }

        String username = jwtUtil.getUsername(token);
        String role     = jwtUtil.getRole(token);
        List<GrantedAuthority> auths = List.of(new SimpleGrantedAuthority("ROLE_" + role));
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(new User(username, "", auths), null, auths);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}