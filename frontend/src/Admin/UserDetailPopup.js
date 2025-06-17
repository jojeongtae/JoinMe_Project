export default function UserDetailPopup({ user, onClose }) {

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-card">
                    <img src={user.profileimg} alt="img" className="popup-image" />
                    <ul className="popup-info">
                        <h3 className="popup-name">{user.usernickname}</h3>
                        <li>
                            <span className="user-info-label">키 / 몸무게</span>
                            <span className="user-info-value">{user.height}cm / {user.weight}kg</span>
                        </li>
                        <li>
                            <span className="user-info-label">MBTI</span>
                            <span className="user-info-value">{user.mbti}</span>
                        </li>
                        <li>
                            <span className="user-info-label">관심사</span>
                            <span className="user-info-value">{user.interest}</span>
                        </li>
                        <li>
                            <span className="user-info-label">지역</span>
                            <span className="user-info-value">{user.address}</span>
                        </li>
                        <p className="popup-intro">{user.introduction}</p>
                    </ul>
                </div>
                <div className="btn-wrap">
                    <button className="btn gray" onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

