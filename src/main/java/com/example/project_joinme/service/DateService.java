package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.DateDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.DateDTO;
import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.data.entity.DateTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.CourseRepository;
import com.example.project_joinme.data.repository.DateRepository;
import com.example.project_joinme.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DateService {
    private final DateDAO  dateDAO;
    private final UserRepository userRepository;
    private final DateRepository  dateRepository;
    private final CourseRepository courseRepository;
    public DateDTO addDate(DateDTO dateDTO){
        UserTbl sender = userRepository.findById(dateDTO.getSender()).orElse(null);
        UserTbl receiver = userRepository.findById(dateDTO.getReceiver()).orElse(null);
        CourseTbl course = courseRepository.findById(dateDTO.getCourse_id()).orElse(null);
        DateTbl dateTbl = DateTbl.builder()
                .date_sender(sender)
                .date_receiver(receiver)
                .course_id(course)
                .date_time(dateDTO.getSendTime())
                .build();
        DateTbl save = dateDAO.addDate(dateTbl);
        return DateDTO.builder()
                .sender(save.getDate_sender().getUsername())
                .receiver(save.getDate_receiver().getUsername())
                .sendTime(save.getDate_time())
                .course_id(save.getCourse_id().getId())
                .build();
    }
//    public boolean deleteDate(DateDTO dateDTO) {
//        UserTbl sender = userRepository.findById(dateDTO.getSender()).orElse(null);
//        UserTbl receiver = userRepository.findById(dateDTO.getReceiver()).orElse(null);
//
//    }
}
