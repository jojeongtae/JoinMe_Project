import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";

export default function Admin_Intro() {
    const banners = [
        {
            src: "/public/man5.png",
            link: "https://www.google.com/search?q=%EB%AC%B4%EC%84%AD%EB%8B%A4&oq=%EB%AC%B4%EC%84%AD%EB%8B%A4&gs_lcrp=EgZjaHJvbWUyDggAEEUYORhGGPkBGIAEMgcIARAAGIAEMgcIAhAAGIAEMgcIAxAAGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGIAE0gEINDExMGowajeoAgiwAgE&sourceid=chrome&ie=UTF-8"
        },
        {
            src: "/public/woemen11.png",
            link: "https://www.google.com/search?q=%EB%AC%B4%EC%84%AD%EB%8B%A4&oq=%EB%AC%B4%EC%84%AD%EB%8B%A4&gs_lcrp=EgZjaHJvbWUyDggAEEUYORhGGPkBGIAEMgcIARAAGIAEMgcIAhAAGIAEMgcIAxAAGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGIAE0gEINDExMGowajeoAgiwAgE&sourceid=chrome&ie=UTF-8"
        }
    ]


    return (
        <>
            <h1>관리자 전용 페이지입니다</h1>
            <div className="ad-swiper-wrapper">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                >
                    {banners.map((banner, idx) => (
                        <SwiperSlide key={idx}>
                            <a href={banner.link}>
                                <img src={banner.src} alt={`banner-${idx}`} />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>)
}
