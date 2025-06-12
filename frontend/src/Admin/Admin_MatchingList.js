import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {matchingInfo} from "../mainSlice";
import apiClient from "../api/apiClient";

export default function Admin_MatchingList() {
    const [matching, setMatching] = useState([]);

    useEffect(() => {
        const loadMatching = async () => {
            try {
                const response = await apiClient.get("/admin/matches",
                    {
                        withCredentials: true,
                    }
                )
                console.log("받은 매칭 데이터:", response.data);
                setMatching(response.data)
            } catch (error) {
                console.error("매칭 리스트 불러오기 실패:", error);
            }
        };

        loadMatching();
    }, []);

    return (
        <>
            <section style={styles.container}>
                <h2 style={styles.title}>유저 매칭 현황</h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>매칭ID</th>
                        <th style={styles.th}>유저A</th>
                        <th style={styles.th}>유저B</th>
                        <th style={styles.th}>매칭 시각</th>
                    </tr>
                    </thead>
                    <tbody>
                    {matching.map(m => (
                        <tr key={m.num}>
                            <td style={styles.td}>{m.num}</td>
                            <td style={styles.td}>{m.userA}</td>
                            <td style={styles.td}>{m.userB}</td>
                            <td style={styles.td}>{new Date(m.matchingTime).toLocaleString("ko-KR", {
                                timeZone: "Asia/Seoul"
                            })}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

const styles = {
    container: {
        padding: '32px',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '24px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#222',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    th: {
        backgroundColor: '#f5f5f5',
        padding: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '12px',
        fontSize: '0.9rem',
        borderBottom: '1px solid #eee',
        textAlign: 'center',
    },
};