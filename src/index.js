import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import CreateAccount from "./CreateAccount";

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
    <Routes>
     <Route  path='/' element={<Login/>} />
     <Route path='/CreateAccount' element={<CreateAccount/>} />
   </Routes>
   </BrowserRouter>,
   rootElement
 );