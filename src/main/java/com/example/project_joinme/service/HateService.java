package com.example.project_joinme.service;

import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.entity.HateTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.HateRepository;
import com.example.project_joinme.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HateService {
    private final HateRepository hateRepository;
    private final UserRepository userRepository;
    // 신고하기
    public HateDTO selectHateByUsername(String haterUser, String hatedUser) {
        UserTbl hater = userRepository.findByUsernameWithLogin(haterUser);
        UserTbl hated = userRepository.findByUsernameWithLogin(hatedUser);

        if (hater == null || hated == null) {
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }

        HateTbl saveHate = HateTbl.builder()
                .hater(hater)
                .hated(hated)
                .hatetime(Instant.now())
                .build();

        this.hateRepository.save(saveHate);
        return HateDTO.builder()
                .hater(saveHate.getHater().getUsername())
                .hated(saveHate.getHated().getUsername())
                .hate_time(Instant.now())
                .build();
    }

    //내가 신고한 목록 보기
    public List<HateDTO> getMyHateLogs(String haterUsername) {
        List<HateTbl> hates = hateRepository.findByHater_Username(haterUsername);
        List<HateDTO> result = new ArrayList<>();
        for (HateTbl h : hates) {
            result.add(new HateDTO(
                    h.getHater().getUsername(),
                    h.getHated().getUsername(),
                    h.getHatetime(),
                    h.getId()
            ));
        }
        return result;
    }
}
