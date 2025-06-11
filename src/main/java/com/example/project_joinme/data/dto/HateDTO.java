package com.example.project_joinme.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HateDTO {
    private String hater; //신고자
    private String hated; //신고받은자
    private Instant hate_time;
    private Integer report_count;
}
