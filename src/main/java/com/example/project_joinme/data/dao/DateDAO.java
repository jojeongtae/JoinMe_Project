package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.DateTbl;
import com.example.project_joinme.data.repository.DateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DateDAO {
    private final DateRepository dateRepository;
    public DateTbl addDate(DateTbl dateTbl) {
       return dateRepository.save(dateTbl);
    }
    public boolean deleteDate(Integer id) {
        if (dateRepository.existsById(id)) {
            this.dateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
