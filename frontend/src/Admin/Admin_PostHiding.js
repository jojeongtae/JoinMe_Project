import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {togglePostHidden} from "../mainSlice";

export default function Admin_PostHiding() {
    const posts = useSelector(state => state.main.users);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleShowPopup = (post) => {
        setSelectedPost(post);
        setShowPopup(true);
    };

    const handleToggleHidden = (postId) => {
        dispatch(togglePostHidden(postId));
    };

    return (
        <>
            <section id={"post-hiding"} style={styles.container}>
                <h2 style={styles.title}>게시물 숨김 관리</h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>관리</th>
                        <th>상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.name}</td>
                            <td>
                                <button onClick={() => handleToggleHidden(post.id)}>
                                    {post.hidden ? '공개' : '숨김'}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleShowPopup(post)}>
                                    상세보기
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            {showPopup && selectedPost && (
                <div style={styles.overlay}>
                    <div style={styles.popup}>
                        <div style={styles.card}>
                            <img src={selectedPost.imgPath} alt="img" style={styles.image}/>
                            <div style={styles.info}>
                                <h3>{selectedPost.name}</h3>
                                <p>키: {selectedPost.height}cm / 몸무게: {selectedPost.weight}kg</p>
                                <p>MBTI: {selectedPost.mbti}</p>
                                <p>관심사: {selectedPost.interest}</p>
                                <p>주소: {selectedPost.address}</p>
                                <p style={styles.intro}>{selectedPost.intro}</p>
                            </div>
                        </div>

                        <div style={styles.buttons}>
                            <button style={styles.close} onClick={() => setShowPopup(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
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
    card: {
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: "300px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    info: {
        marginTop: "10px",
    },
    intro: {
        fontStyle: "italic",
        marginTop: "10px",
        color: "#444",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        marginTop: "15px",
    },
    close: {
        padding: "6px 20px",
        backgroundColor: "#ff5b5b",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    overlay: {
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    popup: {
        width: '500px',
        height: '600px',
        overflow: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },

};