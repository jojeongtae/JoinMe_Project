package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
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

}
