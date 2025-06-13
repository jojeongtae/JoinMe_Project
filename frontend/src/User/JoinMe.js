import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import apiClient from "../api/apiClient";
import {mbtiCompatibility} from "./mbtiCompatibility";
import {useSelector} from "react-redux";
import {mbtiBehaviorTips} from "./mbtiBehaviorTips";
import "./JoinMe.css";

import { useLayoutEffect, useRef } from "react";
import {loadKakaoScript} from "../App";
import CourseMap from "./KakaoMap";


export default function JoinMe() {
    const { username } = useParams();
    const currentUser = useSelector((state) => state.main.currentUser);
    const [userInfo, setUserInfo] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                </div>
            </div>

            <div className="course-list-container">
                <h2>추천 코스</h2>
                {courses.length === 0 ? (
                    <p>추천할 코스가 없습니다.</p>
                ) : (
                    courses.map(course => (
                        <div key={course.coursename} className="course-item">
                            <div className="course-info">
                                <h4>{course.coursename}</h4>
                                <p>{course.body}</p>
                                <p><strong>주소:</strong> {course.address}</p>
                                <p><small>업데이트: {new Date(course.updateDate).toLocaleDateString()}</small></p>
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