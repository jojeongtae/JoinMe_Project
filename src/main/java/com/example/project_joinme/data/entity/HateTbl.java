package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "hate_tbl")
public class HateTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hater", nullable = false)
    private LoginTbl hater;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hated", nullable = false)
    private LoginTbl hated;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "hate_time")
    private Instant hateTime;

}