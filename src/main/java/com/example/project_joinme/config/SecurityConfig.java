package com.example.project_joinme.config;


import com.example.project_joinme.component.CustomAccessDeniedHandler;
import com.example.project_joinme.component.CustomerUser;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.jwt.JwtFilter;
import com.example.project_joinme.jwt.JwtLoginFilter;
import com.example.project_joinme.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomerUser customerUser;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final UserDAO userDAO;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .logout(logout -> logout.disable())
                .formLogin(formLogin -> formLogin.disable())
                .httpBasic(httpBasicAuth -> httpBasicAuth.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/", "/login", "/signup", "/reissue", "/refresh-cookie").permitAll();
                    auth.requestMatchers("/userinfo").permitAll();  // 개발 중 임시
                    auth.requestMatchers("/userinfo").hasRole("USER");
                    auth.requestMatchers("/admin/**").hasRole("ADMIN");
//                    auth.requestMatchers("/**").hasAnyRole("ADMIN", "USER");

                    auth.anyRequest().authenticated();
                })
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedMethods(List.of("PUT", "GET", "POST", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowedOrigins(List.of("http://localhost:3000"));
                    config.setExposedHeaders(List.of("Authorization"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAt(new JwtLoginFilter(this.authenticationManager(this.authenticationConfiguration), this.jwtUtil,userDAO),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtFilter(this.jwtUtil), JwtLoginFilter.class)
//                .exceptionHandling(exception -> {
//                    exception.accessDeniedHandler(this.customAccessDeniedHandler);
//                    exception.authenticationEntryPoint(this.customerUser);
//                })
        ;

        return http.build();
    }
}
