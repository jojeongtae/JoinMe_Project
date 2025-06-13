package com.example.project_joinme.service;

import com.example.project_joinme.data.dto.MessageDTO;
import com.example.project_joinme.data.entity.MessageTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.MessageRepository;
import com.example.project_joinme.data.repository.UserRepository;
import com.example.project_joinme.exception.MyException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public void sendMessage(MessageDTO dto) {
        UserTbl sender = userRepository.findByUsernameWithLogin(dto.getSenderUsername());
        UserTbl receiver = userRepository.findByUsernameWithLogin(dto.getReceiverUsername());
        MessageTbl message = MessageTbl.builder()
                .sender(sender)
                .receiver(receiver)
                .content(dto.getContent())
                .read(false)
                .sendTime(Instant.now())
                .build();
        messageRepository.save(message);

    }

    public List<MessageDTO> getChat(String user1, String user2) {
        List<MessageTbl> messages = messageRepository.findChatBetween(user1, user2);
        List<MessageDTO> result = new ArrayList<>();
        for (MessageTbl message : messages) {
            result.add(new MessageDTO(
                    message.getSender().getUsername(),
                    message.getReceiver().getUsername(),
                    message.getContent(),
                    message.getSendTime()
            ));
        }
        return result;
    }

    public List<MessageDTO> getAllMessages(String username) {
        List<MessageTbl> messageTbls = messageRepository.findAllMessagesByUser(username);
        if (messageTbls.isEmpty()) {
            throw new MyException("온 메세지가 없습니다 ");
        }
        List<MessageDTO> result = new ArrayList<>();
        for (MessageTbl message : messageTbls) {
            MessageDTO messageDTO = MessageDTO.builder()
                    .content(message.getContent())
                    .receiverUsername(message.getReceiver().getUsername())
                    .senderUsername(message.getSender().getUsername())
                    .sendTime(message.getSendTime())
                    .build();
            result.add(messageDTO);
        }
        return result;

    }

}
