import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import apiClient from "../api/apiClient";
import {loginUser} from "../mainSlice";
import {useNavigate} from "react-router-dom";
export default function UserInfoPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.main.currentUser);

    const [formData, setFormData] = useState({
        username: '',
        usernickname: '',
        sexuality: '',
        age: '',
        height: '',
        weight: '',
        interest: '',
        address: '',
        introduction: '',
        mbti: '',
        profileimg: '',
    });

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    useEffect(() => {
        if (currentUser?.username) {
            setFormData(prev => ({ ...prev, username: currentUser.username }));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("image", file);

        try {
            setUploading(true);
            const res = await apiClient.post("/upload", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData(prev => ({ ...prev, profileimg: res.data.filePathName }));
            setUploadError("");
        } catch (err) {
            console.error("업로드 실패", err);
            setUploadError("이미지 업로드 실패");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiClient.post("user/add-info", formData);
            dispatch(loginUser(res.data));
            navigate("/main");
        } catch (err) {
            console.error("프로필 제출 오류:", err);
            alert("프로필 제출에 실패했습니다.");
        }
    };

    if (!currentUser) return <p>로딩 중...</p>;

    return (
        <section id="userinfo-post" className="profile-form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2>세부 프로필 작성</h2>

                <label>아이디<span className="required">*</span></label>
                <input name="username" value={formData.username} readOnly />

                <label>닉네임<span className="required">*</span></label>
                <input name="usernickname" value={formData.usernickname} onChange={handleChange} required />

                <label>성별<span className="required">*</span></label>
                <select name="sexuality" value={formData.sexuality} onChange={handleChange} required>
                    <option value="">선택</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                </select>

                <label>나이<span className="required">*</span></label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>키 (cm)<span className="required">*</span></label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />

                <label>몸무게 (kg)<span className="required">*</span></label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

                <label>관심사</label>
                <input name="interest" value={formData.interest} onChange={handleChange} />

                <label>주소<span className="required">*</span></label>
                <input name="address" value={formData.address} onChange={handleChange} required />

                <label>자기소개</label>
                <textarea name="introduction" value={formData.introduction} onChange={handleChange} />

                <label>MBTI</label>
                <select name="mbti" value={formData.mbti} onChange={handleChange}>
                    <option value="">선택</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                </select>

                <label>프로필 이미지 업로드<span className="required">*</span></label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {uploading && <p>업로드 중...</p>}
                {uploadError && <p className="form-error">{uploadError}</p>}
                {formData.profileimg && <img src={formData.profileimg} alt="프로필 미리보기" style={{ maxWidth: "200px" }} />}

                <button type="submit" disabled={uploading}>제출</button>
            </form>
        </section>
    );
}