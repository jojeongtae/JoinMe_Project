import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../api/apiClient";

export default function LikedBy() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [likedMeUsers, setLikedMeUsers] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        // 나를 좋아한 사람들 가져오기
        const fetchLikedMeUsers = async () => {
            try {
                const res = await apiClient.get("/like/liker-users", {
                    params: { liked: currentUser.username },
                });
                setLikedMeUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        // 매칭된 사람들 가져오기
        const fetchMatchedUsers = async () => {
            try {
                const res = await apiClient.get(`/match/${currentUser.username}`);
                setMatchedUsers(res.data); // 매칭된 유저 리스트


            } catch (error) {
                console.error(error);
            }
        };

        fetchLikedMeUsers();
        fetchMatchedUsers();
    }, [currentUser]);

    const matchedUsernames = matchedUsers.map(match => match.matchername);
    const filteredLikedMeUsers = likedMeUsers.filter(
        user => !matchedUsernames.includes(user.username)
    );   // 좋아요 돌려주기
    const handleReturnLike = async (likedUser) => {
        try {
            const res = await apiClient.post("/like", {
                liker: currentUser.username,
                liked: likedUser.username,
            });
            alert(res.data); // 매칭 메시지 또는 좋아요 등록 메시지
            setLikedMeUsers(prev => prev.filter(u => u.username !== likedUser.username));

        } catch (error) {
            console.error("좋아요 돌려주기 실패:", error);
            if (error.response?.data) {
                alert(error.response.data); // 서버에서 온 메시지 보여주기
            } else {
                alert("좋아요 돌려주기에 실패했습니다.");
            }
        }
    };

    // 차단하기
    const handleReport = async (hatedUser) => {
        try {
            const params = new URLSearchParams({
                hater: currentUser.username,
                hated: hatedUser.username,
            });
            const res = await apiClient.post(`/hate-user?${params.toString()}`);
            alert(`${hatedUser.usernickname}님을 차단했습니다.`);
        } catch (error) {
            console.error("차단 요청 실패:", error);
            alert("차단 처리에 실패했습니다.");
        }
    };

    return (
        <section id="likedby">
            <h2 className="likedby-title">💌 나를 좋아요한 사람들</h2>
            {filteredLikedMeUsers.length === 0 ? (
                <p className="likedby-empty">아직 나를 좋아요한 사람이 없어요.</p>
            ) : (
                filteredLikedMeUsers.map((user) => (
                    <div className="likedby-card" key={user.username}>
                        <img className="user-image" src={user.profileimg} alt={user.usernickname} />
                        <div className="user-info-container">
                            <div className="user-info">
                                <div className="user-nickname">{user.usernickname}</div>
                                <div className="user-info-row">
                                    <span className="user-info-label">MBTI</span>
                                    <span className="user-info-value">{user.mbti}</span>
                                </div>
                                <div className="user-info-row">
                                    <span className="user-info-label">관심사</span>
                                    <span className="user-info-value">{user.interest}</span>
                                </div>
                                <div className="user-info-row">
                                    <span className="user-info-label">지역</span>
                                    <span className="user-info-value">{user.address}</span>
                                </div>
                                <div className="user-info-row">
                                    <span className="user-info-label">키 / 몸무게</span>
                                    <span className="user-info-value">{user.height}cm / {user.weight}kg</span>
                                </div>
                                <p className="user-intro">{user.introduction}</p>
                            </div>
                            <div className="user-side-buttons">
                                <button className="likedby-button" onClick={() => handleReturnLike(user)}>
                                    💖 돌려주기
                                </button>
                                <button className="likedby-button report" onClick={() => handleReport(user)}>
                                    🚫 차단하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </section>

    );
}