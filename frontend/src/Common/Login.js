import { useDispatch, useSelector } from "react-redux";
import {loginUser, setToken} from "../mainSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import apiClient from "../api/apiClient";
import axios from "axios";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.id.value;
        const password = e.target.pw.value;

        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // 백엔드가 쿠키 기반 인증이면 필요
                }
            );

            // 로그인 성공 시 백엔드에서 토큰과 사용자 정보 받는다고 가정
            const { token, user } = response.data;

            // 토큰 저장 (localStorage or redux 등)
            localStorage.setItem("jwtToken", token);

            // 리덕스에 로그인 상태 저장
            dispatch(loginUser(user));

            alert(`${user.usernickname}님 로그인 성공!`);
            navigate("/main");
        } catch (error) {
            console.error("로그인 에러", error);
            alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };
    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundintro.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="overlay">
                <h1 className="welcome-text">당신의 인연, 오늘 여기에서 시작됩니다.</h1>
                <form className="login-box" onSubmit={handleLogin}>
                    <h2>로그인</h2>
                    <input name="id" type="text" placeholder="아이디" required />
                    <input name="pw" type="password" placeholder="비밀번호" required />
                    <button type="submit">로그인</button>
                    <button type="button" onClick={goToRegister} className="signup-btn">
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;