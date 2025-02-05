import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.jsx"

//COLOCAR ROTAS DOS PRODUTOS
function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home />}></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes