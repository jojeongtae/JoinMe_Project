import React, { useState } from "react";
import "./MyPage.css";
import apiClient from "../api/apiClient";
import {useDispatch} from "react-redux";
import {loginUser} from "../mainSlice";

export default function EditProfileForm({ user, onCancel, onSubmit }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: user.username || "",
        usernickname: user.usernickname || "",  // 닉네임 추가
        sexuality: user.sexuality || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        interest: user.interest || "",
        address: user.address || "",
        mbti: user.mbti || "",
        introduction: user.introduction || "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["usernickname", "sexuality", "age", "height", "weight", "interest", "address", "mbti", "introduction"];
        const hasEmpty = requiredFields.some(field => !formData[field]);

        if (hasEmpty) {
            setError("모든 항목을 입력해주세요.");
            return;
        }

        try {
            setLoading(true);

            // profileimg는 수정 없이 기존 값 유지
            const submitData = { ...formData, profileimg: user.profileimg };

            const res = await apiClient.put("/user/update-info", submitData);

            dispatch(loginUser(res.data));
            onCancel();
        } catch (err) {
            console.error("❌ 수정 실패:", err);
            setError("수정 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <h2>프로필 수정</h2>

            <label>아이디 (수정불가)
                <input name="username" value={formData.username} disabled />
            </label>

            <label>닉네임
                <input name="usernickname" value={formData.usernickname} onChange={handleChange} />
            </label>

            <label>성별
                <input name="sexuality" value={formData.sexuality} onChange={handleChange} />
            </label>
            <label>나이
                <input name="age" type="number" value={formData.age} onChange={handleChange} />
            </label>
            <label>키
                <input name="height" type="number" value={formData.height} onChange={handleChange} />
            </label>
            <label>몸무게
                <input name="weight" type="number" value={formData.weight} onChange={handleChange} />
            </label>
            <label>관심사
                <input name="interest" value={formData.interest} onChange={handleChange} />
            </label>
            <label>주소
                <input name="address" value={formData.address} onChange={handleChange} />
            </label>
            <label>MBTI
                <input name="mbti" value={formData.mbti} onChange={handleChange} />
            </label>
            <label>자기소개
                <textarea name="introduction" value={formData.introduction} onChange={handleChange} />
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="edit-form-buttons">
                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "저장 중..." : "저장"}
                </button>
                <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
                    취소
                </button>
            </div>
        </form>
    );
}