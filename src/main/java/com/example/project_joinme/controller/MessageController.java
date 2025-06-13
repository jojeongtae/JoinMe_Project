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
    @PostMapping
    public ResponseEntity<Void> sendMessage(@RequestBody MessageDTO messageDTO) {
        this.messageService.sendMessage(messageDTO);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/chat")
    public ResponseEntity<List<MessageDTO>> getAllMessages(@RequestParam String user1, @RequestParam String user2) {
        return ResponseEntity.ok(this.messageService.getChat(user1, user2));
    }
    @GetMapping("/chat-list")
    public ResponseEntity<List<MessageDTO>> getAllMessagesByUser(@RequestParam String username) {
        return ResponseEntity.ok(messageService.getAllMessages(username));
    }
}
