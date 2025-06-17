import React, {useEffect} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {hover} from "@testing-library/user-event/dist/hover";
import apiClient from "../api/apiClient";
import {fetchUserMessages, logoutUser} from "../mainSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";

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
    console.log(currentUser)
    const banners = [
        {
            src: "/banners/banner1.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banner2.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banner3.png",
            link: "http://localhost:3000"
        }
    ];
    return (
        <>
            <header>
                <div className={"inner"}>
                    {/* 로고 */}
                    <Link className={"logo"} to="/main">
                        <img src="/logo.png" alt="logo"/>
                    </Link>

                    {/* 내비게이션 */}
                    <nav className={"nav-list"}>
                        <Link to="/main">홈</Link>
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
                            <button className={"btn light-pink"} onClick={handleLogout}>로그아웃</button>
                        </div>
                    )}
                </div>
            </header>

                <main className={"main-wrap"}>


                    <div className="main-content">
                        <Outlet/>
                    </div>

                    {/* 메인 콘텐츠 */}
                    <div className={"layout-3col"}>
                        {/* 좌측 사이드 배너 */}
                        <div className="side-banner-left">
                            <Swiper
                                modules={[Autoplay, EffectFade]}
                                autoplay={{delay: 3000, disableOnInteraction: false}}
                                effect="fade"
                                loop={true}
                                slidesPerView={1}
                            >
                                {banners.map((banner, idx) => (
                                    <SwiperSlide key={idx}>
                                        <a href={banner.link} target="_blank" rel="noopener noreferrer">
                                            <img src={banner.src} alt={`banner-${idx}`}/>
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {/* 우측 사이드 배너 */}
                        <div className="side-banner-right">
                            <Swiper
                                modules={[Autoplay, EffectFade]}
                                autoplay={{delay: 3000, disableOnInteraction: false}}
                                effect="fade"
                                loop={true}
                                slidesPerView={1}
                            >
                                {banners.map((banner, idx) => (
                                    <SwiperSlide key={idx}>
                                        <a href={banner.link} target="_blank" rel="noopener noreferrer">
                                            <img src={banner.src} alt={`banner-${idx}`}/>
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    </div>

                </main>
        </>
    )
        ;
}
