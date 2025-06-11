import React from "react";
import { useSelector } from "react-redux";
import "./MyPage.css";

export default function MyPage() {
    const currentUser = useSelector((state) => state.main.currentUser);

    if (!currentUser) return <div>사용자 정보를 불러오는 중입니다...</div>;

    return (
        <div className="mypage-container">
            <div className="mypage-profile">
                <div className="mypage-img-wrapper">
                    <img

                        src={currentUser.profileimg}
                        alt={currentUser.usernickname}
                        className="mypage-img"
                    />
                </div>
                <div className="mypage-info">
                    <h2 className="mypage-name">{currentUser.name}</h2>
                    <p>키: {currentUser.height}cm</p>
                    <p>몸무게: {currentUser.weight}kg</p>
                    <p>관심사: {currentUser.interest}</p>
                    <p>주소: {currentUser.addr}</p>
                    <p>MBTI: {currentUser.mbti.toUpperCase()}</p>
                    <p className="mypage-intro">{currentUser.intro}</p>
                </div>
            </div>

            <div className="mypage-likes-section">
                <div className="mypage-like">
                    👍 좋아요 받은 수: {}
                </div>
                <div className="mypage-like">
                    ❤️ 내가 좋아요 누른 수: {}
                </div>
            </div>
        </div>
    );
}