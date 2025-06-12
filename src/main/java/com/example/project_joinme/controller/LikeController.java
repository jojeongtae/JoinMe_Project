package com.example.project_joinme.controller;

import com.example.project_joinme.data.dto.LikeDTO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    // 좋아요, 매칭
    @PostMapping(value = "/like")
    public ResponseEntity<String> addLike(@RequestBody LikeDTO likeDTO) {
        String result = this.likeService.addLike(likeDTO.getLiker(), likeDTO.getLiked());
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @DeleteMapping(value = "/like")
    public ResponseEntity<String> deleteLike(@RequestBody LikeDTO likeDTO) {
        Boolean result = this.likeService.deleteLike(likeDTO.getLiker(), likeDTO.getLiked());
        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body("like 삭제 완료");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("like 삭제 실패");
        }
    }

    @PostMapping(value = "/like/toggle")
    public ResponseEntity<String> toggleLike(@RequestBody LikeDTO likeDTO) {
        Boolean isLiked = this.likeService.toggleLike(likeDTO.getLiker(), likeDTO.getLiked());
        if (isLiked) { // 좋아요 없으면
            return ResponseEntity.status(HttpStatus.OK).body("like 추가 완료");
        } else { // 좋아요 있으면
            return ResponseEntity.status(HttpStatus.CONFLICT).body("like 삭제 완료");
        }
    }

    // 내가 좋아요한 유저 목록 조회
    @GetMapping(value = "/like/liked-users")
    public ResponseEntity<List<UserInfoDTO>> getLikedUsers(@RequestParam String liker) {
        List<UserInfoDTO> likedUsers = this.likeService.getLikedUsers(liker);
        return ResponseEntity.status(HttpStatus.OK).body(likedUsers);
    }

    // 나를 조아요한 유저 목록 조회
    @GetMapping(value = "/like/liker-users")
    public ResponseEntity<List<UserInfoDTO>> getLikerUsers(@RequestParam String liked) {
        List<UserInfoDTO> likerUsers = this.likeService.getLikerUsers(liked);
        return ResponseEntity.status(HttpStatus.OK).body(likerUsers);
    }


}
