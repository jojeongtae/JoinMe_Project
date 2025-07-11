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
@Table(name = "like_tbl")
public class LikeTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "liker", nullable = false)
    private UserTbl liker;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "liked", nullable = false)
    private UserTbl liked;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "like_time", nullable = false)
    private Instant liketime;

}