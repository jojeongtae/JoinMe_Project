package com.example.project_joinme.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "login_tbl")
public class LoginTbl {
    @Id
    @Column(name = "username", nullable = false, length = 20)
    private String username;

    @Column(name = "password", nullable = false, length = 45)
    private String password;

    @Column(name = "usernickname", nullable = false, length = 45)
    private String usernickname;

    @Column(name = "role", nullable = false, length = 45)
    private String role;

    @Column(name = "phone", nullable = false, length = 45)
    private String phone;

}