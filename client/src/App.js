import Home from './components/Home';
import Login from './components/Login.jsx';
import Register from './components/Register';
import Profile from './components/Profile';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from 'react';
function App() {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element ={<Home isLoginVisible={isLoginVisible} setIsLoginVisible={setIsLoginVisible}
         isRegisterVisible={isRegisterVisible} setIsRegisterVisible={setIsRegisterVisible}/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path='/profile' element={<Profile/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
