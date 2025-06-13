import React, {useEffect} from "react";
import apiClient from "../api/apiClient";
import {loginUser} from "../mainSlice";
import {useDispatch} from "react-redux";

export default function Intro() {
    return (
        <section id={"user-main"}>
            <div className={"user-main-wrap"}>
                <div className={"bg-overlay"}>
                    <h1 className={"main-title"}>진짜 인연, 여기서 시작됩니다</h1>
                    <p className={"main-paragraph"}>
                        우리는 단순한 스쳐 지나가는 만남이 아닌, 깊이 있는 연결을 소중히 여깁니다.<br/>
                        혼자 있는 시간이 익숙해졌지만, 누군가와 함께 웃고 싶어지는 날.<br/>
                        내 이야기를 들어줄 한 사람, 나의 하루에 따뜻한 온기를 더해줄 인연.<br/>
                        지금 이곳에서 그 특별한 첫 걸음을 시작해보세요.
                    </p>
                    <img className={"main-banner"} src="/main-banner.png" alt="소개팅 배너"/>
                </div>
            </div>
        </section>
    );
}