import {useDispatch, useSelector} from "react-redux";
import apiClient from "../api/apiClient";
import {useEffect, useState} from "react";
import {giveLike, setUsers, togglePostHidden} from "../mainSlice";
import {useOutletContext} from "react-router-dom";

export default function Admin_UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.main.users ?? []);

    const {setShowPopup, setSelectedPost} = useOutletContext();

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/user/list");
            return response.data;
        } catch (error) {
            console.error("유저 리스트 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchData();
                dispatch(setUsers(userList));
            } catch (error) {
                console.error("유저 리스트 로딩 실패:", error);
            }
        };

        loadUsers();
    }, [dispatch]);

    const handleShowPopup = (user) => {
        setSelectedPost(user);
        setShowPopup(true);
    };

    return (
        <>
            <section style={styles.container}>
                <h2 style={styles.title}>전체 유저 리스트</h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>닉네임</th>
                        <th style={styles.th}>성별</th>
                        <th style={styles.th}>나이</th>
                        <th style={styles.th}>상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td style={styles.td}>{user.username}</td>
                            <td style={styles.td}>{user.usernickname}</td>
                            <td style={styles.td}>{user.sexuality}</td>
                            <td style={styles.td}>{user.age}</td>
                            <td style={styles.td}>
                                <button style={styles.detailBtn} onClick={() => handleShowPopup(user)}>상세보기</button>
                            </td>
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