import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home  from './pages/Home';
import About  from './pages/About';
import Contact  from './pages/Contact';

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
    <Routes>
     <Route  path='/' element={<Login/>} />
     <Route path='/CreateAccount' element={<CreateAccount/>} />
     <Route path='/Home' element={<Home/>} />
     <Route path='/About' element={<About/>} />
     <Route path='/Contact' element={<Contact/>} />
   </Routes>
   </BrowserRouter>,
   rootElement
 );