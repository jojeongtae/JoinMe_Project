import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addCourse} from "../mainSlice";
import apiClient from "../api/apiClient";
import {useNavigate} from "react-router-dom";

export default function Admin_AddCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.main.token);

    const [coursename, setCoursename] = useState("");
    const [address, setAddress] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("추가 요청할 코스:", coursename, address, body);
        console.log("토큰 확인:", token);

        const courseData = {
            coursename,
            address,
            body,
            image: "",
            updateDate: new Date().toISOString(),
        };

        try {
            const response = await apiClient.post("/admin/add-course",
                courseData,
                {
                    withCredentials: true,
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(addCourse({ coursename, address, body }));
            alert("코스가 추가되었습니다.");
            navigate("/admin-main/course-list");
        } catch (err) {
            console.error("코스 추가 실패:", err);
            alert("코스 추가 실패: " + err.response?.status);
        }
    }

    return (
        <>
            <section id={"admin-course"} style={styles.container}>
                <h2 style={styles.title}>데이트 코스 추가</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="coursename">코스명</label>
                        <input
                            id="coursename"
                            type="text"
                            value={coursename}
                            placeholder="코스명을 작성해주세요."
                            onChange={(e) => setCoursename(e.target.value)}
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
                        <button type="submit" style={styles.btn}>추가하기</button>
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
};