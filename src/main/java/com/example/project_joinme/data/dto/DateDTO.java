package com.example.project_joinme.data.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DateDTO {
    private String sender;
    private String receiver;
    private Instant sendTime;
    private Integer course_id;
    private Instant dateTime;
}
