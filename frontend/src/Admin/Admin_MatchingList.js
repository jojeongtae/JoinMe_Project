import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {matchingInfo} from "../mainSlice";

export default function Admin_MatchingList() {
    const dispatch = useDispatch();
    const matching = useSelector(state => state.main.matchingInfo);

    useEffect(() => {
        dispatch(matchingInfo());
    }, [dispatch]);

    return (
        <>
        <section id={"admin-matching"}>
            <h2 style={styles.title}>유저 매칭 현황</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>관리</th>
                    <th>상세</th>
                </tr>
                </thead>
                <tbody>
                {matching.map(m => (
                    <tr key={m.num}>
                        <td>{m.num}</td>
                        <td>{m.male.name} ({m.male.id}) <br/>↔ {m.female.name} ({m.female.id})</td>
                        <td>{m.status}</td>
                        <td>
                            <button>상세보기</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>

        </>
    );
}


const styles = {
    container: {padding: '20px'},
    title: {fontSize: '1.5rem', marginBottom: '20px'},
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
        textAlign: 'center'

    }
};