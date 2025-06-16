import React, { useEffect, useState } from "react";
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
            <div className="reportlist-header">
                <h3>📋 내가 차단한 유저 목록</h3>
                <button className="btn gray small" onClick={onClose}>닫기</button>
            </div>

            {loading ? (
                <p className="text-center">불러오는 중...</p>
            ) : reportList.length === 0 ? (
                <p className="text-center">차단한 유저가 없습니다.</p>
            ) : (
                <div className="reportlist-container">
                    {reportList.map((item, i) => (
                        <div key={i} className="reportlist-card">
                            <div><strong>차단 대상:</strong> {item.hated}</div>
                            <div>
                                <strong>차단 일시:</strong>{" "}
                                {item.hate_time
                                    ? new Date(item.hate_time).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                                    : "날짜 정보 없음"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}