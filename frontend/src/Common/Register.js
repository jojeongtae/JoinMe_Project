import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/signup", formData);
            alert("회원가입 성공!");

            // 자동 로그인 부분 삭제

            // 회원가입 성공 후 로그인 페이지로 이동
            navigate("/login");
        } catch (err) {
            alert("회원가입 실패: " + (err.response?.data?.message || err.message));
        }
    };

    const goToLogin = () => {
        navigate("/login");
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
                <form className="login-box" onSubmit={handleSubmit}>
                    <h2>회원가입</h2>
                    <input name="username" type="text" placeholder="아이디" value={formData.username} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
                    <input name="phone" type="text" placeholder="전화번호" value={formData.phone} onChange={handleChange} required />
                    <button type="submit">회원가입</button>
                    <button type="button" onClick={goToLogin} className="signup-btn">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Register;