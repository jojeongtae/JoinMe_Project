package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.CourseDAO;
import com.example.project_joinme.data.dto.CourseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
                        .coursename(course.getCoursename())
                        .address(course.getAddress())
                        .body(course.getBody())
                        .updateDate(course.getUpdatetime())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getAddress(String address){
        return this.courseDAO.findByAddress(address).stream()
                .map(addr -> CourseDTO.builder()
                        .coursename(addr.getCoursename())
                        .address(addr.getAddress())
                        .body(addr.getBody())
                        .updateDate(addr.getUpdatetime())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getCourseName(String courseName) {
        return this.courseDAO.findByCourseName(courseName).stream()
                .map(course -> CourseDTO.builder()
                        .coursename(course.getCoursename())
                        .address(course.getAddress())
                        .body(course.getBody())
                        .updateDate(course.getUpdatetime())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
