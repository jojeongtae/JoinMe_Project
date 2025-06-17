package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.MatchDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.MatchDTO;
import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.MatchRepository;
import com.example.project_joinme.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchDAO matchDAO;
    private final UserDAO userDAO;
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;

    public List<MatchDTO> getMatchesByUsername(String username) {
        UserTbl user = this.userDAO.findByUsername(username);
        List<MatchTbl> matchTblList = this.matchDAO.getMatchesByUsername(username);
        List<MatchDTO> matchDTOList = new ArrayList<>();

        for (MatchTbl matchTbl : matchTblList) {

            String matchername = user.getSexuality().equals("남성")
                    ? matchTbl.getMatchfemale().getUsername()
                    : matchTbl.getMatchmale().getUsername();

            MatchDTO matchDTO = MatchDTO.builder()
                    .username(user.getUsername())
                    .matchername(matchername)
                    .matchtime(matchTbl.getMatchtime())
                    .build();
            matchDTOList.add(matchDTO);
        }
        return matchDTOList;
    }
    @Transactional
    public void deleteMatch(String username1, String username2) {
        UserTbl user1 = userRepository.findByUsernameWithLogin(username1);
        UserTbl user2 = userRepository.findByUsernameWithLogin(username2);

        if (user1 == null || user2 == null) {
            throw new IllegalArgumentException("해당 유저를 찾을 수 없습니다.");
        }

        matchRepository.deleteBidirectional(user1, user2);
        matchRepository.deleteBidirectional(user1, user2);
    }


}
