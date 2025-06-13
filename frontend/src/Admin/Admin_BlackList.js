import {useDispatch, useSelector} from "react-redux";
import {fetchHates, removeHate} from "../mainSlice";
import apiClient from "../api/apiClient";
import {useEffect} from "react";

export default function Admin_BlackList() {
    const dispatch = useDispatch();
    const hates = useSelector(state => state.main.hates);
    const users = useSelector(state => state.main.users);

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/admin/hated-five");
            return response.data;
        } catch (error) {
            console.error("블랙리스트 불러오기 실패", error);
        }
    };

    useEffect(() => {
        const loadHates = async () => {
            try {
                const blackList = await fetchData();
                dispatch(fetchHates(blackList));
            } catch (error) {
                console.error("블랙리스트 로딩 실패", error);
            }
        };

        loadHates();
    }, [dispatch]);


    return (
        <>
            <section style={styles.container}>
                <h2 style={styles.title}>블랙리스트 관리</h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>신고 대상</th>
                        <th style={styles.th}>차단 시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hates.map(hate => {
                        const hater = users.find(u => u.username === hate.hater);
                        const hated = users.find(u => u.username === hate.hated);
                        return (
                            <tr key={hate.num}>
                                <td style={styles.td}>{hate.hated}</td>
                                <td style={styles.td}>{new Date(hate.hate_time).toLocaleString("ko-KR", {
                                    timeZone: "Asia/Seoul"
                                })}</td>
                            </tr>
                        );
                    })}
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
        textAlign: 'center',
    },
    td: {
        padding: '12px',
        fontSize: '0.9rem',
        borderBottom: '1px solid #eee',
        textAlign: 'center',
    },
    detailBtn: {
        padding: '6px 12px',
        backgroundColor: '#ff7eb9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'background-color 0.2s ease',
    },
};