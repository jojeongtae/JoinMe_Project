import React, { useState } from 'react';
import './UserInfoPost.css';

export default function UserInfoPost() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('제출된 정보:', formData);
        // 여기에 axios.post 등으로 서버로 전송하면 됨
    };

    return (
        <div className="profile-form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2>세부 프로필 작성</h2>

                <label>아이디 (username) <span className="required">*</span></label>
                <input name="username" value={formData.username} onChange={handleChange} required />

                <label>닉네임 <span className="required">*</span></label>
                <input name="usernickname" value={formData.usernickname} onChange={handleChange} required />

                <label>성별 (sexuality) <span className="required">*</span></label>
                <select name="sexuality" value={formData.sexuality} onChange={handleChange} required>
                    <option value="">선택</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                    <option value="기타">기타</option>
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
                <input name="mbti" value={formData.mbti} onChange={handleChange} />

                <label>프로필 이미지 경로 <span className="required">*</span></label>
                <input name="profileimg" value={formData.profileimg} onChange={handleChange} required />

                <button type="submit">제출</button>
            </form>
        </div>
    );
}