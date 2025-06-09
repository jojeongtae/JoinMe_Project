package com.example.project_joinme.data.repository;


import com.example.project_joinme.data.entity.UserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserTbl,String> {
}
