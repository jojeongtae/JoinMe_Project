package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "match_tbl")
public class MatchTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_male", nullable = false)
    private LoginTbl matchMale;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_female", nullable = false)
    private LoginTbl matchFemale;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "match_time")
    private Instant matchTime;

}