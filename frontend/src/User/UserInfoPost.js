import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './UserInfoPost.css';
import apiClient from "../api/apiClient";

export default function UserInfoPost() {
    const currentUser = useSelector(state => state.main.currentUser);

    const [formData, setFormData] = useState({
        username: '',
        sexuality: '',
        age: '',
        height: '',
        weight: '',
        interest: '',
        address: '',
        introduction: '',
        mbti: '',
        profileimg: '',
        usernickname: '',
    });

    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                username: currentUser
            }));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/userinfo', formData);
            console.log('서버 응답:', response.data);
            alert('프로필 정보가 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('전송 중 오류:', error);
            alert('전송 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="profile-form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2>세부 프로필 작성</h2>

                <label>아이디 (username) <span className="required">*</span></label>
                <input name="username" value={formData.username} readOnly />

                <label>닉네임 <span className="required">*</span></label>
                <input name="usernickname" value={formData.usernickname} onChange={handleChange} required />

                <label>성별 (sexuality) <span className="required">*</span></label>
                <select name="sexuality" value={formData.sexuality} onChange={handleChange} required>
                    <option value="">선택</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                </select>

                <label>나이 <span className="required">*</span></label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>키 (cm) <span className="required">*</span></label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />

                <label>몸무게 (kg) <span className="required">*</span></label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

                <label>관심사</label>
                <input name="interest" value={formData.interest} onChange={handleChange} />

                <label>주소 <span className="required">*</span></label>
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

                <label>프로필 이미지 경로 <span className="required">*</span></label>
                <input name="profileimg" value={formData.profileimg} onChange={handleChange} required />

                <button type="submit">제출</button>
            </form>
        </div>
    );
}