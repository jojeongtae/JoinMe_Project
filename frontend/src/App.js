import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "./mainSlice";
import {Route, Routes} from "react-router-dom";
import Login from "./Common/Login";
import MainLayout from "./User/Main";
import Users from "./User/Users";
import Logo from "./Common/Logo";
import Intro from "./Common/Intro";
import LikedBy from "./User/LikedBy";
import ILike from "./User/ILike";
import MyPage from "./User/MyPage";
import Admin_Main from "./Admin/Admin_Main";
import Admin_PostHiding from "./Admin/Admin_PostHiding";
import Admin_MatchingList from "./Admin/Admin_MatchingList";
import Admin_AddCourse from "./Admin/Admin_AddCourse";
import Course from "./User/Course";
import Admin_BlackList from "./Admin/Admin_BlackList";
import Register from "./Common/Register";
import MBTI from "./User/MBTI";
import Admin_Intro from "./Admin/Admin_Intro";
import UserInfoPost from "./User/UserInfoPost";
import Admin_UserList from "./Admin/Admin_UserList";



function App() {


    return (
        <Routes>
            <Route path={"/"} element={<Logo/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/register"} element={<Register/>}></Route>
            <Route path={"/userinfo-post"} element={<UserInfoPost/>}></Route>
            <Route path={"/main"} element={<MainLayout/>}>
                <Route index element={<Intro/>}></Route>
                <Route path={"users"} element={<Users/>}></Route>
                <Route path={"i-liked"} element={<ILike/>}></Route>
                <Route path={"liked-by"} element={<LikedBy/>}></Route>
                <Route path={"/main/mypage"} element={<MyPage/>}></Route>
                <Route path={"course"} element={<Course/>} />
                <Route path={"mbti"} element={<MBTI/>} />
            </Route>
            <Route path="/admin-main" element={<Admin_Main />}>
                <Route index element={<Admin_Intro/>} />
                <Route path={"user-list"} element={<Admin_UserList/>}/>
                <Route path={"post-hiding"} element={<Admin_PostHiding />} />
                <Route path={"matching-list"} element={<Admin_MatchingList/>} />
                <Route path={"add-cource"} element={<Admin_AddCourse/>} />
                <Route path={"blacklist"} element={<Admin_BlackList/>} />
            </Route>
        </Routes>
    );
}

export default App;