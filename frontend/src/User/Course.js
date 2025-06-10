import {useSelector} from "react-redux";

export default function Course() {
    const courses = useSelector(state => state.main.courses);

    return (
        <section>
            <h2>등록된 코스 목록</h2>
            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>코스명</th>
                    <th>지역</th>
                    <th>설명</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    <tr key={course.num}>
                        <td>{course.num}</td>
                        <td>{course.courseName}</td>
                        <td>{course.address}</td>
                        <td>{course.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}