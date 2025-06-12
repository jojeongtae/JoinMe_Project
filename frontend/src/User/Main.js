import React from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {hover} from "@testing-library/user-event/dist/hover";
import apiClient from "../api/apiClient";
import {logoutUser} from "../mainSlice";

export default function MainLayout() {
    const currentUser = useSelector((state) => state.main.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiClient.post("/logout");  // 백엔드 로그아웃 API 호출
            dispatch(logoutUser());           // Redux 상태 초기화 (currentUser: null 등)
            navigate("/");                   // 로그인 페이지 또는 초기 페이지로 이동
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <>
            <header style={styles.header}>
                {/* 로고 */}
                <div style={styles.logoBox}>
                    <img src="/logo.png" alt="logo" style={styles.logo} />
                </div>

                {/* 내비게이션 */}
                <nav style={styles.nav}>
                    <Link to="/main" style={styles.link}>홈</Link>
                    <Link to="/main/users" style={styles.link}>소개팅</Link>
                    <Link to="/main/i-liked" style={styles.link}>보낸 좋아요</Link>
                    <Link to="/main/liked-by" style={styles.link}>받은 좋아요</Link>
                    <Link to="/main/matched" style={styles.link}>매칭</Link>
                    <Link to="/main/mypage" style={styles.link}>마이페이지</Link>
                </nav>

                {/* 유저 정보 */}
                {currentUser && (
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>{currentUser.usernickname} 님</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                )}
            </header>

            <main style={styles.main}>
                <Outlet />
            </main>
        </>
    );
}
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #eee",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    logoBox: {
        flex: "0 0 auto",
    },
    logo: {
        height: "100px",
    },
    nav: {
        display: "flex",
        gap: "25px",
        flex: "1",
        justifyContent: "center",
    },
    link: {
        textDecoration: "none",
        color:hover? "#333":"blue",
        fontWeight: "500",
        fontSize: "20px",
        transition: "color 0.2s",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    userName: {
        fontSize: "14px",
        color: "#555",
        fontWeight: "bold",
    },
    userImage: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    main: {
        padding: "30px",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
    },
};