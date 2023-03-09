import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from './pages/Home';

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
    <Routes>
     <Route  path='/' element={<Login/>} />
     <Route path='/CreateAccount' element={<CreateAccount/>} />
     <Route path='/Home' element={<Home/>} />
   </Routes>
   </BrowserRouter>,
   rootElement
 );