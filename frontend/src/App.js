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


function App() {


    return (
       <Routes>
           <Route path={"/"} element={<Logo/>}></Route>
           <Route path={"/login"} element={<Login/>}></Route>
           <Route path={"/main"} element={<MainLayout/>}>
               <Route index element={<Intro/>}></Route>
               <Route path={"users"} element={<Users/>}></Route>
               <Route path={"i-liked"} element={<ILike/>}></Route>
               <Route path={"liked-by"} element={<LikedBy/>}></Route>
           <Route path={"/main/mypage"} element={<MyPage/>}></Route>
           </Route>
           <Route path="/admin-main" element={<Admin_Main />}>
               <Route index element={<Intro />} />
               <Route path="post-hiding" element={<Admin_PostHiding />} />
           </Route>
       </Routes>
    );
}

export default App;