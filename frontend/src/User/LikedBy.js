import { useDispatch, useSelector } from "react-redux";
import "./LikedBy.css";

export default function LikedBy() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.main.currentUser);
    const allUsers = useSelector(state => state.main.users);

    if (!currentUser || !currentUser.userLikedReceived) return <p>로그인 후 이용해주세요.</p>;

    const likedMeUsers = currentUser.userLikedReceived
        .map(liked => allUsers.find(user => user.id === liked.id))
        .filter(user => user); // null 제거

    const handleReturnLike = (id) => {
        dispatch({ type: "main/giveLike", payload: id });
    };

    return (
        <div className="likedby-wrapper">
            <h2 className="likedby-title">💌 나를 좋아요한 사람들</h2>
            {likedMeUsers.length === 0 ? (
                <p className="likedby-empty">아직 나를 좋아요한 사람이 없어요.</p>
            ) : (
                likedMeUsers.map(user => (
                    <div className="likedby-card" key={user.id}>
                        <img className="likedby-img" src={user.imgPath} alt={user.name} />
                        <div className="likedby-info">
                            <h3>{user.name}</h3>
                            <p><strong>MBTI:</strong> {user.mbti} / <strong>관심사:</strong> {user.interest}</p>
                            <p><strong>지역:</strong> {user.addr} / <strong>키:</strong> {user.height}cm / <strong>몸무게:</strong> {user.weight}kg</p>
                            <p>{user.intro}</p>
                            <button className="likedby-button" onClick={() => handleReturnLike(user.id)}>좋아요 돌려주기</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}