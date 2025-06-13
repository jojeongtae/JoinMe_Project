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
                <div className={"inner"}>
                {/* 로고 */}
                <Link className={"logo"} to="/main">
                    <img src="/logo.png" alt="logo"/>
                </Link>

                {/* 내비게이션 */}
                <nav className={"nav-list"}>
                    <Link to="/main" >홈</Link>
                    <Link to="/main/users">소개팅</Link>
                    <Link to="/main/i-liked">보낸 좋아요</Link>
                    <Link to="/main/liked-by">받은 좋아요</Link>
                    <Link to="/main/matched">매칭</Link>
                    <Link to="/main/mypage">마이페이지</Link>
                </nav>

                {/* 유저 정보 */}
                {currentUser && (
                    <div className={"userinfo"}>
                        <span className={"username"}>{currentUser.usernickname} 님</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                )}
                </div>
            </header>

            <main style={styles.main}>
                <Outlet />
            </main>
        </>
    );
}
const styles = {
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