import Resct, { useState } from "react";
import Register from "./Register";

const Home = ({ isRegisterVisible, setIsRegisterVisible }) => {
  const toggleContent = () => {
    setIsRegisterVisible(!isRegisterVisible);
  };
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <button onClick={toggleContent} className="MyButton">
          SIGNUP
        </button>
        {isRegisterVisible && (
          <Register setIsRegisterVisible={setIsRegisterVisible} />
        )}
      </main>
    </div>
  );
};

export default Home;
