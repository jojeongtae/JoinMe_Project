package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.MatchDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.MatchDTO;
import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchDAO matchDAO;
    private final UserDAO userDAO;

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

}
