package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.MatchRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchDAO {
    private final MatchRepository matchRepository;
    
    // 매치기록 추가
    public MatchTbl addMatch(MatchTbl matchTbl) {
        MatchTbl match = MatchTbl.builder()
                .matchmale(matchTbl.getMatchmale())
                .matchfemale(matchTbl.getMatchfemale())
                .matchtime(Instant.now()) // 현재시간 추가
                .build();
        return this.matchRepository.save(match);
    }

    // 나의 매치기록 보기
    public List<MatchTbl> getMatchesByUsername(String username) {
        return this.matchRepository.findMatchesByUsername(username);
    }

    
}
