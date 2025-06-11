import { useDispatch, useSelector } from "react-redux";
import {loginUser, setToken} from "../mainSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import apiClient from "../api/apiClient";
import axios from "axios";
import {useState} from "react";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post(
                "http://localhost:8080/login",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            // response.data : { role, result: "로그인 성공" } 형태 예상
            setLoginResult(response.data.result);


            // access token은 Authorization 헤더에 "Bearer {token}" 형태로 옴
            const accessToken = response.headers["authorization"];
            if (accessToken) {
                const token = accessToken.replace("Bearer ", "");
                dispatch(setToken(token));
                // 토큰 저장 예: localStorage.setItem("accessToken", token);
                console.log("access token:", token);
            }
            dispatch(loginUser(response.data.username))
            console.log(response.data)
            if(response.data.role==="ROLE_USER"){
                navigate("/main")
            }
            else{
                navigate("/admin-main")
            }
        } catch (error) {
            // 로그인 실패 시 에러 메시지 표시
            setLoginResult(
                error.response?.data?.result || "로그인 실패 - 서버와 연결 실패"
            );
            alert(error.response.data.result)
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
                    <input
                        name="id"
                        type="text"
                        placeholder="아이디"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        name="pw"
                        type="password"
                        placeholder="비밀번호"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">로그인</button>
                    <button type="button" onClick={goToRegister} className="signup-btn">
                        회원가입
                    </button>
                </form>
            </div>
            <p>{loginResult}</p>
        </div>
    );
}

export default Login;