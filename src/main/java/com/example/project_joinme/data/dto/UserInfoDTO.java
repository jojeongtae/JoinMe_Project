package com.example.project_joinme.data.dto;

import com.example.project_joinme.data.entity.LoginTbl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    private String username;
    private String usernickname;
    private String sexuality;
    private Integer age;
    private Integer height;
    private Integer weight;
    private String interest;
    private String address;
    private String introduction;
    private String mbti;
    private String profileimg;
}
