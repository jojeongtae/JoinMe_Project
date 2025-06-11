import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addCourse} from "../mainSlice";
import apiClient from "../api/apiClient";

export default function Admin_AddCourse() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.main.token);

    const [coursename, setCoursename] = useState("");
    const [address, setAddress] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
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
            const response = apiClient.post("/admin/add-course",
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

        } catch (err) {
            console.error("코스 추가 실패:", err);
            alert("코스 추가 실패: " + err.response?.status);
        }
    }

    return (
        <>
            <form id={"admin-course"} onSubmit={handleSubmit}>
                <h2 style={styles.title}>유저 매칭 현황</h2>
                <ul>
                    <li>
                        <label>코스명</label>
                        <input type={"text"} value={coursename} placeholder={"코스명을 작성해주세요."}
                               onChange={(e) => setCoursename(e.target.value)} required/>
                    </li>
                    <li>
                        <label>지역</label>
                        <select name="address" value={address} onChange={(e) => setAddress(e.target.value)} required>
                            <option value="지역">지역</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="경기">부산</option>
                        </select>
                    </li>
                    <li>
                        <label>코스 설명</label>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)}
                                  placeholder={"코스 설명을 입력해주세요."}></textarea>
                    </li>
                </ul>

                <div style={styles.buttons}>
                    <button type={"submit"} style={styles.btn}>추가하기</button>
                </div>
            </form>
        </>
    );
}

const styles = {
    container: {padding: '20px'},
    title: {fontSize: '1.5rem', marginBottom: '20px'},
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
        textAlign: 'center'
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        marginTop: "15px",
    },
    btn: {
        padding: "6px 20px",
        backgroundColor: "#ff5b5b",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};