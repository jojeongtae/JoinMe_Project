package com.example.project_joinme.data.repository;


import com.example.project_joinme.data.entity.UserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserTbl,String> {
    @Query("SELECT u FROM UserTbl u JOIN FETCH u.loginTbl WHERE u.username = :username")
    UserTbl findByUsernameWithLogin(@Param("username") String username);
}
