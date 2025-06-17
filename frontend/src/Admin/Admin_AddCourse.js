import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import {addCourse} from "../mainSlice"; // 실제 경로에 맞게 수정


export default function Admin_AddCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.main.token);

    const [coursename, setCoursename] = useState("");
    const [address, setAddress] = useState("");
    const [body, setBody] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploadedImagePath, setUploadedImagePath] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) return "";

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await apiClient.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            });

            const imagePath = response.data.filePathName // 서버 반환 값에 따라 조정
            setUploadedImagePath(imagePath);
            return imagePath;
        } catch (err) {
            console.error("이미지 업로드 실패:", err);
            alert("이미지 업로드 실패");
            return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imagePath = await handleImageUpload();

        const courseData = {
            coursename,
            address,
            body,
            image: imagePath,
            updateDate: new Date().toISOString(),
        };

        try {
            await apiClient.post("/admin/add-course", courseData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch(addCourse({ coursename, address, body }));
            alert("코스가 추가되었습니다.");
            navigate("/admin-main/course-list");
        } catch (err) {
            console.error("코스 추가 실패:", err);
            alert("코스 추가 실패: " + err.response?.status);
        }
    };

    return (
        <section id="add-course" className="add-course-container">
            <h2 className="add-course-title">데이트 코스 추가</h2>

            <form onSubmit={handleSubmit} className="add-course-form">
                <div className="form-group">
                    <label htmlFor="coursename">코스명</label>
                    <input
                        id="coursename"
                        type="text"
                        value={coursename}
                        onChange={(e) => setCoursename(e.target.value)}
                        placeholder="코스명을 작성해주세요."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">지역</label>
                    <select
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    >
                        <option value="" disabled>지역을 선택해주세요</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="부산">부산</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="body">코스 설명</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="코스 설명을 입력해주세요."
                    />
                </div>

                <div className="profile-upload-wrapper">
                    <label>이미지 업로드</label>

                    <label className="custom-file-upload">
                        파일선택
                        <input
                            type="file"
                            accept="image/*"
                            className="custom-file-input"
                            onChange={handleImageChange}
                        />
                    </label>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="미리보기"
                            className="profile-preview"
                        />
                    )}
                </div>

                <div className="btn-wrap">
                    <button className={"btn"} type="submit">추가하기</button>
                </div>
            </form>
        </section>

    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "700",
        marginBottom: "30px",
        textAlign: "center",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#555",
    },
    input: {
        padding: "10px 14px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1.5px solid #ddd",
        transition: "border-color 0.3s ease",
    },
    select: {
        padding: "10px 14px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1.5px solid #ddd",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
    },
    textarea: {
        minHeight: "100px",
        padding: "10px 14px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1.5px solid #ddd",
        resize: "vertical",
        transition: "border-color 0.3s ease",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
    },
    btn: {
        padding: "12px 28px",
        fontSize: "1rem",
        backgroundColor: "#ff5b5b",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        boxShadow: "0 4px 8px rgba(255, 91, 91, 0.4)",
        transition: "background-color 0.3s ease",
    },
};