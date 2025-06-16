import { useDispatch, useSelector } from "react-redux";
import {loginUser, setToken} from "../mainSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate()
    const fetchUserInfo = async (username, accessToken) => {
        if (!accessToken) return null; // 토큰 없으면 호출하지 않음

        try {
            const response = await axios.get(`http://localhost:8080/user/userinfo/${username}`, {
                headers: { Authorization: accessToken },
                withCredentials: true,
            });
            console.log(accessToken)
            return response.data;
        } catch (error) {
            console.error("회원정보 불러오기 실패", error);
            return null;
        }
    };

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

            setLoginResult(response.data.result);

            const accessTokenRaw = response.headers["authorization"];
            if (!accessTokenRaw) {
                setLoginResult("로그인 실패 - 토큰이 없습니다.");
                return;
            }
            // const accessToken = accessTokenRaw.replace("Bearer ", "");
            dispatch(setToken(accessTokenRaw));
            dispatch(loginUser(response.data))
            console.log("access token:", accessTokenRaw);

            if (response.data.role === "ROLE_USER") {
                const userInfo = await fetchUserInfo(username, accessTokenRaw);
                if (userInfo) {
                    dispatch(loginUser(userInfo));
                    navigate("/main");
                } else {
                    setLoginResult("회원정보를 불러올 수 없습니다.");
                    navigate("/userinfo-post")
                }
            } else if (response.data.role === "ROLE_ADMIN") {
                dispatch(loginUser(response.data.username))
                navigate("/admin-main");
            } else {
                setLoginResult("알 수 없는 사용자 권한입니다.");
            }
        } catch (error) {
            console.error(error);
            setLoginResult(
                error.response?.data?.result || "로그인 실패 - 서버와 연결 실패"
            );
            alert(error.response?.data?.result || "로그인 실패");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <section id={"login"}>
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
        </section>
    );
}

export default Login;