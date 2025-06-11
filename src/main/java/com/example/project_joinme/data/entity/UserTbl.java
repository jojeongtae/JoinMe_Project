package com.example.project_joinme.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_tbl")
public class UserTbl {
    @Id
    @Column(name = "username", nullable = false, length = 40)
    private String username;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "username", nullable = false)
    private LoginTbl logintbl;

    @Column(name = "sexuality", nullable = false, length = 10)
    private String sexuality;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @Column(name = "interest", length = 200)
    private String interest;

    @Column(name = "address", nullable = false, length = 45)
    private String address;

    @Lob
    @Column(name = "introduction")
    private String introduction;

    @Column(name = "mbti", length = 10)
    private String mbti;

    @Column(name = "profileimg", length = 200)
    private String profileimg;

    @ColumnDefault("0")
    @Column(name = "liked")
    private Integer liked;

    @Column(name = "usernickname", nullable = false, length = 100)
    private String usernickname;

}