package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.HateTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HateRepository extends JpaRepository<HateTbl,String> {
    @Query(value = "select h.hated from hate_tbl h where h.hater.id = :haterId",nativeQuery = true)
    List<LoginTbl> findByHated(@Param("haterId") String haterId);
    @Query(value = "SELECT l.username, l.usernickname, COUNT(h.hated) AS report_count FROM hate_tbl h\n" +
            "JOIN login_tbl l ON h.hated = l.username GROUP BY h.hated HAVING COUNT(h.hated) >= 5",nativeQuery = true)
    List<LoginTbl> findByHatedFive();
}
