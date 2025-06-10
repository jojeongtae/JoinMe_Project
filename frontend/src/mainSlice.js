import {configureStore, createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name:"slice",
    initialState:{
        currentUser:null,
        matchingInfo: [],
        users: [
           {
                id: "aaa",
                pw: 111,
                name: "김일번",
                imgPath: "/man1.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [{id:"ddd"},{id:"fff"},{id:"ggg"}],
                userLiked: [{id:"eee"}],
                userMatched:[]
            },
           {
                id: "bbb",
                pw: 111,
                name: "김이번",
                imgPath: "/man2.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: []
            },
           {
                id: "ccc",
                pw: 111,
                name: "김삼번",
                imgPath: "/man3.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: []
            },
            {
                id: "ddd",
                pw: 111,
                name: "김사번",
                imgPath: "/women1.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: [{id:"aaa"}]
            },
            {
                id: "eee",
                pw: 111,
                name: "김오번",
                imgPath: "/women2.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [{id:"aaa"}],
                userLiked: []
            },
            {
                id: "fff",
                pw: 111,
                name: "김육번",
                imgPath: "/women3.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: [{id:"aaa"}]
            },
            {
                id: "ggg",
                pw: 111,
                name: "김칠번",
                imgPath: "/man4.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: []
            },
            {
                id: "hhh",
                pw: 111,
                name: "김팔번",
                imgPath: "/women4.png",
                height:"180",
                weight:"80",
                interest:"등산",
                addr:"서울",
                intro:"안녕하세요 김일번입니다 잘부탁드립니다",
                mbti:"estj",
                userLikedReceived: [],
                userLiked: [{id:"aaa"}]
            },
        ],

    },
    reducers:{
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
                receiver.userLikedReceived.push({ id: giver.id });
            }
            if (!alreadyLikedGiven) {
                giver.userLiked.push({ id: receiver.id });
            }

            // 서로 좋아요가 있으면 userMatched 배열에 추가 (중복 방지)
            const giverMatched = giver.userMatched.find(e => e && e.id === receiver.id);
            const receiverMatched = receiver.userMatched.find(e => e && e.id === giver.id);

            const giverLikesReceiver = giver.userLiked.find(e => e && e.id === receiver.id);
            const receiverLikesGiver = receiver.userLiked.find(e => e && e.id === giver.id);

            if (giverLikesReceiver && receiverLikesGiver) {
                if (!giverMatched) {
                    giver.userMatched.push({ id: receiver.id });
                }
                if (!receiverMatched) {
                    receiver.userMatched.push({ id: giver.id });
                }
            }
        },
        loginUser: (state, action) => {
            state.currentUser = action.payload;
        },
        unlike: (state, action) => {
            const giver = state.currentUser;
            const receiver = state.users.find(e => e.id === action.payload);

            if (!giver || !receiver) return;

            giver.userLiked = giver.userLiked.filter(e => e.id !== receiver.id);
            receiver.userLikedReceived = receiver.userLikedReceived.filter(e => e.id !== giver.id);
        },
        togglePostHidden: (state, action) => {
            const targetUser = state.users.find(user => user.id === action.payload);
            if (targetUser) {
                targetUser.hidden = !targetUser.hidden;
            }
        },
        matchingInfo: (state) => {
            const matchedPairs = new Set();
            const matches = [];

            state.users.forEach(user => {
                user.userMatched?.forEach(match => {
                    const pairKey = [user.id, match.id].sort().join('-');
                    if (!matchedPairs.has(pairKey)) {
                        matchedPairs.add(pairKey);

                        const male = user;
                        const female = state.users.find(u => u.id === match.id);

                        if (female) {
                            matches.push({
                                num: matches.length + 1,
                                male: {id: male.id, name: male.name},
                                female: {id: female.id, name: female.name},
                                matchTime: '2025-06-10'
                            });
                        }
                    }
                });
            });

            state.matchingInfo = matches;
        },

    }
})
export const {unlike,giveLike,loginUser, togglePostHidden, matchingInfo} = mainSlice.actions;
const store = configureStore(
    {
        reducer:{
            main:mainSlice.reducer
        }
    }
)
export default store