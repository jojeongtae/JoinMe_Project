import React from "react";

export default function Intro() {
    return (
        <div style={styles.wrapper}>
            <div style={styles.overlay}>
                <h1 style={styles.title}>진짜 인연, 여기서 시작됩니다</h1>
                <p style={styles.paragraph}>
                    우리는 단순한 스쳐 지나가는 만남이 아닌, 깊이 있는 연결을 소중히 여깁니다.<br />
                    혼자 있는 시간이 익숙해졌지만, 누군가와 함께 웃고 싶어지는 날.<br />
                    내 이야기를 들어줄 한 사람, 나의 하루에 따뜻한 온기를 더해줄 인연.<br />
                    지금 이곳에서 그 특별한 첫 걸음을 시작해보세요.
                </p>
                <img
                    src="/main-banner.png"
                    alt="소개팅 배너"
                    style={styles.image}
                />
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
    },
    overlay: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        padding: "40px",
        textAlign: "center",
        maxWidth: "800px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    title: {
        fontSize: "32px",
        marginBottom: "20px",
    },
    paragraph: {
        fontSize: "18px",
        lineHeight: "1.8",
        marginBottom: "30px",
        whiteSpace: "pre-line",
    },
    image: {
        width: "70%",
        borderRadius: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
};