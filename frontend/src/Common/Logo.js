import { useNavigate } from "react-router-dom";
import "./Logo.css"; // 아래 CSS 연결

export default function Logo() {
    const navigate = useNavigate();

    return (
        <section id={"logo-page"}>
            <img src="/logo.png" alt="logo" className="logo-image" />
            <button className="login-button" onClick={() => navigate("/login")}>
                로그인
            </button>
        </section>
    );
}