import React, { useRef, useEffect, useState } from "react";

export function loadKakaoScript(appKey, callback) {
    if (window.kakao && window.kakao.maps) {
        console.log("이미 로드된 카카오맵");
        callback();
        return;
    }

    const existingScript = document.getElementById("kakao-map-sdk");
    if (existingScript) {
        if (window.kakao && window.kakao.maps) {
            console.log("이미 로드된 카카오맵");
            callback();
        } else {
            existingScript.addEventListener("load", () => {
                window.kakao.maps.load(() => {
                    callback();
                });
            });
        }
        return;
    }

    console.log("카카오맵 스크립트 삽입 시작");
    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
        console.log("카카오맵 스크립트 로드 완료");
        window.kakao.maps.load(() => {
            console.log("kakao.maps.load 완료");
            callback();
        });
    };
    document.head.appendChild(script);
}

const CourseMap = ({ placeName }) => {
    const mapContainer = useRef(null);
    const [kakaoReady, setKakaoReady] = useState(false);

    useEffect(() => {
        loadKakaoScript("37c42e2094a3951f9d64db3d1980eb77", () => {
            setKakaoReady(true);
        });
    }, []);

    useEffect(() => {
        if (!kakaoReady) {
            console.log("카카오맵 아직 준비 안 됨");
            return;
        }
        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
            console.log("카카오맵 서비스 아직 준비 안 됨");
            return;
        }
        if (!placeName) {
            console.log("placeName이 비어있습니다.");
            return;
        }
        if (!mapContainer.current) {
            console.log("mapContainer.current가 아직 null입니다.");
            return;
        }

        console.log("맵 렌더 시작:", placeName);

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(placeName, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(data[0].y, data[0].x);
                const map = new window.kakao.maps.Map(mapContainer.current, {
                    center: coords,
                    level: 3,
                });
                new window.kakao.maps.Marker({
                    map,
                    position: coords,
                });
                console.log("맵 렌더 완료:", data[0].place_name);
            } else {
                console.log("장소 검색 실패:", status);
            }
        });
    }, [kakaoReady, placeName]);

    return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default CourseMap;