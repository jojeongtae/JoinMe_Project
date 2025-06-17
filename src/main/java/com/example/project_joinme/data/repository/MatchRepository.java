package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends CrudRepository<MatchTbl, Integer> {
    @Query(value = "SELECT * FROM match_tbl", nativeQuery = true)
    List<MatchTbl> findAllMatches();

//    @Query(value = "select * from match_tbl where match_male=:username or match_female=:username", nativeQuery = true)
//    List<MatchTbl> findMatchesByUsername(@Param("username") String username);
    @Query("SELECT m FROM MatchTbl m WHERE m.matchmale.username = :username OR m.matchfemale.username = :username")
    List<MatchTbl> findMatchesByUsername(@Param("username") String username);
    // matchmale, matchfemale 기준으로 삭제


    @Modifying
    @Transactional
    @Query("DELETE FROM MatchTbl m WHERE (m.matchmale = :user1 AND m.matchfemale = :user2) OR (m.matchmale = :user2 AND m.matchfemale = :user1)")
    void deleteBidirectional(@Param("user1") UserTbl user1, @Param("user2") UserTbl user2);



}
