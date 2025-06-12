package com.example.project_joinme.service;

import com.example.project_joinme.data.dao.LikeDAO;
import com.example.project_joinme.data.dao.MatchDAO;
import com.example.project_joinme.data.dao.UserDAO;
import com.example.project_joinme.data.dto.UserInfoDTO;
import com.example.project_joinme.data.entity.MatchTbl;
import com.example.project_joinme.data.entity.UserTbl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeDAO likeDAO;
    private final MatchDAO matchDAO;
    private final UserDAO userDAO;


    // 좋아요 추가 & 매칭
    public String addLike(String liker, String liked) {
        UserTbl likerUserInfo = this.userDAO.findByUsername(liker);
        UserTbl likedUserInfo = this.userDAO.findByUsername(liked);

        if (this.likeDAO.findByLikerAndLiked(liker, liked).isPresent()) { // 동일한 좋아요가 있으면
            throw new IllegalArgumentException("이미 좋아요 했습니다.");
        }

        if (likerUserInfo.getSexuality().equals(likedUserInfo.getSexuality())) { // 상대방과 나의 성이 동성이면
            throw new IllegalArgumentException("동성에게 좋아요 할 수 없습니다.");
        }

        // 상대방이 나의 like가 없다면 -> like등록
        if(this.likeDAO.findByLikerAndLiked(liked, liker).orElse(null) == null) {
            return this.likeDAO.addLike(liker, liked);
        } else { // 상대방이 나의 like가 있다면 -> 매칭
            this.likeDAO.addLike(liker, liked);
            if (likerUserInfo.getSexuality().equals("남성") && likedUserInfo.getSexuality().equals("여성")) { // 내가 남성,상대가 여성 이면
                MatchTbl match = MatchTbl.builder()
                        .matchmale(likerUserInfo)
                        .matchfemale(likedUserInfo)
                        .build();
                MatchTbl matchResult = this.matchDAO.addMatch(match);
                return matchResult.getMatchfemale().getUsername() + "와 매칭성공";
            } else if (likerUserInfo.getSexuality().equals("여성") && likedUserInfo.getSexuality().equals("남성")) { // 내가 여성,상대가 남성 이면
                MatchTbl match = MatchTbl.builder()
                        .matchmale(likedUserInfo)
                        .matchfemale(likerUserInfo)
                        .build();
                MatchTbl matchResult = this.matchDAO.addMatch(match);
                return matchResult.getMatchmale().getUsername() + "와 매칭성공";
            } else { // 둘다 아니면
                throw new IllegalArgumentException("매칭성별이 맞지 않습니다.");
            }
        }
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
