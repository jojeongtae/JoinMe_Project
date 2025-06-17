import {useDispatch, useSelector} from "react-redux";
import {fetchHates, removeHate} from "../mainSlice";
import apiClient from "../api/apiClient";
import {useEffect} from "react";

export default function Admin_BlackList() {
    const dispatch = useDispatch();
    const hates = useSelector(state => state.main.hates);
    const users = useSelector(state => state.main.users);

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/admin/hated-five");
            return response.data;
        } catch (error) {
            console.error("블랙리스트 불러오기 실패", error);
        }
    };

    useEffect(() => {
        const loadHates = async () => {
            try {
                const blackList = await fetchData();
                dispatch(fetchHates(blackList));
            } catch (error) {
                console.error("블랙리스트 로딩 실패", error);
            }
        };

        loadHates();
    }, [dispatch]);


    return (
        <>
            <section id="admin" className="inner">
                <h2 className="admin-userlist-title">블랙리스트 관리</h2>

                <table className="admin-userlist-table">
                    <thead>
                    <tr>
                        <th>신고 대상</th>
                        <th>차단 시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hates.map(hate => {
                        const hater = users.find(u => u.username === hate.hater);
                        const hated = users.find(u => u.username === hate.hated);
                        return (
                            <tr key={hate.num}>
                                <td>{hate.hated}</td>
                                <td>
                                    {new Date(hate.hate_time).toLocaleString("ko-KR", {
                                        timeZone: "Asia/Seoul"
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </section>

        </>
    );
}