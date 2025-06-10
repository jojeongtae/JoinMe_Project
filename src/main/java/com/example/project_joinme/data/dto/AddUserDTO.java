package com.example.project_joinme.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddUserDTO {
    private String username;
    private String password;
    private String usernickname;
    private String phone;
}
