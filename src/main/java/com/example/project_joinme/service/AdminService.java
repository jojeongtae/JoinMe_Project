package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.AdminDAO;
import com.example.project_joinme.data.dao.CourseDAO;
import com.example.project_joinme.data.dto.AddCourseDTO;
import com.example.project_joinme.data.dto.AdminMatchDTO;
import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.dto.MatchDTO;
import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.data.entity.MatchTbl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminDAO adminDAO;
    private final CourseDAO courseDAO;

    public List<AdminMatchDTO> findAllMatches() {
        List<MatchTbl> matches = adminDAO.findAllMatches();
        List<AdminMatchDTO> matchDTOS = new ArrayList<>();

        for (MatchTbl match : matches) {
            AdminMatchDTO dto = AdminMatchDTO.builder()
                    .num(match.getId())
                    .userA(match.getMatchMale().getUsernickname())  // 또는 getUsernickname()
                    .userB(match.getMatchFemale().getUsernickname())
                    .matchingTime(match.getMatchTime())
                    .build();
            matchDTOS.add(dto);
        }

        return matchDTOS;
    }
    public AddCourseDTO addCourse(AddCourseDTO addCourseDTO) {
        CourseTbl courseTbl  = this.courseDAO.addCourse(
                addCourseDTO.getCoursename(),
                addCourseDTO.getAddress(),
                addCourseDTO.getBody());
        return AddCourseDTO.builder()
                .coursename(courseTbl.getCoursename())
                .address(addCourseDTO.getAddress())
                .body(addCourseDTO.getBody())
                .updateDate(Instant.now())
                .build();
    }
    public List<HateDTO> findAllHates() {
        List<HateDTO> hates = this.adminDAO.findByReportFive();
        return hates;
    }

}
