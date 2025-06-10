import { useSelector, useDispatch } from "react-redux";
import "./ILike.css";

export default function ILike() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.main.currentUser);
    const allUsers = useSelector(state => state.main.users);

    if (!currentUser || !currentUser.userLiked) return <p>로그인 후 이용해주세요.</p>;

    const likedUsers = currentUser.userLiked
        .map(liked => allUsers.find(user => user.id === liked.id))
        .filter(user => user); // null 제거

    const handleUnlike = (id) => {
        dispatch({ type: "main/unlike", payload: id });
    };

    return (
        <div className="ilike-wrapper">
            <h2 className="ilike-title">❤️ 내가 좋아요 누른 사람들</h2>
            {likedUsers.length === 0 ? (
                <p className="ilike-empty">아직 좋아요를 누른 사람이 없어요.</p>
            ) : (
                likedUsers.map(user => (
                    <div className="ilike-card" key={user.id}>
                        <img className="ilike-img" src={user.imgPath} alt={user.name} />
                        <div className="ilike-info">
                            <h3>{user.name}</h3>
                            <p><strong>MBTI:</strong> {user.mbti} / <strong>관심사:</strong> {user.interest}</p>
                            <p><strong>지역:</strong> {user.addr} / <strong>키:</strong> {user.height}cm / <strong>몸무게:</strong> {user.weight}kg</p>
                            <p>{user.intro}</p>
                            <button className="ilike-button" onClick={() => handleUnlike(user.id)}>좋아요 취소</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}