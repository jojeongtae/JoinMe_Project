import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiClient from "../api/apiClient";
import {mbtiCompatibility} from "./mbtiCompatibility";
import {useDispatch, useSelector} from "react-redux";
import {mbtiBehaviorTips} from "./mbtiBehaviorTips";
import "./JoinMe.css";

import { useLayoutEffect, useRef } from "react";
import {loadKakaoScript} from "../App";
import CourseMap from "./KakaoMap";
import courseLinks from "./CourseLink";
import {addUserMessage, fetchUserMessages} from "../mainSlice";


export default function JoinMe() {
    const { username } = useParams();
    const currentUser = useSelector((state) => state.main.currentUser);
    const [userInfo, setUserInfo] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [openFormId, setOpenFormId] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState('');

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.main.userMessages);
    const loadMessages = async () => {
        try {
            const res = await apiClient.get(`/message/chat-list?username=${currentUser.username}`);
            const res2 = await apiClient.get(`/date/by-sender?sender=${currentUser.username}`)
            const res3 = await apiClient.get(`/date/by-receiver?receiver=${currentUser.username}`)
            const messages = res.data;
            const dates = res2.data;

            messages.push(...dates);
            messages.push(...res3.data)
            dispatch(fetchUserMessages(messages)); // 이건 redux action creator

        } catch (err) {
            console.error("채팅목록 로딩 실패", err);
        }
    };
    useEffect(() => {
        if (currentUser?.username) {
            loadMessages();
        }
    }, [currentUser]);
    const getChatWithUser = (allMessages, currentUser, targetUser) => {
        return allMessages
            .filter(m =>
                (m.sender === currentUser && m.receiver === targetUser) ||
                (m.sender === targetUser && m.receiver === currentUser)
            )
            .sort((a, b) => new Date(a.sendTime) - new Date(b.sendTime)); // 오름차순
    };
    const handleSendMessage = () => {
        const filteredMessages = getChatWithUser(messages, currentUser.username, userInfo.username);
        setChatMessages(filteredMessages);
        setIsChatOpen(true);
        if(isChatOpen){
            setIsChatOpen(false);
        }
    };
    const handleSendChat = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageDTO = {
            sender: currentUser.username,
            receiver: userInfo.username,
            content: newMessage,
            sendTime: new Date().toISOString(),
            read: false
        };

        try {
            await apiClient.post('/message', messageDTO);

            // 실시간 반영: 새 메시지를 리스트에 추가
            setChatMessages(prev => [...prev, messageDTO]);
            setNewMessage('');
            dispatch(addUserMessage(messageDTO))
        } catch (err) {
            console.error('메시지 전송 실패:', err);
        }
    };
    const handleSubmitDate = async (e, courseId) => {
        e.preventDefault();
        if (!selectedDateTime) return alert("날짜를 선택해주세요.");

        const dateDTO = {
            sender: currentUser.username,
            receiver: userInfo.username,
            sendTime: new Date().toISOString(),
            course_id: courseId,
            dateTime: new Date(selectedDateTime).toISOString()
        };

        try {
            await apiClient.post('/date/add', dateDTO);
            alert("데이트 신청이 전송되었습니다!");
            setOpenFormId(null); // 폼 닫기
            setSelectedDateTime('');
            dispatch(addUserMessage(dateDTO))
            setChatMessages(prev => [...prev, dateDTO]);
        } catch (error) {
            console.error('데이트 신청 실패:', error);
            alert("신청 실패. 다시 시도해주세요.");
        }
    };
    useEffect(() => {
        if (!username) return;

        const fetchUserInfoAndCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                const userResponse = await apiClient.get(`/user/userinfo/${username}`);
                setUserInfo(userResponse.data);

                const coursesResponse = await apiClient.get(`/course-list`);
                const allCourses = coursesResponse.data;

                const getRandomItems = (arr, n) => {
                    const shuffled = arr.sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, n);
                };

                const userAddress = userResponse.data.address;
                const currentUserAddress = currentUser?.address;

                let filteredCourses = [];

                if (userAddress && currentUserAddress) {
                    if (userAddress === currentUserAddress) {
                        const sameAddressCourses = allCourses.filter(c => c.address.includes(userAddress));
                        filteredCourses = getRandomItems(sameAddressCourses, 3);
                    } else {
                        const userAddressCourses = allCourses.filter(c => c.address.includes(userAddress));
                        const currentUserAddressCourses = allCourses.filter(c => c.address.includes(currentUserAddress));

                        filteredCourses = [
                            ...getRandomItems(userAddressCourses, 3),
                            ...getRandomItems(currentUserAddressCourses, 3),
                        ];
                    }
                }

                setCourses(filteredCourses);
                console.log(filteredCourses)
            } catch (err) {
                console.error(err);
                setError("정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfoAndCourses();
    }, [username, currentUser]);

    if (loading) return <p>로딩중...</p>;
    if (error) return <p>{error}</p>;
    if (!userInfo) return <p>정보가 없습니다.</p>;
    if (!currentUser) return <p>로그인 후 이용해주세요.</p>;

    const compatibilityKey = `${userInfo.mbti}-${currentUser.mbti}`;
    const compatibilityText = mbtiCompatibility[compatibilityKey] || "궁합 정보를 찾을 수 없습니다.";
    const behaviorTip = mbtiBehaviorTips[currentUser.mbti] || { good: "정보가 없습니다.", caution: "" };

    return (
        <div className="joinme-wrapper">
            <div className="top-sections">
                <div className="profile-section">
                    <img
                        className="profile-img"
                        src={userInfo.profileimg || userInfo.imgPath}
                        alt={`${userInfo.usernickname} 프로필`}
                    />
                    <h3>{userInfo.usernickname}</h3>
                    <p><strong>MBTI:</strong> {userInfo.mbti}</p>
                </div>

                <div className="compatibility-section">
                    <h2>상대 {userInfo.mbti} ❤ 내 {currentUser.mbti} 의 조합은?</h2>
                    <p>{compatibilityText}</p>

                    <h3>당신이 취하면 좋을 행동</h3>
                    <p><strong>👍 좋은 점:</strong> {behaviorTip.good}</p>
                    <p><strong>⚠️ 주의할 점:</strong> {behaviorTip.caution}</p>
                    <br />
                    <button className="ask-date" onClick={handleSendMessage}>채팅하기</button>
                </div>
            </div>

            {isChatOpen && (
                <div className="chat-modal">
                    <div className="chat-header">{userInfo.usernickname}님과의 채팅</div>
                    <div className="chat-body">
                        {chatMessages.map((msg, i) => {
                            const isMine = msg.sender === currentUser.username;
                            const isDateRequest = msg.course_id && msg.dateTime;

                            if (isDateRequest) {
                                const matchedCourse = courses.find(c => c.id === msg.course_id);
                                const courseName = matchedCourse ? matchedCourse.coursename : '알 수 없는 장소';
                                const formattedDate = new Date(msg.dateTime).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <div key={i} className={`chat-message ${isMine ? 'mine' : 'theirs'}`}>
                                        {!isMine && (
                                            <img
                                                src={userInfo.profileimg || userInfo.imgPath}
                                                alt="상대 프로필"
                                                className="chat-profile-img"
                                            />
                                        )}
                                        <div className="chat-bubble date-request-message">
                                            <div><strong>{msg.sender}</strong>가 <strong>{msg.receiver}</strong>님에게 데이트를 신청했습니다!</div>
                                            <div className="date-img-container">
                                            <img className="date-img" src={matchedCourse.imgpath}></img>
                                            </div>
                                            <div>데이트 장소: {courseName}</div>
                                            <div>데이트 신청 날짜: {formattedDate}</div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={i} className={`chat-message ${isMine ? 'mine' : 'theirs'}`}>
                                    {!isMine && (
                                        <img
                                            src={userInfo.profileimg || userInfo.imgPath}
                                            alt="상대 프로필"
                                            className="chat-profile-img"
                                        />
                                    )}
                                    <div className="chat-bubble">{msg.content}</div>
                                </div>
                            );
                        })}
                    </div>
                    <form className="chat-input-form" onSubmit={handleSendChat}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                        />
                        <button type="submit">보내기</button>
                    </form>
                </div>
            )}

            <div className="course-list-container">
                <h2>추천 코스</h2>
                {courses.length === 0 ? (
                    <p>추천할 코스가 없습니다.</p>
                ) : (
                    courses.map(course => (
                        <div key={course.id} className="course-item">
                            <div className="course-info">
                                <h4>{course.coursename}</h4>
                                <p>{course.body}</p>
                                <p><strong>주소:</strong> {course.address}</p>
                                <button
                                    className="ask-date"
                                    onClick={() => setOpenFormId(openFormId === course.id ? null : course.id)}
                                >
                                    데이트 신청하기
                                </button>

                                {openFormId === course.id && (
                                    <form onSubmit={(e) => handleSubmitDate(e, course.id)} className="date-form">
                                        <label>
                                            날짜/시간 선택:
                                            <input
                                                type="datetime-local"
                                                value={selectedDateTime}
                                                onChange={(e) => setSelectedDateTime(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <button type="submit">신청 보내기</button>
                                    </form>
                                )}
                            </div>
                            <div className="image-container">
                                <img className="course-image" src={course.imgpath} alt={course.coursename} />
                            </div>
                            <div
                                className="course-map"
                                style={{ width: 250, height: 150, borderRadius: 8, overflow: "hidden" }}
                            >
                                <CourseMap placeName={course.address} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}