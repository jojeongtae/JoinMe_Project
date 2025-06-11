import { useSelector, useDispatch } from "react-redux";
import {giveLike} from "../mainSlice";

export default function Users() {

    const users = useSelector((state) => state.main.users.filter(e=>!(e.id===state.main.currentUser.id)));
    const currentUser = useSelector(state => state.main.currentUser)
    users.push(currentUser)
    const dispatch = useDispatch();

    return (
        <div style={styles.container}>
            {users.map((e) => (
                <div key={e.username} style={styles.card}>
                    <img src={e.profileimg} alt="img" style={styles.image} />
                    <div style={styles.info}>
                        <h3>{e.usernickname}</h3>
                        <p>키: {e.height}cm / 몸무게: {e.weight}kg</p>
                        <p>MBTI: {e.mbti}</p>
                        <p>관심사: {e.interest}</p>
                        <p>주소: {e.address}</p>
                        <p style={styles.intro}>{e.introduction}</p>
                        <div style={styles.buttons}>
                            <button style={styles.like} onClick={()=>dispatch(giveLike(e.id))}>좋아요</button>
                            <button style={styles.block}>차단하기</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
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
        justifyContent: "space-between",
        marginTop: "15px",
    },
    like: {
        padding: "6px 12px",
        backgroundColor: "#ff5b5b",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    block: {
        padding: "6px 12px",
        backgroundColor: "#aaa",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};