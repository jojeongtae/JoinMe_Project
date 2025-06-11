import {useDispatch, useSelector} from "react-redux";
import {removeHate} from "../mainSlice";

export default function Admin_BlackList() {
    const dispatch = useDispatch();
    const hates = useSelector(state => state.main.hates);
    const users = useSelector(state => state.main.users);

    const handleRemove = (hater, hated) => {
        dispatch(removeHate({ hater, hated }));
    };

    return (
        <>
        <section id={"black-list"}>
            <h2>블랙리스트 관리</h2>

            <div>
                <button>추가</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>차단 유저</th>
                    <th>누적 신고수</th>
                    <th>신고자</th>
                    <th>상태</th>
                    <th>차단된 시간</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {hates.map(hate => {
                    const hater = users.find(u => u.id === hate.hater);
                    const hated = users.find(u => u.id === hate.hated);
                    return (
                        <tr key={hate.num}>
                            <td>{hater?.name} ({hater?.id})</td>
                            <td>누적 신고수</td>
                            <td>{hated?.name} ({hated?.id})</td>
                            <td>계정 정지</td>
                            <td>{hate.hateTime}</td>
                            <td>
                                <button onClick={() => handleRemove(hater.id, hated.id)}>
                                    삭제
                                </button>
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