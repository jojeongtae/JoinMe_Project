package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.HateTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.UserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HateRepository extends JpaRepository<HateTbl, Integer> {
    @Query(value = "SELECT h.hater, h.hated, h.hate_time, NULL AS report_count FROM hate_tbl h\n" +
            "    WHERE h.hated = :target", nativeQuery = true)
    List<Object[]> findAllHateLogs(@Param("target") String target);

    @Query(value = """
    SELECT h.hated,
           COUNT(*) AS report_count,
           MAX(fifth_time.hate_time) AS fifth_report_time
    FROM hate_tbl h
    JOIN (
        SELECT hated, hate_time
        FROM (
            SELECT *, ROW_NUMBER() OVER (PARTITION BY hated ORDER BY hate_time) AS rn
            FROM hate_tbl
        ) ranked
        WHERE rn = 5
    ) fifth_time ON fifth_time.hated = h.hated
    GROUP BY h.hated
    HAVING report_count >= 5
    """, nativeQuery = true)
    List<Object[]> findUsersWithMoreThanFiveHates();


    List<HateTbl> findByHater_Username(String username);
}
