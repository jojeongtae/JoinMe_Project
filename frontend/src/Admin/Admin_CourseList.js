import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import apiClient from "../api/apiClient";
import {useDispatch} from "react-redux";
import {removeCourse} from "../mainSlice";

export default function Admin_CourseList() {
    const [courses, setCourses] = useState([]);
    const [searchType, setSearchType] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");

    // 코스 리스트 호출
    const fetchData = async () => {
        try {
            const response = await apiClient.get("/course-list");
            const sorted = [...response.data].sort(
                (a, b) => new Date(b.updateDate) - new Date(a.updateDate)
            );
            setCourses(sorted);
        } catch (error) {
            console.error("코스 리스트 불러오기 실패", error);
        }
    };

    // 검색
    const search = async () => {
        if (!searchKeyword.trim()) {
            fetchData();
            return;
        }

        try {
            let url = "";
            if (searchType === "coursename") {
                url = `/course-by-coursename?course_name=${encodeURIComponent(searchKeyword)}`;
            } else if (searchType === "address") {
                url = `/course-by-address?address=${encodeURIComponent(searchKeyword)}`;
            }

            const response = await apiClient.get(url);
            setCourses(response.data)
        } catch (error) {
            console.error("검색 실패", error);
        }
    };

    useEffect(() => {
        if (searchType === "all") {
            fetchData();
        }
    }, [searchType]);

    const handleSearch = (e) => {
        e.preventDefault();
        search();
    };

    // 코스 삭제
    const handleDelete = async (id) => {
        if (!window.confirm("정말 이 코스를 삭제하시겠어요?")) return;

        try {
            await apiClient.delete(`/delete-course?courseId=${id}`);
            alert("삭제 완료!");
            fetchData();
        } catch (error) {
            console.error("코스 삭제 실패", error);
        }
    };

    return (
        <>
            <section id="admin" className="courseList inner">
                <h2 className="admin-userlist-title">데이트 코스 목록</h2>

                <div className="admin-course-topbar">
                    <Link to="/admin-main/add-course" className="admin-course-btn">코스 추가</Link>
                </div>

                <form onSubmit={handleSearch} className="admin-course-search">
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="admin-course-select"
                    >
                        <option value="all">전체보기</option>
                        <option value="coursename">코스명</option>
                        <option value="address">지역</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        disabled={searchType === "all"}
                        className="admin-course-input"
                    />
                    <button type="submit" className="admin-course-btn">검색</button>
                </form>

                <table className="admin-userlist-table">
                    <thead>
                    <tr>
                        <th>코스명</th>
                        <th>지역</th>
                        <th>설명</th>
                        <th>업데이트 시각</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.length === 0 ? (
                        <tr>
                            <td colSpan={6}>조회된 코스가 없습니다.</td>
                        </tr>
                    ) : (
                        courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.coursename}</td>
                                <td>{course.address}</td>
                                <td>{course.body}</td>
                                <td>
                                    {new Date(course.updateDate).toLocaleString("ko-KR", {
                                        timeZone: "Asia/Seoul",
                                    })}
                                </td>
                                <td>
                                    <Link to={`/admin-main/edit-course/${course.id}`} className="admin-course-gray-btn">수정</Link>
                                </td>
                                <td>
                                    <button className="admin-course-gray-btn" onClick={() => handleDelete(course.id)}>삭제</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </section>
        </>
    );
}
