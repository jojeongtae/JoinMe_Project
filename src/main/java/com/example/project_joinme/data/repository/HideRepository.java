package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.HideuserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HideRepository extends JpaRepository<HideuserTbl,Integer> {

}
