import {lazy} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../view/home";
import Detail from "../view/About/detail";
import Create from "../view/About/create";
import Update from "../view/About/update";

/**
 * 路由页面组件进行懒加载
 */
const About = lazy(() => import("../view/About"));

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="home" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}>
                <Route index element={<Create/>}/> {/* index 指定默认路由 */}
                <Route path=":id" element={<Detail/>}/> {/* 路由通配符 */}
                <Route path="update" element={<Update/>}/>
            </Route>
        </Routes>
    )
}