package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.dto.AdminMatchDTO;
import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.repository.HateRepository;
import com.example.project_joinme.data.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDAO {
    private final HateRepository adminRepository;
    private final MatchRepository matchRepository;

    public List<HateDTO> findByReportFive() {
        List<LoginTbl> reportUser = adminRepository.findByHatedFive();
        return reportUser.stream().map(u -> new HateDTO(u.getUsername(), u.getUsernickname())).toList();
    }

    public List<MatchTbl> findAllMatches() {
        return this.matchRepository.findAllMatches();
    }
}
