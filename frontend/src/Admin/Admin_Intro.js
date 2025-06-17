import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Admin_Intro() {
    const banners = [
        {
            src: "/banners/banners1.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banners2.png",
            link: "http://localhost:3000"
        },
        {
            src: "/banners/banners3.png",
            link: "http://localhost:3000"
        }
    ];

    return (
        <>
            <div className={"inner"} style={{textAlign:"center"}}>
                <h1>관리자 전용 페이지입니다</h1>
                <div className="ad-swiper-wrapper">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        effect="fade" // ✅ 누락되어 있던 효과
                        loop={true}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                    >
                        {banners.map((banner, idx) => (
                            <SwiperSlide key={idx} style={{display: "flex", justifyContent: "center"}}>
                                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                                    <img src={banner.src} alt={`banner-${idx}`}/>
                                </a>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <p>이번달 광고 리스트</p>
                </div>
            </div>
        </>
    );
}
