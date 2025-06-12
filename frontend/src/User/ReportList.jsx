import React, { useEffect, useState } from "react";
import "./ReportList.css";
import apiClient from "../api/apiClient";

export default function ReportList({ hater, onClose }) {
    const [reportList, setReportList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportList = async () => {
            try {
                const res = await apiClient.get(`/hate-list/${hater}`);
                setReportList(res.data);
            } catch (error) {
                console.error("신고 목록 조회 실패:", error);
                alert("신고 목록을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchReportList();
    }, [hater]);

    return (
        <div className="reportlist-wrapper">
            <h3>📋 내가 신고한 유저 목록</h3>
            <button className="reportlist-close" onClick={onClose}>닫기</button>
            {loading ? (
                <p>불러오는 중...</p>
            ) : reportList.length === 0 ? (
                <p>신고한 유저가 없습니다.</p>
            ) : (
                reportList.map((item, i) => (
                    <div key={i} className="reportlist-card">
                        <p><strong>신고 대상:</strong> {item.hated}</p>
                        <p>
                            <strong>신고 일시:</strong>{" "}
                            {item.hate_time
                                ? new Date(item.hate_time).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                                : "날짜 정보 없음"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}