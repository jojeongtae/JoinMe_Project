package com.example.project_joinme.data.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "message_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageTbl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", nullable = false, referencedColumnName = "username")
    private UserTbl sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver", nullable = false, referencedColumnName = "username")
    private UserTbl receiver;

    @Column(nullable = false)
    private String content;

    @Column(name = "send_time", nullable = false)
    private Instant sendTime;

    @Column(name = "`read`") // ← 백틱으로 감싸기
    private boolean read;
}
