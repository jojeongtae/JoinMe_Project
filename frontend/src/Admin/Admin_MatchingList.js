import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {matchingInfo} from "../mainSlice";
import apiClient from "../api/apiClient";

export default function Admin_MatchingList() {
    const [matching, setMatching] = useState([]);

    useEffect(() => {
        const loadMatching = async () => {
            try {
                const response = await apiClient.get("/admin/matches",
                    {
                        withCredentials: true,
                    }
                )
                console.log("받은 매칭 데이터:", response.data);
                setMatching(response.data)
            } catch (error) {
                console.error("매칭 리스트 불러오기 실패:", error);
            }
        };

        loadMatching();
    }, []);

    return (
        <>
            <section id="admin" className="inner">
                <h2 className="admin-userlist-title">유저 매칭 현황</h2>
                <table className="admin-userlist-table">
                    <thead>
                    <tr>
                        <th>매칭ID</th>
                        <th>유저A</th>
                        <th>유저B</th>
                        <th>매칭 시각</th>
                    </tr>
                    </thead>
                    <tbody>
                    {matching.map(m => (
                        <tr key={m.num}>
                            <td>{m.num}</td>
                            <td>{m.userA}</td>
                            <td>{m.userB}</td>
                            <td>
                                {new Date(m.matchingTime).toLocaleString("ko-KR", {
                                    timeZone: "Asia/Seoul"
                                })}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
