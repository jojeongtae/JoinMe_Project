package com.example.project_joinme.data.dao;


import com.example.project_joinme.data.dto.AdminMatchDTO;
import com.example.project_joinme.data.dto.HateDTO;
import com.example.project_joinme.data.dto.MatchDTO;

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
    private final HateRepository hateRepository;

   public List<HateDTO> getAllHateLog(){
       return this.hateRepository.findAll().stream().map(
               h -> new HateDTO(
                       h.getHated().getUsername(),
                       h.getHater().getUsername(),
                       h.getHatetime(),
                       null
               )).toList();
   }


    public List<MatchTbl> findAllMatches() {
        return this.matchRepository.findAllMatches();
    }
    public List<HateDTO> getUsersWithManyHates() {
        List<Object[]> rows = hateRepository.findUsersWithMoreThanFiveHates();

        return rows.stream()
                .map(row -> new HateDTO(
                        null,                          // hater는 없음
                        (String) row[0],               // hated
                        null,                          // hate_time도 없음
                        ((Number) row[1]).intValue()   // report_count
                ))
                .toList();
    }
}
