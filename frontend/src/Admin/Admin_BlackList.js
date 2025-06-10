export default function Admin_BlackList() {
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
                    <th>ID</th>
                    <th>이름</th>
                    <th>누적 신고수</th>
                    <th>상태</th>
                    <th>차단된 시간</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>이름</td>
                        <td>누적 신고수</td>
                        <td>계정 정지</td>
                        <td>시간~~</td>
                        <td>
                            <button>차단 해제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        </>
    );
}