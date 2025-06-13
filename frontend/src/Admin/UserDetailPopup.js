export default function UserDetailPopup({ user, onClose }) {

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <div style={styles.card}>
                    <img src={user.profileimg} alt="img" style={styles.image} />
                    <div style={styles.info}>
                        <h3>{user.name}</h3>
                        <p>키: {user.height}cm / 몸무게: {user.weight}kg</p>
                        <p>MBTI: {user.mbti}</p>
                        <p>관심사: {user.interest}</p>
                        <p>주소: {user.address}</p>
                        <p style={styles.intro}>{user.intro}</p>
                    </div>
                </div>
                <div style={styles.buttons}>
                    <button style={styles.close} onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}


const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    popup: {
        width: '520px',
        maxHeight: '80vh',
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        overflowY: 'auto',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
        border: '1px solid #ddd',
    },
    info: {
        fontSize: '0.95rem',
        color: '#333',
        lineHeight: '1.6',
    },
    intro: {
        marginTop: '10px',
        fontStyle: 'italic',
        color: '#666',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    close: {
        padding: '8px 24px',
        backgroundColor: '#ff7eb9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s ease',
    },
};