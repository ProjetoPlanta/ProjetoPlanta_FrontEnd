import React from "react";
import Admin from "../Pages/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Login  from "../Pages/login";
import Home from "../Pages/home";
import VerPlanta from "../Pages/verPlanta";
import Plantas from "../Pages/plantas"
import PedidosSearch from "../Pages/pedidos-user"
import { Provider } from 'react-redux';
import { store } from '../Store';
import ProtectedRoute from '../Components/protectedRoute';

 const AppRoutes = () =>{
    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/plantas" element={<Plantas/>}></Route>
                <Route path="/pedidos" element={<PedidosSearch/>}></Route>
                <Route path="/ver-planta/:id" element={<VerPlanta/>}></Route>
            </Routes>
        </Router>
        </Provider>
    )
 }

 export default AppRoutes

