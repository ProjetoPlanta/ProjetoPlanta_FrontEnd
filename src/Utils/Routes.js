import React from "react";
import Admin from "../Pages/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Login  from "../Pages/login";
import Home from "../Pages/home";

 const AppRoutes = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </Router>
    )
 }

 export default AppRoutes

