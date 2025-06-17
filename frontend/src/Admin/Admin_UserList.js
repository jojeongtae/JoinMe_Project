import {useDispatch, useSelector} from "react-redux";
import apiClient from "../api/apiClient";
import {useEffect, useState} from "react";
import {giveLike, setUsers, togglePostHidden} from "../mainSlice";
import {useOutletContext} from "react-router-dom";

export default function Admin_UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.main.users ?? []);
    const {setShowPopup, setSelectedPost} = useOutletContext();

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/user/list");
            return response.data;
        } catch (error) {
            console.error("유저 리스트 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchData();
                const hiddenFlag = userList.map(user => ({
                    ...user,
                    hidden: user.hidden ?? false
                }));
                dispatch(setUsers(hiddenFlag));
            } catch (error) {
                console.error("유저 리스트 로딩 실패:", error);
            }
        };

        loadUsers();
    }, [dispatch]);

    const handleShowPopup = (user) => {
        console.log("Admin_UserList에서 넘기는 user:", user);
        setSelectedPost(user);
        setShowPopup(true);
    };

    const handleToggleHidden = async (username, isHidden) => {
        try {
            if (isHidden) {
                await apiClient.delete("/hide-delete", { data: { username } });
            } else {
                await apiClient.post("/hide", { username });
            }

            const userList = await apiClient.get("/user/list");
            dispatch(setUsers(userList.data));
        } catch (error) {
            console.error("숨김/공개 처리 실패:", error);
        }
    };

    return (
        <>
            <section id={"admin"} className="inner admin-userlist-container">
                <h2 className="admin-userlist-title">현재 유저 리스트</h2>
                <table className="admin-userlist-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>닉네임</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>게시물 관리</th>
                        <th>상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.usernickname}</td>
                            <td>{user.sexuality}</td>
                            <td>{user.age}</td>
                            <td>
                                <button
                                    className={user.hidden ? 'unhide-btn' : 'hide-btn'}
                                    onClick={() => handleToggleHidden(user.username, user.hidden)}
                                >
                                    {user.hidden ? '공개' : '숨김'}
                                </button>
                            </td>
                            <td>
                                <button className="detail-btn" onClick={() => handleShowPopup(user)}>상세보기</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
