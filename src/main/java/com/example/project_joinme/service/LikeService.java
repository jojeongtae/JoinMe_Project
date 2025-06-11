package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LikeDAO;
import com.example.project_joinme.data.dto.AddUserDTO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.data.entity.LoginTbl;
import com.example.project_joinme.data.entity.UserTbl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeDAO likeDAO;

    // 좋아요 추가
    public Boolean addLike(String liker, String liked) {
        if (this.likeDAO.findByLikerAndLiked(liker, liked).isPresent()) { // 이미 좋아요가 있으면
            return false;
        }
        return likeDAO.addLike(liker, liked);
    }

    // 좋아요 삭제
    public Boolean deleteLike(String liker, String liked) {
        return this.likeDAO.deleteLike(liker, liked);
    }
    
    // 좋아요 추가/삭제 토클
    public boolean toggleLike(String liker, String liked) {
        if (this.likeDAO.findByLikerAndLiked(liker, liked).isPresent()) { // 좋아요 있으면
            this.likeDAO.deleteLike(liker, liked); // 좋아요 제거
            return false;
        } else { // 좋아요 없으면
            this.likeDAO.addLike(liker, liked); // 좋아요 추가
            return true;
        }
    }

    // 내가 좋아요한 유저 목록 조회
    public List<UserInfoDTO> getLikedUsers(String liker) {
        List<UserTbl> userList = this.likeDAO.getLikedUsersByLiker(liker);
        List<UserInfoDTO> userDTOList = new ArrayList<>();
        for (UserTbl user : userList) {
            UserInfoDTO userInfoDTO = UserInfoDTO.builder()
                    .username(user.getUsername())
                    .usernickname(user.getUsernickname())
                    .sexuality(user.getSexuality())
                    .age(user.getAge())
                    .height(user.getHeight())
                    .weight(user.getWeight())
                    .interest(user.getInterest())
                    .address(user.getAddress())
                    .introduction(user.getIntroduction())
                    .mbti(user.getMbti())
                    .profileimg(user.getProfileimg())
                    .build();
            userDTOList.add(userInfoDTO);
        }
        return userDTOList;
    }

    // 나를 조아요한 유저 목록 조회
    public List<UserInfoDTO> getLikerUsers(String liked) {
        List<UserTbl> userList = this.likeDAO.getLikerUsersByLiked(liked);
        List<UserInfoDTO> userDTOList = new ArrayList<>();
        for (UserTbl user : userList) {
            UserInfoDTO userInfoDTO = UserInfoDTO.builder()
                    .username(user.getUsername())
                    .usernickname(user.getUsernickname())
                    .sexuality(user.getSexuality())
                    .age(user.getAge())
                    .height(user.getHeight())
                    .weight(user.getWeight())
                    .interest(user.getInterest())
                    .address(user.getAddress())
                    .introduction(user.getIntroduction())
                    .mbti(user.getMbti())
                    .profileimg(user.getProfileimg())
                    .build();
            userDTOList.add(userInfoDTO);
        }
        return userDTOList;
    }





}
