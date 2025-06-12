import { useSelector, useDispatch } from "react-redux";
import {fetchHates, fetchLikes, giveLike, setUsers} from "../mainSlice";
import {useEffect} from "react";
import apiClient from "../api/apiClient";

export default function Users() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.main.currentUser);
    const hates = useSelector((state) => state.main.hates || []);
    const likes = useSelector((state) => state.main.likes || []);
    const allUsers = useSelector((state) => state.main.users || []);

    const blockedUsernames = hates.map((hate) => hate.hated);
    const likedUsernames = likes.map((like) => like.username); // like.username 기준

    const users = allUsers.filter(
        (e) =>
            e.username !== currentUser.username &&
            !blockedUsernames.includes(e.username) &&
            !likedUsernames.includes(e.username) &&
            e.sexuality !== currentUser.sexuality // 동성 제외
    );

    // 차단 목록 불러오기
    const fetchHateList = async () => {
        try {
            const res = await apiClient.get(`/hate-list/${currentUser.username}`);
            dispatch(fetchHates(res.data));
        } catch (err) {
            console.error("차단 목록 로딩 실패", err);
        }
    };

    // 좋아요한 유저 목록 불러오기
    const fetchLikeList = async () => {
        try {
            const res = await apiClient.get(`/like/liked-users?liker=${currentUser.username}`);
            dispatch(fetchLikes(res.data));
        } catch (err) {
            console.error("좋아요 목록 로딩 실패", err);
        }
    };

    useEffect(() => {
        if (currentUser?.username) {
            fetchHateList();
            fetchLikeList();
        }
    }, [currentUser]);

    // 유저 리스트 불러오기
    const fetchUserList = async () => {
        try {
            const response = await apiClient.get("/user/list");
            return response.data;
        } catch (error) {
            console.error("유저 리스트를 가져오는 중 오류 발생:", error);
            throw error;
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchUserList();
                dispatch(setUsers(userList));
            } catch (error) {
                console.error("유저 리스트 로딩 실패:", error);
            }
        };
        loadUsers();
    }, [dispatch]);

    // 좋아요 보내기
    const handleLike = async (likedUser) => {
        try {
            const payload = { liker: currentUser.username, liked: likedUser.username };
            await apiClient.post("/like", payload);
            alert("좋아요가 등록되었습니다.");
            fetchLikeList(); // 좋아요 누른 뒤 목록 재로딩
        } catch (error) {
            console.error("좋아요 요청 실패:", error);
            const errorMessage = error.response?.data || "좋아요 등록에 실패했습니다.";
            alert(errorMessage);
        }
    };

    // 신고하기
    const handleReport = async (hatedUser) => {
        try {
            const params = new URLSearchParams({
                hater: currentUser.username,
                hated: hatedUser.username,
            });
            await apiClient.post("/hate-user?" + params.toString());
            alert("차단되었습니다.");
            fetchHateList(); // 차단 후 재로딩
        } catch (error) {
            console.error("신고 요청 실패:", error);
            alert("신고 처리에 실패했습니다.");
        }
    };

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
                            <button style={styles.like} onClick={() => handleLike(e)}>
                                좋아요
                            </button>
                            <button style={styles.block} onClick={() => handleReport(e)}>
                                신고하기
                            </button>
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