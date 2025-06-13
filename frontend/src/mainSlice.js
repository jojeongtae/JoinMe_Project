import {configureStore, createSlice} from "@reduxjs/toolkit";
import {mbtiCompatibility} from "./User/mbtiCompatibility";

const mainSlice = createSlice({
    name: "main",
    initialState: {
        currentUser: null,
        token: null,
        matchingInfo: [],
        courses: [],
        hates: [],
        likes:[],
        users:[],
        userMessages:[]
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
        loginUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.currentUser = null;
            state.token = null;
        },
        setUsers:(state, action)=>{
            state.users = action.payload;
        },
        giveLike: (state, action) => {
            const giver = state.currentUser;
            const receiver = state.users.find(e => e.id === action.payload);

            // null/undefined 체크
            if (!giver || !receiver) return;

            // 배열 초기화
            giver.userLiked = Array.isArray(giver.userLiked) ? giver.userLiked : [];
            receiver.userLikedReceived = Array.isArray(receiver.userLikedReceived) ? receiver.userLikedReceived : [];
            giver.userMatched = Array.isArray(giver.userMatched) ? giver.userMatched : [];
            receiver.userMatched = Array.isArray(receiver.userMatched) ? receiver.userMatched : [];

            // null 요소 필터링
            giver.userLiked = giver.userLiked.filter(e => e && e.id);
            receiver.userLikedReceived = receiver.userLikedReceived.filter(e => e && e.id);
            giver.userMatched = giver.userMatched.filter(e => e && e.id);
            receiver.userMatched = receiver.userMatched.filter(e => e && e.id);

            // 이미 좋아요 했는지 체크 (안전하게)
            const alreadyLikedReceived = receiver.userLikedReceived.find(e => e && e.id === giver.id);
            const alreadyLikedGiven = giver.userLiked.find(e => e && e.id === receiver.id);

            if (!alreadyLikedReceived) {
                receiver.userLikedReceived.push({id: giver.id});
            }
            if (!alreadyLikedGiven) {
                giver.userLiked.push({id: receiver.id});
            }

            // 서로 좋아요가 있으면 userMatched 배열에 추가 (중복 방지)
            const giverMatched = giver.userMatched.find(e => e && e.id === receiver.id);
            const receiverMatched = receiver.userMatched.find(e => e && e.id === giver.id);

            const giverLikesReceiver = giver.userLiked.find(e => e && e.id === receiver.id);
            const receiverLikesGiver = receiver.userLiked.find(e => e && e.id === giver.id);

            if (giverLikesReceiver && receiverLikesGiver) {
                if (!giverMatched) {
                    giver.userMatched.push({id: receiver.id});
                }
                if (!receiverMatched) {
                    receiver.userMatched.push({id: giver.id});
                }
            }
        },
        unlike: (state, action) => {
            const giver = state.currentUser;
            const receiver = state.users.find(e => e.id === action.payload);

            if (!giver || !receiver) return;

            giver.userLiked = giver.userLiked.filter(e => e.id !== receiver.id);
            receiver.userLikedReceived = receiver.userLikedReceived.filter(e => e.id !== giver.id);
        },
        togglePostHidden: (state, action) => {
            const targetUser = state.users.find(user => user.username === action.payload);
            if (targetUser) {
                targetUser.hidden = !targetUser.hidden;
            }
        },
        matchingInfo: (state) => {
            const matchedPairs = new Set();
            const matches = [];

            const getMbtiCompatibility = (mbti1, mbti2) => {
                const key1 = `${mbti1.toUpperCase()}-${mbti2.toUpperCase()}`;
                const key2 = `${mbti2.toUpperCase()}-${mbti1.toUpperCase()}`;
                return mbtiCompatibility[key1] || mbtiCompatibility[key2] || "🤝 서로의 개성이 잘 맞는 좋은 조합입니다!";
            };

            state.users.forEach(user => {
                user.userMatched?.forEach(match => {
                    const pairKey = [user.id, match.id].sort().join('-');
                    if (!matchedPairs.has(pairKey)) {
                        matchedPairs.add(pairKey);

                        const otherUser = state.users.find(u => u.id === match.id);
                        if (otherUser) {
                            const mbtiResult = getMbtiCompatibility(user.mbti, otherUser.mbti);
                            matches.push({
                                num: matches.length + 1,
                                userA: { id: user.id, name: user.name, mbti: user.mbti.toUpperCase() },
                                userB: { id: otherUser.id, name: otherUser.name, mbti: otherUser.mbti.toUpperCase() },
                                matchTime: '2025-06-10', // 추후 DB 연결 시 실제 시간으로 교체 가능
                                mbtiResult
                            });
                        }
                    }
                });
            });

            state.matchingInfo = matches;
        },
        addCourse: (state, action) => {
            const newCourse = {
                num: state.courses.length + 1,
                coursename: action.payload.coursename,
                address: action.payload.address,
                body: action.payload.body,
            };

            state.courses.push(newCourse);
        },
        removeCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.num !== action.payload);
        },
        addHate: (state, action) => {
            const {hater, hated} = action.payload;

            const alreadyExists = state.hates.find(h =>
                h.hater === hater && hated === hated
            );

            if (alreadyExists) {
                return;
            }

            const newHate = {
                num: state.hates.length + 1,
                hater,
                hated,
                hateTime: new Date().toISOString()
            };
            state.hates.push(newHate);
        },
        removeHate: (state, action) => {
            const {hater, hated} = action.payload;
            state.hates = state.hates.filter(h =>
                !(h.hater === hater && h.hated === hated)
            );
        },
        fetchHates: (state, action) => {
            state.hates = action.payload;
        },
        fetchLikes:(state,action)=>{
            state.likes = action.payload;
        },
        fetchUserMessages:(state, action)=>{
            state.userMessages = action.payload;
        },
        addUserMessage:(state, action)=>{
          state.userMessages.push(action.payload)
        }
    }
})
export const {

    addUserMessage,fetchUserMessages,logoutUser,fetchLikes,setUsers,giveLike, loginUser, unlike, togglePostHidden,
    matchingInfo, addCourse, setToken, clearToken,
    addHate, removeHate, fetchHates, removeCourse

} = mainSlice.actions;
const store = configureStore(
    {
        reducer: {
            main: mainSlice.reducer
        }
    }
)
export default store