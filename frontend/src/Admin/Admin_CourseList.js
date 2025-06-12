import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import apiClient from "../api/apiClient";

export default function Admin_CourseList() {
    const [courses, setCourses] = useState([]);
    const [searchType, setSearchType] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/course-list");
            setCourses(response.data);
        } catch (error) {
            console.error("코스 리스트 불러오기 실패", error);
        }
    };

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

    return (
        <>
            <section style={styles.container}>
                <h2 style={styles.title}>데이트 코스 목록</h2>

                <div style={{ marginBottom: '40px', textAlign: 'right' }}>
                    <Link to="/admin-main/add-course" style={styles.detailBtn}>코스 추가</Link>
                </div>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        style={styles.select}
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
                        style={styles.input}
                    />
                    <button type="submit" style={styles.detailBtn}>검색</button>
                </form>

                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>코스명</th>
                        <th style={styles.th}>지역</th>
                        <th style={styles.th}>설명</th>
                        <th style={styles.th}>업데이트 시각</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={styles.td}>조회된 코스가 없습니다.</td>
                        </tr>
                    ) : (
                        courses.map((course, idx) => (
                            <tr key={idx}>
                                <td style={styles.td}>{course.coursename}</td>
                                <td style={styles.td}>{course.address}</td>
                                <td style={styles.td}>{course.body}</td>
                                <td style={styles.td}>
                                    {new Date(course.updateDate).toLocaleString("ko-KR", {
                                        timeZone: "Asia/Seoul",
                                    })}
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


const styles = {
    container: {
        padding: '32px',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '24px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#222',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    th: {
        backgroundColor: '#f5f5f5',
        padding: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '12px',
        fontSize: '0.9rem',
        borderBottom: '1px solid #eee',
        textAlign: 'center',
    },
    detailBtn: {
        padding: '6px 12px',
        backgroundColor: '#ff7eb9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'background-color 0.2s ease',
        textDecoration: 'none',
    },
    select: {
        padding: '8px',
        fontSize: '0.9rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    input: {
        flex: 1,
        padding: '8px',
        fontSize: '0.9rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
    }
};