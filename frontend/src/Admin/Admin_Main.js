import React, {useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {hover} from "@testing-library/user-event/dist/hover";
import UserDetailPopup from "./UserDetailPopup";

export default function Admin_Main() {
    const currentUser = useSelector(state => state.main.currentUser);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedPost] = useState(null);
    const closePopup = () => setShowPopup(false);

    return (
        <>
            <header>
                <div className={"inner"}>
                    {/* 로고 */}
                    <Link className={"logo"} to="/admin-main">
                        <img src="/logo.png" alt="logo"/>
                    </Link>

                    {/* 내비게이션 */}
                    <nav className={"nav-list"}>
                        <Link to="/admin-main">홈</Link>
                        <Link to="/admin-main/user-list">현재 유저</Link>
                        <Link to="/admin-main/post-hiding">숨김 유저</Link>
                        <Link to="/admin-main/matching-list" >매칭현황</Link>
                        <Link to="/admin-main/course-list">데이트코스</Link>
                        <Link to="/admin-main/blacklist">블랙리스트</Link>
                    </nav>

                    {/* 유저 정보 */}
                    {currentUser && (
                        <div className={"userinfo"}>
                            <span className={"username"}>{currentUser.name} 님</span>
                            <button className={"btn light-pink"} onClick={() => {
                                navigate("/")
                            }}>로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className={"main-wrap"}>
                <Outlet context={{showPopup, setShowPopup, selectedUser, setSelectedPost, closePopup}}/>
            </main>

            {showPopup && selectedUser && (
                <UserDetailPopup user={selectedUser} onClose={closePopup}/>
            )}
        </>
    );
}