package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.CourseDTO;
import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.service.CourseServiec;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CourseController {
    private final CourseServiec courseServiec;

    @GetMapping(value = "/course-list")
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        List<CourseDTO> courseList = this.courseServiec.getAllCourses();
        return ResponseEntity.ok(courseList);
    }

    @GetMapping(value = "/course-by-address")
    public ResponseEntity<List<CourseDTO>> getCourseByAddress(@RequestParam String address) {
        List<CourseDTO> addressCourseList = this.courseServiec.getAddress(address);
        return ResponseEntity.ok(addressCourseList);
    }

    @GetMapping(value = "/course-by-coursename")
    public ResponseEntity<List<CourseDTO>> getCourseByCourseName(@RequestParam String course_name) {
        List<CourseDTO> courseNameList = this.courseServiec.getCourseName(course_name);
        return ResponseEntity.ok(courseNameList);
    }

    @DeleteMapping("/delete-course")
    public ResponseEntity<?> deleteCourse(@RequestParam Integer courseId) {
        boolean result = this.courseServiec.deleteCourse(courseId);
        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body("코스 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("코스 삭제 실패");
    }

    @PutMapping("/update-course")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO updatedCourse = courseServiec.updateCourse(courseDTO);
        return ResponseEntity.ok(updatedCourse);

    }


}
