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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DateService {
    private final DateDAO  dateDAO;
    private final UserRepository userRepository;
    private final DateRepository  dateRepository;
    private final CourseRepository courseRepository;
    // 센더기준 모든 데이트내용 가져오기
    public List<DateDTO> getDatesBySender(String sender) {
        UserTbl user = userRepository.findByUsernameWithLogin(sender);
        List<DateTbl> dateTbls = dateRepository.findAllByDateSender(user);

        return dateTbls.stream().map(d -> DateDTO.builder()
                        .sender(d.getDateSender().getUsername())
                        .receiver(d.getDateReceiver().getUsername())
                        .sendTime(d.getSend_time())
                        .course_id(d.getCourse_id().getId()) // 또는 getCourseId() 식으로
                        .dateTime(d.getDate_time())
                        .build())
                .toList();
    }
    // 리시버기준 모든 데이트내용 가져오기
    public List<DateDTO> getDatesByReceiver(String receiverUsername) {
        UserTbl receiver = userRepository.findByUsernameWithLogin(receiverUsername);
        List<DateTbl> dateTbls = dateRepository.findAllByDateReceiver(receiver);

        return dateTbls.stream().map(d -> DateDTO.builder()
                        .sender(d.getDateSender().getUsername())
                        .receiver(d.getDateReceiver().getUsername())
                        .sendTime(d.getSend_time())
                        .course_id(d.getCourse_id().getId())
                        .dateTime(d.getDate_time())
                        .build())
                .toList();
    }
    public DateDTO addDate(DateDTO dateDTO){
        UserTbl sender = userRepository.findById(dateDTO.getSender()).orElse(null);
        UserTbl receiver = userRepository.findById(dateDTO.getReceiver()).orElse(null);
        CourseTbl course = courseRepository.findById(dateDTO.getCourse_id()).orElse(null);
        DateTbl dateTbl = DateTbl.builder()
                .dateSender(sender)
                .dateReceiver(receiver)
                .course_id(course)
                .date_time(dateDTO.getDateTime())
                .send_time(dateDTO.getSendTime())
                .build();
        DateTbl save = dateDAO.addDate(dateTbl);
        return DateDTO.builder()
                .sender(save.getDateSender().getUsername())
                .receiver(save.getDateReceiver().getUsername())
                .sendTime(save.getSend_time())
                .dateTime(save.getDate_time())
                .course_id(save.getCourse_id().getId())
                .build();
    }
    @Transactional
    public boolean deleteDate(DateDTO dateDTO) {
        UserTbl sender = userRepository.findById(dateDTO.getSender()).orElse(null);
        UserTbl receiver = userRepository.findById(dateDTO.getReceiver()).orElse(null);
        CourseTbl course = courseRepository.findById(dateDTO.getCourse_id()).orElse(null);
        dateRepository.deleteDate(sender, receiver, course);
        return true;
    }
}
