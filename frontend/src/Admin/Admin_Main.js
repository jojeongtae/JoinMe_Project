import React from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import {hover} from "@testing-library/user-event/dist/hover";

export default function Admin_Main() {
    const currentUser = useSelector(state => state.main.currentUser);
    const navigate = useNavigate();
    return (
        <>
            <header style={styles.header}>
                {/* 로고 */}
                <div style={styles.logoBox}>
                    <img src="/logo.png" alt="logo" style={styles.logo} />
                </div>

                {/* 내비게이션 */}
                <nav style={styles.nav}>
                    <Link to="/admin-main" style={styles.link}>홈</Link>
                    <Link to="/admin-main/user-list" style={styles.link}>유저 리스트</Link>
                    <Link to="/admin-main/post-hiding" style={styles.link}>게시물관리</Link>
                    <Link to="/admin-main/matching-list" style={styles.link}>매칭현황</Link>
                    <Link to="/admin-main/add-cource" style={styles.link}>데이트코스</Link>
                    <Link to="/admin-main/blacklist" style={styles.link}>블랙리스트</Link>
                </nav>

                {/* 유저 정보 */}
                {currentUser && (
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>{currentUser.name} 님</span>
                        <button onClick={()=>{
                            navigate("/")
                        }}>로그아웃</button>
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