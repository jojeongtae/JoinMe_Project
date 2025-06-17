import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {setUsers, togglePostHidden} from "../mainSlice";
import {useOutletContext} from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Admin_PostHiding() {
    const [posts, setPosts] = useState([]);
    const {setShowPopup, setSelectedPost} = useOutletContext();

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/hide-list");
            const postsWithHidden = response.data.map(post => ({
                ...post,
                hidden: true
            }));
            setPosts(postsWithHidden);
        } catch (error) {
            console.error("숨김 유저 리스트 로딩 실패", error);
        }
    };

    const handleToggleHidden = async (id) => {
        try {
            await apiClient.delete("/hide-delete", {
                data: { id: id }
            });
            fetchData();
        } catch (error) {
            console.error("숨김 해제 실패:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowPopup = async (post) => {
        const usrResponse = await apiClient.get(`/user/userinfo/${post.username}`);
        setSelectedPost(usrResponse.data);
        setShowPopup(true);
    };

    return (
        <>
            <section id="admin" className="inner">
                <h2 className="admin-userlist-title">숨김 유저 리스트</h2>
                <table className="admin-userlist-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>닉네임</th>
                        <th>처리 시각</th>
                        <th>상세</th>
                        <th>공개처리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.filter(post => post.hidden).map(post => (
                        <tr key={post.username}>
                            <td>{post.username}</td>
                            <td>{post.usernickname}</td>
                            <td>
                                {new Date(post.hide_time).toLocaleString("ko-KR", {
                                    timeZone: "Asia/Seoul",
                                })}
                            </td>
                            <td>
                                <button
                                    className="detail-btn"
                                    onClick={() => handleShowPopup(post)}
                                >
                                    상세보기
                                </button>
                            </td>
                            <td>
                                <button
                                    className="unhide-btn"
                                    onClick={() => handleToggleHidden(post.id)}
                                >
                                    숨김 풀기
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
