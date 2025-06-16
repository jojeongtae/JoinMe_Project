import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "./EditProfileForm";
import "./MyPage.css";
import ReportList from "./ReportList";
import apiClient from "../api/apiClient";
export default function MyPage() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [showDatesModal, setShowDatesModal] = useState(false);
    const [dates, setDates] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        const fetchData = async () => {
            try {
                const [send, received, users, courses] = await Promise.all([
                    apiClient.get(`/date/by-sender?sender=${currentUser.username}`),
                    apiClient.get(`/date/by-receiver?receiver=${currentUser.username}`),
                    apiClient.get("/user/list"),
                    apiClient.get("/course-list"),
                ]);

                const combinedDates = [...send.data, ...received.data].sort(
                    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
                );

                setDates(combinedDates);
                setAllUsers(users.data);
                setAllCourses(courses.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentUser]);

    if (!currentUser) return <div>사용자 정보를 불러오는 중입니다...</div>;

    const getUserByUsername = (username) => allUsers.find((u) => u.username === username);
    const getCourseById = (id) => allCourses.find((c) => c.id === id);

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
                        <button className="mypage-btn" onClick={() => setShowDatesModal(true)}>내 데이트 일정</button>
                    </div>

                    {showDatesModal && (
                        <div className="modal-overlay" onClick={() => setShowDatesModal(false)}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <h3>내 데이트 일정</h3>
                                <button className="close-btn" onClick={() => setShowDatesModal(false)}>닫기</button>
                                <ul className="date-list">
                                    {dates.map((d, idx) => {
                                        const isSender = d.sender === currentUser.username;
                                        const partner = getUserByUsername(isSender ? d.receiver : d.sender);
                                        const course = getCourseById(d.course_id);
                                        return (
                                            <li key={idx} className="date-item">
                                                <p>
                                                    <strong>{isSender ? "내가 신청한 데이트" : "상대가 신청한 데이트"}</strong>
                                                </p>
                                                <p style={{ display: "flex", alignItems: "center" }}>
                                                    상대: {partner?.usernickname}
                                                    <img className="partner-img"
                                                        src={partner?.profileimg || "/default-profile.png"}
                                                        alt={partner?.usernickname || "상대방"}

                                                    />
                                                </p>
                                                <p>시간: {new Date(d.dateTime).toLocaleString()}</p>
                                                <p>장소: {course?.coursename} - {course?.address}</p>
                                                <p>코스 설명: {course?.body}</p>
                                                <img src={course?.imgpath} alt="course" className="course-img" />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            ) : showReports ? (
                <ReportList hater={currentUser.username} onClose={() => setShowReports(false)} />
            ) : (
                <EditProfileForm user={currentUser} onCancel={() => setIsEditing(false)} />
            )}
        </div>
    );
}