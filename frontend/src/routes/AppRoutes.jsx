// src/routes/AppRoutes.jsx (ou seu arquivo de rotas)

import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro"; 

const AppRoutes = () =>{
    return(
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Cadastro />} path="/cadastro" /> {/* 2. Adicione a nova rota */}
        </Routes>
    );
}

export default AppRoutes;