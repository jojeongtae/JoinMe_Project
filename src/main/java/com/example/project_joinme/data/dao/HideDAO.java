package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.dto.HideuserDTO;
import com.example.project_joinme.data.entity.HideuserTbl;
import com.example.project_joinme.data.repository.HideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HideDAO {
    private final HideRepository hideRepository;
    public List<HideuserTbl> getAllHideuserDTO() {
        return this.hideRepository.findAll();
    }
    public HideuserTbl getHideuserById(Integer id) {
        return this.hideRepository.findById(id).orElse(null);
    }
    public boolean deleteHideuser(Integer id) {
        if (hideRepository.existsById(id)) {
            this.hideRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
