package com.example.project_joinme.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HideuserDTO {
    private Integer id;
    private String username;
    private String usernickname;
    private Instant hide_time;
}
