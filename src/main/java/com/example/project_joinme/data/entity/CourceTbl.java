package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "cource_tbl")
public class CourceTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private Integer id;

    @Column(name = "cource_name", nullable = false, length = 45)
    private String courceName;

    @Column(name = "address", nullable = false, length = 45)
    private String address;

    @Lob
    @Column(name = "body", nullable = false)
    private String body;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "update_time")
    private Instant updateTime;

}