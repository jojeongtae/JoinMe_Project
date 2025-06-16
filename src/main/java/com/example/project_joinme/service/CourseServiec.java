package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.CourseDAO;
import com.example.project_joinme.data.dto.CourseDTO;
import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.exception.MyException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiec {

    private final CourseDAO courseDAO;

    // 데이트 코스 조회기능
    // 코스 리스트 전체 확인
    public List<CourseDTO> getAllCourses() {
        return this.courseDAO.findAll().stream()
                .map(course -> CourseDTO.builder()
                        .id(course.getId())
                        .coursename(course.getCoursename())
                        .address(course.getAddress())
                        .body(course.getBody())
                        .updateDate(course.getUpdatetime())
                        .imgpath(course.getImgpath())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getAddress(String address) {
        return this.courseDAO.findByAddress(address).stream()
                .map(addr -> CourseDTO.builder()
                        .id(addr.getId())
                        .coursename(addr.getCoursename())
                        .address(addr.getAddress())
                        .body(addr.getBody())
                        .updateDate(addr.getUpdatetime())
                        .imgpath(addr.getImgpath())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getCourseName(String courseName) {
        return this.courseDAO.findByCourseName(courseName).stream()
                .map(course -> CourseDTO.builder()
                        .id(course.getId())
                        .coursename(course.getCoursename())
                        .address(course.getAddress())
                        .body(course.getBody())
                        .updateDate(course.getUpdatetime())
                        .imgpath(course.getImgpath())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public CourseDTO getCourseId(Integer id) {
        Optional<CourseTbl> tbl = this.courseDAO.findById(id);
        if(tbl.isPresent()) {
            CourseDTO dto = CourseDTO.builder()
                    .id(tbl.get().getId())
                    .coursename(tbl.get().getCoursename())
                    .address(tbl.get().getAddress())
                    .body(tbl.get().getBody())
                    .updateDate(tbl.get().getUpdatetime())
                    .imgpath(tbl.get().getImgpath())
                    .build();
            return dto;
        }
        throw new MyException("아이디 업승");
    }

    public boolean deleteCourse(Integer courseId) {
        return this.courseDAO.deleteCourse(courseId);
    }

    public CourseDTO updateCourse(CourseDTO dto) {
        Optional<CourseTbl> optionalCourse = this.courseDAO.findById(dto.getId());
        if (!optionalCourse.isPresent()) {
            throw new MyException("아이디를 못찾았어용");
        }
        CourseTbl course = optionalCourse.get();

// 기존 객체 수정
        course.setImgpath(dto.getImgpath());
        course.setCoursename(dto.getCoursename());
        course.setAddress(dto.getAddress());
        course.setBody(dto.getBody());

        CourseTbl updatedCourse = courseDAO.updateCourse(course);
        CourseDTO updatedCourseDTO = CourseDTO.builder()
                .id(updatedCourse.getId())
                .coursename(updatedCourse.getCoursename())
                .address(updatedCourse.getAddress())
                .body(updatedCourse.getBody())
                .updateDate(Instant.now())
                .imgpath(updatedCourse.getImgpath())
                .build();
        return updatedCourseDTO;


    }
}
