import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./mainSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.main.users);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const pw = e.target.pw.value;
        const user = users.find((user) => user.id === id && user.pw == pw);

        if (user) {
            alert(`${user.name}님 로그인 성공`);
            dispatch(loginUser(user));
            navigate("/main");
        } else {
            alert("로그인 실패! ID 또는 비밀번호가 틀렸습니다.");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="login-container"
             style={{
                 backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundintro.jpg)`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 height: "100vh",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
             }}>
            <div className="overlay">
                <h1 className="welcome-text">당신의 인연, 오늘 여기에서 시작됩니다.</h1>
                <form className="login-box" onSubmit={handleLogin}>
                    <h2>로그인</h2>
                    <input name="id" type="text" placeholder="아이디" required />
                    <input name="pw" type="password" placeholder="비밀번호" required />
                    <button type="submit">로그인</button>
                    <button type="button" onClick={goToRegister} className="signup-btn">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Login;