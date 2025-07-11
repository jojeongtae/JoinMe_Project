import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../api/apiClient";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";

export default function ILike() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [likedUsers, setLikedUsers] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const banners = [
        {
            src: "/banners/banners1.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banners2.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banners3.png",
            link: "http://localhost:3000"
        }
    ];
    // 좋아요한 사람들과 매칭된 유저 불러오기
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

        const fetchMatchedUsers = async () => {
            try {
                const res = await apiClient.get(`/match/${currentUser.username}`);
                setMatchedUsers(res.data);
            } catch (error) {
                console.error("매칭된 유저 불러오기 실패:", error);
            }
        };

        fetchLikedUsers();
        fetchMatchedUsers();
    }, [currentUser]);

    const matchedUsernames = matchedUsers.map((match) => match.matchername);
    const filteredLikedUsers = likedUsers.filter(
        (user) => !matchedUsernames.includes(user.username)
    );

    // 좋아요 취소 핸들러
    const handleUnlike = async (likedUserId) => {
        try {
            await apiClient.delete("/like", {
                data: {
                    liker: currentUser.username,
                    liked: likedUserId,
                },
            });

            // 좋아요 취소 후 다시 likedUsers 및 match 목록 갱신
            const [likedRes, matchRes] = await Promise.all([
                apiClient.get(`/like/liked-users?liker=${currentUser.username}`),
                apiClient.get(`/match/${currentUser.username}`),
            ]);

            setLikedUsers(likedRes.data);
            setMatchedUsers(matchRes.data);
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
        <section id="ilike">
            <h2 className="ilike-title">❤️ 내가 좋아요한 사람들</h2>
            {filteredLikedUsers.length === 0 ? (
                <div className={"inner"} style={{textAlign:"center"}}>
                    <h1>아직 마음에 드는 사람이 없나요?</h1>
                    <div className="ad-swiper-wrapper">
                        <Swiper
                            modules={[Autoplay, EffectFade, Pagination]}
                            autoplay={{delay: 3000, disableOnInteraction: false}}
                            effect="fade" // ✅ 누락되어 있던 효과
                            loop={true}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                        >
                            {banners.map((banner, idx) => (
                                <SwiperSlide key={idx} style={{display: "flex", justifyContent: "center"}}>
                                    <a href={banner.link} target="_blank" rel="noopener noreferrer">
                                        <img src={banner.src} alt={`banner-${idx}`}/>
                                    </a>

                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <p>이번달 광고 리스트</p>
                    </div>
                </div>
            ) : (
                filteredLikedUsers.map((user) => (
                    <div className="user-card" key={user.username}>
                        <img
                            className="user-image"
                            src={user.profileimg || user.imgPath}
                            alt={user.name || user.usernickname}
                        />
                        <div className="user-info-container">
                            <div className="user-info">
                                <div className="user-nickname">{user.name || user.usernickname}</div>

                                <div className="user-info-row">
                                    <span className="user-info-label">키 / 몸무게</span>
                                    <span className="user-info-value">{user.height}cm / {user.weight}kg</span>
                                </div>

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
                                    <span className="user-info-value">{user.address || user.addr}</span>
                                </div>

                                <p className="user-intro">{user.introduction || user.intro}</p>
                            </div>

                            <div className="user-side-buttons">
                                <button
                                    className="ilike-button"
                                    onClick={() => handleUnlike(user.username)}
                                    title="좋아요 취소"
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </section>


    );
}