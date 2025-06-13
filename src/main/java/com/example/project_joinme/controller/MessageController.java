package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.MessageDTO;
import com.example.project_joinme.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;
    //채팅보내기
    @PostMapping
    public ResponseEntity<Void> sendMessage(@RequestBody MessageDTO messageDTO) {
        this.messageService.sendMessage(messageDTO);
        return ResponseEntity.ok().build();
    }
    //채팅기록 읽음처리
    @GetMapping("/chat")
    public ResponseEntity<List<MessageDTO>> getAllMessages(@RequestParam String user1, @RequestParam String user2) {
        return ResponseEntity.ok(this.messageService.getChat(user1, user2));
    }
    @GetMapping("/chat-list")
    public ResponseEntity<List<MessageDTO>> getAllMessagesByUser(@RequestParam String username) {
        return ResponseEntity.ok(messageService.getAllMessages(username));
    }
    @GetMapping("/unread-count")
    public ResponseEntity<Integer> getUnreadMessages(@RequestParam String username) {
        return ResponseEntity.ok(this.messageService.getUnreadMessageCount(username));
    }
}
