import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "./mainSlice";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import MainLayout from "./Main";
import Users from "./Users";
import Logo from "./Logo";
import Intro from "./Intro";
import LikedBy from "./LikedBy";
import ILike from "./ILike";
import MyPage from "./MyPage";


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

       </Routes>
    );
}

export default App;