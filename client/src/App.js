import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Header from "./components/Header";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react';


function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/*" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Register/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
