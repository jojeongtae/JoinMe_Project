package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.LikeTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeTbl, Integer> {

    // liked 받은 횟수 찾기 (인기도)
    @Query(value = "select count(*) from like_tbl where liked=:username", nativeQuery = true)
    Integer countLikedByUsername(@Param("username") String username);

    // like좋아요한 횟수
    @Query(value = "select count(*) from like_tbl where liker=:username", nativeQuery = true)
    Integer countLikeByUsername(@Param("username") String username);


    Optional<LikeTbl> findByLikerAndLiked(LoginTbl liker, LoginTbl liked);


}
