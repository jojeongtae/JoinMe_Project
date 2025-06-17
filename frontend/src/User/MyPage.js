import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import EditProfileForm from "./EditProfileForm";
import ReportList from "./ReportList";
import apiClient from "../api/apiClient";
import {useNavigate} from "react-router-dom";

export default function MyPage() {
    const navigate = useNavigate();
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

    const deleteUser = async (user) => {
        const yn = window.confirm("정말 삭제하시겠습니까?"); // ✅ true 또는 false 반환됨

        if (!yn) return; // 취소하면 함수 중단

        try {
            const res = await apiClient.delete(`/user-delete/${currentUser.username}`);
            console.log("삭제 완료", res.data);
            alert("삭제되었습니다.");
            navigate("/");
        } catch (err) {
            console.log("삭제 실패", err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <section id={"mypage"} className="mypage-container">
            <div className={"user-card"}>
                <img
                    src={currentUser.profileimg}
                    alt={currentUser.usernickname}
                    className="user-image"
                />

                {!isEditing && !showReports ? (
                    <>
                        <div className="mypage-info-vertical">
                            <div className="user-nickname">{currentUser.usernickname}</div>

                            <div className="user-info-row">
                                <span className="user-info-label">나이</span>
                                <span className="user-info-value">{currentUser.age}</span>
                            </div>

                            <div className="user-info-row">
                                <span className="user-info-label">키 / 몸무게</span>
                                <span className="user-info-value">{currentUser.height}cm / {currentUser.weight}kg</span>
                            </div>

                            <div className="user-info-row">
                                <span className="user-info-label">MBTI</span>
                                <span className="user-info-value">{currentUser.mbti.toUpperCase()}</span>
                            </div>

                            <div className="user-info-row">
                                <span className="user-info-label">관심사</span>
                                <span className="user-info-value">{currentUser.interest}</span>
                            </div>

                            <div className="user-info-row">
                                <span className="user-info-label">주소</span>
                                <span className="user-info-value">{currentUser.address}</span>
                            </div>

                            <p className="user-intro">{currentUser.introduction}</p>
                        </div>


                        <div className="mypage-buttons-centered">
                            <button className="mypage-btn" onClick={() => setIsEditing(true)}>정보수정</button>
                            <button className="mypage-btn" onClick={() => setShowReports(true)}>차단목록</button>
                            <button className="mypage-btn" onClick={() => setShowDatesModal(true)}>내 데이트 일정</button>
                            <button className="mypage-btn" onClick={()=> deleteUser(currentUser.username)}>회원탈퇴</button>
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
                                                    <p className={"tit"}>{isSender ? "내가 신청한 데이트" : "상대가 신청한 데이트"}</p>
                                                    <p style={{display: "flex", alignItems: "center"}}>
                                                        <span>상대</span>{partner?.usernickname}
                                                        <img className="partner-img"
                                                             src={partner?.profileimg || "/default-profile.png"}
                                                             alt={partner?.usernickname || "상대방"}

                                                        />
                                                    </p>
                                                    <p><span>시간</span>{new Date(d.dateTime).toLocaleString()}</p>
                                                    <p><span>장소</span>{course?.coursename} - {course?.address}</p>
                                                    <p><span>코스</span>{course?.body}</p>
                                                    <img src={course?.imgpath} alt="course" className="course-img"/>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                ) : showReports ? (
                    <ReportList hater={currentUser.username} onClose={() => setShowReports(false)}/>
                ) : (
                    <EditProfileForm user={currentUser} onCancel={() => setIsEditing(false)}/>
                )}
            </div>
        </section>

    );
}