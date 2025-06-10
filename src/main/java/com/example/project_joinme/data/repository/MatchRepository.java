package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.MatchTbl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends CrudRepository<MatchTbl, Integer> {
    @Query(value = "SELECT * FROM match_tbl", nativeQuery = true)
    List<MatchTbl> findAllMatches();

}
