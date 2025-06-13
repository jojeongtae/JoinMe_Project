package com.example.project_joinme.service;

import com.example.project_joinme.data.dto.HideuserDTO;
import com.example.project_joinme.data.entity.HideuserTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.HideRepository;
import com.example.project_joinme.data.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HideService {
    private final HideRepository hideRepository;
    private final UserRepository userRepository;


    public List<HideuserDTO> findAll() {
        List<HideuserTbl> tbl = this.hideRepository.findAll();
        List<HideuserDTO> list = new ArrayList<>();
        for (HideuserTbl hideuserTbl : tbl) {
            HideuserDTO hideuserDTO = HideuserDTO.builder()
                    .id(hideuserTbl.getId())
                    .hide_time(hideuserTbl.getHide_time())
                    .username(hideuserTbl.getUsername().getUsername())
                    .build();
            list.add(hideuserDTO);
        }
        return list;
    }

    public void hideUser(HideuserDTO dto) {
        UserTbl userTbl = this.userRepository.findById(dto.getUsername()).orElse(null);
        if (userTbl == null) {
            throw new UsernameNotFoundException("Username " + dto.getUsername() + " not found");
        }
        HideuserTbl hideuserTbl = HideuserTbl.builder()
                .id(dto.getId())
                .username(userTbl)
                .hide_time(Instant.now())
                .build();
        hideRepository.save(hideuserTbl);
    }

    public boolean deleteByUsername(HideuserDTO dto) {
        if (this.hideRepository.existsById(dto.getId())) {
            this.hideRepository.deleteById(dto.getId());
            return true;
        }
        return false;

    }


}
