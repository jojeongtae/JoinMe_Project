package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.MessageTbl;
import com.example.project_joinme.data.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageDAO {
    private final MessageRepository messageRepository;


}
