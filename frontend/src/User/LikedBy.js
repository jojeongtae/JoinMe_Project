import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./LikedBy.css";
import apiClient from "../api/apiClient";

export default function LikedBy() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [likedMeUsers, setLikedMeUsers] = useState([]);

    // 나를 좋아한 유저 목록 가져오기
    useEffect(() => {
        const fetchLikedMeUsers = async () => {
            try {
                const res = await apiClient.get("/like/liker-users", {
                    params: { liked: currentUser.username },
                });
                setLikedMeUsers(res.data);
            } catch (error) {
                console.error("좋아요한 유저 목록 가져오기 실패:", error);
            }
        };

        if (currentUser) {
            fetchLikedMeUsers();
        }
    }, [currentUser]);

    // 좋아요 돌려주기
    const handleReturnLike = async (likedUser) => {
        try {
            const res = await apiClient.post("/like", {
                liker: currentUser.username,
                liked: likedUser.username,
            });
            alert(res.data); // 매칭 메시지 또는 좋아요 등록 메시지
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
        <div className="likedby-wrapper">
            <h2 className="likedby-title">💌 나를 좋아요한 사람들</h2>
            {likedMeUsers.length === 0 ? (
                <p className="likedby-empty">아직 나를 좋아요한 사람이 없어요.</p>
            ) : (
                likedMeUsers.map((user) => (
                    <div className="likedby-card" key={user.username}>
                        <img className="likedby-img" src={user.profileimg} alt={user.usernickname} />
                        <div className="likedby-info">
                            <h3>{user.usernickname}</h3>
                            <p>
                                <strong>MBTI:</strong> {user.mbti} / <strong>관심사:</strong> {user.interest}
                            </p>
                            <p>
                                <strong>지역:</strong> {user.address} / <strong>키:</strong> {user.height}cm /{" "}
                                <strong>몸무게:</strong> {user.weight}kg
                            </p>
                            <p>{user.introduction}</p>
                            <div className="likedby-buttons">
                                <button className="likedby-button" onClick={() => handleReturnLike(user)}>
                                    좋아요 돌려주기
                                </button>
                                <button className="likedby-button report" onClick={() => handleReport(user)}>
                                    차단하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}