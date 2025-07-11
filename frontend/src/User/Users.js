import {useSelector, useDispatch} from "react-redux";
import {fetchHates, fetchLikes, giveLike, setUsers} from "../mainSlice";
import {useEffect} from "react";
import apiClient from "../api/apiClient";
import {useState} from "react";

export default function Users() {
    // 추가

    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [minHeight, setMinHeight] = useState("");
    const [selectedMbtiList, setSelectedMbtiList] = useState([]);
    const [interestKeyword, setInterestKeyword] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.main.currentUser);
    const hates = useSelector((state) => state.main.hates || []);
    const likes = useSelector((state) => state.main.likes || []);
    const allUsers = useSelector((state) => state.main.users || []);

    const blockedUsernames = hates.map((hate) => hate.hated);
    const likedUsernames = likes.map((like) => like.username); // like.username 기준

    const users = allUsers.filter((e) => {
        if (e.username === currentUser.username) return false;
        if (blockedUsernames.includes(e.username)) return false;
        if (likedUsernames.includes(e.username)) return false;
        if (e.sexuality === currentUser.sexuality) return false;

        if (minAge && e.age < parseInt(minAge)) return false;
        if (maxAge && e.age > parseInt(maxAge)) return false;

        if (selectedAddress && !e.address.includes(selectedAddress)) return false;

        if (minHeight && e.height < parseInt(minHeight)) return false;

        if (selectedMbtiList.length > 0 && !selectedMbtiList.includes(e.mbti)) return false;

        if (interestKeyword && !e.interest?.includes(interestKeyword)) return false;

        return true;
    });

    // 차단 목록 불러오기
    const fetchHateList = async () => {
        try {
            const res = await apiClient.get(`/hate-list/${currentUser.username}`);
            dispatch(fetchHates(res.data));
        } catch (err) {
            console.error("차단 목록 로딩 실패", err);
        }
    };

    // 좋아요한 유저 목록 불러오기
    const fetchLikeList = async () => {
        try {
            const res = await apiClient.get(`/like/liked-users?liker=${currentUser.username}`);
            dispatch(fetchLikes(res.data));
        } catch (err) {
            console.error("좋아요 목록 로딩 실패", err);
        }
    };

    useEffect(() => {
        if (currentUser?.username) {
            fetchHateList();
            fetchLikeList();
        }
    }, [currentUser]);

    // 유저 리스트 불러오기
    const fetchUserList = async () => {
        try {
            const response = await apiClient.get("/user/list");
            return response.data;
        } catch (error) {
            console.error("유저 리스트를 가져오는 중 오류 발생:", error);
            throw error;
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchUserList();
                dispatch(setUsers(userList));
            } catch (error) {
                console.error("유저 리스트 로딩 실패:", error);
            }
        };
        loadUsers();
    }, [dispatch]);

    // 좋아요 보내기
    const handleLike = async (likedUser) => {
        try {
            const payload = {liker: currentUser.username, liked: likedUser.username};
            await apiClient.post("/like", payload);
            alert("좋아요가 등록되었습니다.");
            fetchLikeList(); // 좋아요 누른 뒤 목록 재로딩
        } catch (error) {
            console.error("좋아요 요청 실패:", error);
            const errorMessage = error.response?.data || "좋아요 등록에 실패했습니다.";
            alert(errorMessage);
        }
    };

    // 신고하기
    const handleReport = async (hatedUser) => {
        try {
            const params = new URLSearchParams({
                hater: currentUser.username,
                hated: hatedUser.username,
            });
            await apiClient.post("/hate-user?" + params.toString());
            alert("차단되었습니다.");
            fetchHateList(); // 차단 후 재로딩
        } catch (error) {
            console.error("신고 요청 실패:", error);
            alert("신고 처리에 실패했습니다.");
        }
    };
    const resetFilters = () => {
        setMinAge("");
        setMaxAge("");
        setSelectedAddress("");
        setMinHeight("");
        setSelectedMbtiList([]);
        setInterestKeyword("");
    };
    return (
        <>
            <section id={"users"}>
                <div className="user-filter">
                    <div className="user-filter-row">
                        <div className="user-filter-block">
                            <label>나이</label>
                            <div style={{display: "flex", gap: "10px"}}>
                                <input type="number" placeholder="최소" value={minAge}
                                       onChange={(e) => setMinAge(e.target.value)}/>
                                <input type="number" placeholder="최대" value={maxAge}
                                       onChange={(e) => setMaxAge(e.target.value)}/>
                            </div>
                        </div>

                        <div className="user-filter-block">
                            <label>지역</label>
                            <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                                <option value="">전체</option>
                                <option value="서울">서울</option>
                                <option value="경기">경기</option>
                                <option value="부산">부산</option>
                                <option value="충청">충청</option>
                                <option value="강원">강원</option>
                                <option value="대전">대전</option>
                                <option value="대구">대구</option>
                            </select>
                        </div>

                        <div className="user-filter-block">
                            <label>키</label>
                            <input
                                type="number"
                                placeholder="최소 키"
                                value={minHeight}
                                onChange={(e) => setMinHeight(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="user-filter-row">
                        <div className="user-filter-block" style={{flex: 1}}>
                            <label>관심사</label>
                            <input
                                type="text"
                                placeholder="예: 영화"
                                value={interestKeyword}
                                onChange={(e) => setInterestKeyword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="user-filter-block">
                        <label>선호 MBTI</label>
                        <div className="mbti-options">
                            {[
                                "INTJ", "INTP", "ENTJ", "ENTP",
                                "INFJ", "INFP", "ENFJ", "ENFP",
                                "ISTJ", "ISFJ", "ESTJ", "ESFJ",
                                "ISTP", "ISFP", "ESTP", "ESFP",
                            ].map((type) => (
                                <label
                                    key={type}
                                    className={`mbti-tag-label ${selectedMbtiList.includes(type) ? "selected" : ""}`}
                                >
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={selectedMbtiList.includes(type)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedMbtiList([...selectedMbtiList, type]);
                                            } else {
                                                setSelectedMbtiList(selectedMbtiList.filter((mbti) => mbti !== type));
                                            }
                                        }}
                                        hidden
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button onClick={resetFilters} className="reset-button">초기화</button>
                </div>


                <div className="users-container inner">
                    {users.map((e) => (
                        <div key={e.username} className="user-card">
                            <img src={e.profileimg} alt="img" className="user-image"/>
                            <div className={"flex-box"}>
                                <div className="user-info">
                                    <div className="user-nickname">{e.usernickname}</div>

                                    <div className="user-info-row">
                                        <span className="user-info-label">키 / 몸무게</span>
                                        <span className="user-info-value">{e.height}cm / {e.weight}kg</span>
                                    </div>

                                    <div className="user-info-row">
                                        <span className="user-info-label">MBTI</span>
                                        <span className="user-info-value">{e.mbti}</span>
                                    </div>

                                    <div className="user-info-row">
                                        <span className="user-info-label">관심사</span>
                                        <span className="user-info-value">{e.interest}</span>
                                    </div>

                                    <div className="user-info-row">
                                        <span className="user-info-label">지역</span>
                                        <span className="user-info-value">{e.address}</span>
                                    </div>

                                    <p className="user-intro">{e.introduction}</p>
                                </div>
                                <div className="user-buttons">
                                    <button className="block-button" onClick={() => handleReport(e)}></button>
                                    <button className="like-button" onClick={() => handleLike(e)}></button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
