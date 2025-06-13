import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import apiClient from "../api/apiClient";

export default function Admin_EditCourse() {
    const {id} = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.main.token);

    const [coursename, setCoursename] = useState("");
    const [address, setAddress] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/course/${id}`); // 얘만 만들면 됨
                const { coursename, address, body } = response.data;
                setCoursename(coursename);
                setAddress(address);
                setBody(body);
            } catch (error) {
                console.error("코스 정보 조회 실패", error);
                alert("코스 정보를 불러올 수 없습니다.");
                navigate("/admin-main/course-list");
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCourse = {
            id: parseInt(id),
            coursename,
            address,
            body,
            updateDate: new Date().toISOString(),
        };

        try {
            await apiClient.put("/update-course", updatedCourse, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("코스가 수정되었습니다.");
            navigate("/admin-main/course-list");
        } catch (err) {
            console.error("코스 수정 실패:", err);
            alert("코스 수정 실패: " + err.response?.status);
        }
    };

    return (
        <>
            <section id={"edit-course"} style={styles.container}>
                <h2 style={styles.title}>데이트 코스 수정</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="coursename">코스명</label>
                        <input
                            id="coursename"
                            type="text"
                            value={coursename}
                            onChange={(e) => setCoursename(e.target.value)}
                            placeholder="코스명을 입력해주세요."
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="address">지역</label>
                        <select
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            style={styles.select}
                        >
                            <option value="" disabled>지역을 선택해주세요</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="부산">부산</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="body">코스 설명</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="코스 설명을 입력해주세요."
                            style={styles.textarea}
                        />
                    </div>

                    <div style={styles.buttons}>
                        <button type="button" onClick={() => navigate("/admin-main/course-list")} style={styles.grayBtn}>취소하기</button>
                        <button type="submit" style={styles.btn}>수정하기</button>
                    </div>
                </form>
            </section>
        </>
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
    grayBtn: {
        padding: "12px 28px",
        fontSize: "1rem",
        backgroundColor: '#999',
        color: '#fff',
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
    },
};