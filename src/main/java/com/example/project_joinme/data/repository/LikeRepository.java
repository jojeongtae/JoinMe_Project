package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.LikeTbl;
import com.example.project_joinme.data.entity.UserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeTbl, Integer> {

    // liker와 liked로 like찾기
    Optional<LikeTbl> findByLiker_UsernameAndLiked_Username(String liker, String liked);

    // 내가 좋아요한 유저 목록 조회
    @Query("SELECT l.liked FROM LikeTbl l WHERE l.liker.username = :liker")
    List<UserTbl> findLikedUsersByLiker(@Param("liker") String liker);

    // 나를 조아요한 유저 목록 조회
    @Query("SELECT l.liker FROM LikeTbl l WHERE l.liked.username = :liked")
    List<UserTbl> findLikerUsersByLiked(@Param("liked") String liked);


}
