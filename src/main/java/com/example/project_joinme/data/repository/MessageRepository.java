package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.MessageTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageTbl, Integer> {
    @Query("""
        SELECT m FROM MessageTbl m
        WHERE (m.sender.username = :user1 AND m.receiver.username = :user2)
           OR (m.sender.username = :user2 AND m.receiver.username = :user1)
        ORDER BY m.sendTime ASC
    """)
    List<MessageTbl> findChatBetween(String user1, String user2);
}
