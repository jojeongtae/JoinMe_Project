import { useNavigate } from "react-router-dom";

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