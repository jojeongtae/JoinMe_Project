package com.example.project_joinme.data.dto;

import com.example.project_joinme.data.entity.UserTbl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchDTO {
    private String username;
    private String matchername;
    private Instant matchtime;
}
