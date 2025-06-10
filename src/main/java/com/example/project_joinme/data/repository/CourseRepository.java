package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.CourseTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<CourseTbl,String> {
    @Query(value = "select * from course_tbl where address = :address",nativeQuery = true)
    List<CourseTbl> findByAddress(@Param("address") String address);
    @Query(value = "select * from course_tbl where course_name = :course_name",nativeQuery = true)
    CourseTbl findByCourseName(@Param("course_name") String course_name);
}
