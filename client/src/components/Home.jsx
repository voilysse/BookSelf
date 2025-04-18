import Resct, { useState } from "react";
import Register from "./Register";
import Header from "./Header";
import Login from "./Login";
const Home = ({
  isLoginVisible,
  setIsLoginVisible,
  isRegisterVisible,
  setIsRegisterVisible,
}) => {
  return (
    <div className="App">
      <header className="App-header">
        <Header
          setIsRegisterVisible={setIsRegisterVisible}
          setIsLoginVisible={setIsLoginVisible}
        />
      </header>
      <main>
        {isRegisterVisible && (
          <Register setIsRegisterVisible={setIsRegisterVisible} />
        )}
        {isLoginVisible && <Login setIsLoginVisible={setIsLoginVisible} />}
      </main>
    </div>
  );
};

export default Home;
