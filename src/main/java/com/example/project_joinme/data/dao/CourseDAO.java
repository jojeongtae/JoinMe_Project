package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.data.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseDAO {
    private final CourseRepository courseRepository;

    public List<CourseTbl> findAll() {
        return courseRepository.findAll();
    }

    public List<CourseTbl> findByAddress(String address) {
        return this.courseRepository.findByAddress(address);
    }
    public CourseTbl findByCourseName(String course_name) {
        return this.courseRepository.findByCourseName(course_name);
    }
    public CourseTbl addCourse(String course_name, String address,String body) {
        CourseTbl course = CourseTbl.builder()
                .coursename(course_name)
                .body(body)
                .address(address)
                .updateTime(Instant.now())
                .build();
        return this.courseRepository.save(course);
    }
}
