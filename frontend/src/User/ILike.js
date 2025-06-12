import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../api/apiClient";
import "./ILike.css";

export default function ILike() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [likedUsers, setLikedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser || !currentUser.username) return;

        const fetchLikedUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get(
                    `/like/liked-users?liker=${currentUser.username}`
                );
                setLikedUsers(response.data);
            } catch (err) {
                setError("좋아요한 유저 목록 불러오기 실패");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedUsers();
    }, [currentUser]);

    const handleUnlike = async (likedUserId) => {
        try {
            await apiClient.delete("/like", {
                data: {
                    liker: currentUser.username,
                    liked: likedUserId,
                },
            });
            setLikedUsers((prev) => prev.filter((user) => user.username !== likedUserId));
        } catch (err) {
            alert("좋아요 취소 실패");
            console.error(err);
        }
    };

    if (!currentUser || !currentUser.username) {
        return <p>로그인 후 이용해주세요.</p>;
    }

    if (loading) {
        return <p>로딩중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="ilike-wrapper">
            <h2 className="ilike-title">❤️ 내가 좋아요 누른 사람들</h2>
            {likedUsers.length === 0 ? (
                <p className="ilike-empty">아직 좋아요를 누른 사람이 없어요.</p>
            ) : (
                likedUsers.map((user) => (
                    <div className="ilike-card" key={user.username}>
                        <img
                            className="ilike-img"
                            src={user.profileimg || user.imgPath}
                            alt={user.name || user.usernickname}
                        />
                        <div className="ilike-info">
                            <h3>{user.name || user.usernickname}</h3>
                            <p>
                                <strong>MBTI:</strong> {user.mbti} / <strong>관심사:</strong>{" "}
                                {user.interest}
                            </p>
                            <p>
                                <strong>지역:</strong> {user.address || user.addr} /{" "}
                                <strong>키:</strong> {user.height}cm /{" "}
                                <strong>몸무게:</strong> {user.weight}kg
                            </p>
                            <p>{user.introduction || user.intro}</p>
                            <button
                                className="ilike-button"
                                onClick={() => handleUnlike(user.username)}
                            >
                                좋아요 취소
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}