package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.data.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseDAO {
    private final CourseRepository courseRepository;

    public List<CourseTbl> findAll() {
        return courseRepository.findAll();
    }

    public Optional<CourseTbl> findById(Integer id) {
        return this.courseRepository.findById(id);
    }
    public List<CourseTbl> findByAddress(String address) {
        return this.courseRepository.findByAddress(address);
    }

    public List<CourseTbl> findByCourseName(String course_name) {
        return this.courseRepository.findByCourseName(course_name);
    }

    public CourseTbl addCourse(String course_name, String address, String body, String imgpath) {
        CourseTbl course = CourseTbl.builder()
                .coursename(course_name)
                .body(body)
                .address(address)
                .updatetime(Instant.now())
                .imgpath(imgpath)
                .build();
        return this.courseRepository.save(course);
    }

    public boolean deleteCourse(Integer courseId) {
        Optional<CourseTbl> courseTbl = this.courseRepository.findById(courseId);
        if (courseTbl.isPresent()) {
            this.courseRepository.delete(courseTbl.get());
            return true;
        }
        return false;

    }
    public CourseTbl updateCourse(CourseTbl courseTbl) {
        return this.courseRepository.save(courseTbl);
    }
}
