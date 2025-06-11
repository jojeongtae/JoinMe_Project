package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LikeDAO;
import com.example.project_joinme.data.entity.LikeTbl;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeDAO likeDAO;

    public Boolean addLike(LoginTbl liker, LoginTbl liked) {
        if (this.likeDAO.findByLikerAndLiked(liker, liked).isPresent()) { // 이미 좋아요가 있으면
            return false;
        }
        return likeDAO.addLike(liker, liked);
    }

    public Boolean deleteLike(LoginTbl liker, LoginTbl liked) {

    }



}
