import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setUsers, togglePostHidden} from "../mainSlice";
import {useOutletContext} from "react-router-dom";

export default function Admin_PostHiding() {
    const posts = useSelector(state => state.main.users);
    const dispatch = useDispatch();
    const {setShowPopup, setSelectedPost} = useOutletContext();

    const handleShowPopup = (post) => {
        setSelectedPost(post);
        setShowPopup(true);
    };

    const handleToggleHidden = (username) => {
        dispatch(togglePostHidden(username));
    };

    return (
        <>
            <section style={styles.container}>
                <h2 style={styles.title}>숨긴 게시물 관리</h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>이름</th>
                        <th style={styles.th}>상세</th>
                        <th style={styles.th}>공개처리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.filter(post => post.hidden).map(post => (
                        <tr key={post.username}>
                            <td style={styles.td}>{post.username}</td>
                            <td style={styles.td}>{post.usernickname}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.actionBtnDetail}
                                    onClick={() => handleShowPopup(post)}
                                >
                                    상세보기
                                </button>
                            </td>
                            <td style={styles.td}>
                                <button
                                    style={styles.unhideBtn}
                                    onClick={() => handleToggleHidden(post.username)}
                                >
                                    숨김 풀기
                                </button>
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
    actionBtnDetail: {
        padding: '6px 12px',
        backgroundColor: '#ff7eb9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'background-color 0.2s ease',
    },
    unhideBtn: {
        padding: '6px 10px',
        backgroundColor: '#7dc87d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
};