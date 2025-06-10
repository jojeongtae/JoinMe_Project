package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course_tbl")
public class CourseTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private Integer id;

    @Column(name = "course_name", nullable = false, length = 45)
    private String courseName;

    @Column(name = "address", nullable = false, length = 45)
    private String address;

    @Lob
    @Column(name = "body", nullable = false)
    private String body;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "update_time")
    private Instant updateTime;

}