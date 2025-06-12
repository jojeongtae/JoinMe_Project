package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.LikeTbl;
import com.example.project_joinme.data.entity.UserTbl;
import com.example.project_joinme.data.repository.LikeRepository;
import com.example.project_joinme.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeDAO {
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    // 좋아요 추가
    @Transactional
    public String addLike(String liker, String liked) {
        UserTbl likerUser = this.userRepository.findById(liker).orElseThrow(() -> new IllegalArgumentException("Liker not found" + liker));
        UserTbl likedUser = this.userRepository.findById(liked).orElseThrow(() -> new IllegalArgumentException("Liked not found" + liked));
        LikeTbl like = LikeTbl.builder()
                .liker(likerUser)
                .liked(likedUser)
                .liketime(Instant.now())
                .build();
        String likedUsername = this.likeRepository.save(like).getLiked().getUsername();
        return likedUsername + " 좋아요 등록 성공";
    }

    // 좋아요 삭제
    @Transactional // 예외 발생 시 자동으로 롤백(rollback)
    public Boolean deleteLike(String liker, String liked) {
        Optional<LikeTbl> likeOpt = this.likeRepository.findByLiker_UsernameAndLiked_Username(liker, liked);
        if (likeOpt.isPresent()) {
            this.likeRepository.delete(likeOpt.get());
            return true;
        }
        return false;
    }

    public Optional<LikeTbl> findByLikerAndLiked(String liker, String liked){
        return this.likeRepository.findByLiker_UsernameAndLiked_Username(liker, liked);
    }

    // 내가 좋아요한 유저 목록 조회
    public List<UserTbl> getLikedUsersByLiker(String liker) {
        return this.likeRepository.findLikedUsersByLiker(liker);
    }

    // 나를 조아요한 유저 목록 조회
    public List<UserTbl> getLikerUsersByLiked(String liked) {
        return this.likeRepository.findLikerUsersByLiked(liked);
    }





}
