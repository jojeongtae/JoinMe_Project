package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private UserTbl hater;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hated", nullable = false)
    private UserTbl hated;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "hate_time")
    private Instant hatetime;

}