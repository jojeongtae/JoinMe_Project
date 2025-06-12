import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "./EditProfileForm";
import "./MyPage.css";
import ReportList from "./ReportList"; // 추가

export default function MyPage() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [showReports, setShowReports] = useState(false); // 추가

    if (!currentUser) return <div>사용자 정보를 불러오는 중입니다...</div>;

    return (
        <div className="mypage-container">
            <img
                src={currentUser.profileimg}
                alt={currentUser.usernickname}
                className="mypage-banner-img"
            />

            {!isEditing && !showReports ? (
                <>
                    <div className="mypage-info-vertical">
                        <h2>{currentUser.usernickname}</h2>
                        <p>나이: {currentUser.age}</p>
                        <p>키: {currentUser.height}cm</p>
                        <p>몸무게: {currentUser.weight}kg</p>
                        <p>관심사: {currentUser.interest}</p>
                        <p>주소: {currentUser.address}</p>
                        <p>MBTI: {currentUser.mbti.toUpperCase()}</p>
                        <p className="mypage-intro">{currentUser.introduction}</p>
                    </div>

                    <div className="mypage-buttons-centered">
                        <button className="mypage-btn" onClick={() => setIsEditing(true)}>정보수정</button>
                        <button className="mypage-btn" onClick={() => setShowReports(true)}>차단목록</button>
                        <button className="mypage-btn">쪽지함</button>
                    </div>
                </>
            ) : showReports ? (
                <ReportList hater={currentUser.username} onClose={() => setShowReports(false)} />
            ) : (
                <EditProfileForm user={currentUser} onCancel={() => setIsEditing(false)} />
            )}
        </div>
    );
}