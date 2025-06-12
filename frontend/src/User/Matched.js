import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "./Matched.css";
import {useSelector} from "react-redux";

export default function Matched({ currentUsername }) {
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const currentUser = useSelector(state => state.main.currentUser)

    useEffect(() => {
        if (!currentUser || !currentUser.username) {
            console.log("currentUser or username is missing");
            return;
        }
        console.log("currentUser.username:", currentUser.username);

        const fetchMatches = async () => {
            try {
                const res = await apiClient.get(`/match/${currentUser.username}`);
                console.log("매칭 데이터:", res.data);

                const userRes = await apiClient.get("/user/list");
                const userList = userRes.data;

                const enrichedMatches = res.data
                    .map((match) => {
                        // 성별에 따라 상대방 username 정하기
                        const matcherUsername =
                            currentUser.sexuality === "남성"
                                ? match.matchfemale
                                : match.matchmale;

                        // userList에서 matcherUsername과 일치하는 사용자 정보 찾기
                        const userInfo = userList.find(user => user.username === match.matchername);


                        if (!userInfo) return undefined;

                        return {
                            ...userInfo,
                            matchtime: match.matchtime,
                        };
                    })
                    .filter((user) => user !== undefined);

                setMatchedUsers(enrichedMatches);
            } catch (err) {
                console.error("매칭 정보 가져오기 실패", err);
            }
        };

        fetchMatches();
    }, [currentUser]);



    return (
        <>
            {/* 화면 전체 배경 하트 */}
            <div className="background-hearts">
                {Array.from({ length: 30 }, (_, i) => (
                    <img
                        key={i}
                        src="/heart.png"
                        alt="background heart"
                        className={`bg-heart bg-heart${i + 1}`}
                    />
                ))}
            </div>
        <div className="matched-container">
            <h2 className="matched-title">매칭된 사용자 목록</h2>
            <div className="matched-list">
                {matchedUsers.map((user, index) => (
                    <div className="matched-card" key={index}>
                        {/* 프로필 이미지 */}
                        <img
                            src={user.profileimg || "/default-profile.png"}
                            alt="프로필"
                            className="profile-img"
                        />

                        {/* 유저 정보 */}
                        <div className="user-info">
                            <p><strong>{user.usernickname}</strong> ({user.age}세, {user.mbti})</p>
                            <p>{user.address}</p>
                            <p>키: {user.height}cm, 몸무게: {user.weight}kg</p>
                            <p>관심사: {user.interest}</p>
                            <p className="match-date">
                                매칭 날짜: {new Date(user.matchtime).toLocaleDateString()}
                            </p>
                            <button className="unnamed-button">♥Join Me♥</button>
                        </div>

                    </div>

                ))}
            </div>
        </div>
            </>
    );
}