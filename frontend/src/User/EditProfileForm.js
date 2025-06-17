import React, {useState} from "react";
import apiClient from "../api/apiClient";
import {useDispatch} from "react-redux";
import {loginUser} from "../mainSlice";

export default function EditProfileForm({user, onCancel, onSubmit}) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: user.username || "",
        usernickname: user.usernickname || "",
        sexuality: user.sexuality || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        interest: user.interest || "",
        address: user.address || "",
        mbti: user.mbti || "",
        introduction: user.introduction || "",
        profileimg: user.profileimg || "", // 추가
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false); // 이미지 업로드 중 여부

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("image", file);

        try {
            setUploading(true);
            const response = await apiClient.post("/upload", form, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            const path = response.data.filePathName;
            setFormData(prev => ({...prev, profileimg: path}));
        } catch (err) {
            console.error("❌ 이미지 업로드 실패:", err);
            setError("이미지 업로드 실패");
        } finally {
            setUploading(false);
        }
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

            const res = await apiClient.put("/user/update-info", formData);

            dispatch(loginUser(res.data));
            onCancel(); // 또는 onSubmit(res.data)
        } catch (err) {
            console.error("❌ 수정 실패:", err);
            setError("수정 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="edit-form">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2>프로필 수정</h2>

                <label>아이디
                    <input name="username" value={formData.username} disabled readOnly/>
                </label>

                <label>닉네임
                    <input name="usernickname" value={formData.usernickname} onChange={handleChange} required/>
                </label>

                <label>성별
                    <select name="sexuality" value={formData.sexuality} onChange={handleChange} required>
                        <option value="">선택</option>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                    </select>
                </label>

                <label>나이
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required/>
                </label>

                <label>키 (cm)
                    <input type="number" name="height" value={formData.height} onChange={handleChange} required/>
                </label>

                <label>몸무게 (kg)
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} required/>
                </label>

                <label>관심사
                    <input name="interest" value={formData.interest} onChange={handleChange}/>
                </label>

                <label>주소
                    <input name="address" value={formData.address} onChange={handleChange} required/>
                </label>

                <label>자기소개
                    <textarea name="introduction" value={formData.introduction} onChange={handleChange}/>
                </label>

                <label>MBTI
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
                </label>

                <div className="profile-upload-wrapper">
                    <label>프로필 사진 업로드</label>
                    <label className="custom-file-upload">
                        파일선택
                        <input
                            type="file"
                            accept="image/*"
                            className="custom-file-input"
                            onChange={handleImageChange}
                            disabled={uploading}
                        />
                    </label>

                    {formData.profileimg && (
                        <img
                            src={formData.profileimg}
                            alt="프로필 미리보기"
                            className="profile-preview"
                        />
                    )}
                </div>

                {error && <p className="form-error">{error}</p>}

                <div className="btn-wrap">
                    <button className="submit-btn" type="submit" disabled={loading || uploading}>
                        {loading ? "저장 중..." : "저장"}
                    </button>
                    <button className="btn gray" type="button" onClick={onCancel} disabled={loading || uploading}>
                        취소
                    </button>
                </div>
            </form>
        </section>

    );
}