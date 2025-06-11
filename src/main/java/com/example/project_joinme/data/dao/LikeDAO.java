package com.example.project_joinme.data.dao;

import com.example.project_joinme.data.entity.LikeTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.repository.LikeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeDAO {
    private final LikeRepository likeRepository;

    // 좋아요 추가
    public Boolean addLike(LoginTbl liker, LoginTbl liked) {
        LikeTbl like = LikeTbl.builder()
                .liker(liker)
                .liked(liked)
                .likeTime(Instant.now())
                .build();
        this.likeRepository.save(like);
        return true;
    }

    // 좋아요 삭제
    @Transactional // 예외 발생 시 자동으로 롤백(rollback)
    public Boolean deleteLike(LoginTbl liker, LoginTbl liked) {
        Optional<LikeTbl> likeOpt = this.likeRepository.findByLikerAndLiked(liker, liked);
        if (likeOpt.isPresent()) {
            this.likeRepository.delete(likeOpt.get());
            return true;
        }
        return false;
    }

    public Optional<LikeTbl> findByLikerAndLiked(LoginTbl liker, LoginTbl liked){
        return this.likeRepository.findByLikerAndLiked(liker, liked);
    }




}
