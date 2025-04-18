import Home from './components/Home';
import Login from './components/Login.jsx';
import Register from './components/Register';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from 'react';
function App() {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element ={<Home isRegisterVisible={isRegisterVisible} setIsRegisterVisible={setIsRegisterVisible}/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
