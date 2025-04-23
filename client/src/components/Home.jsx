import Resct, { useState } from "react";
import Register from "./Register";
import Header from "./Header";
import Login from "./Login";
import { mockBooks } from "./mockBooks.jsx";
import BookCard from "./BookCard.jsx";
import Carousel from "./Carousel.jsx";
import BookSidebar from "./BookSidebar.jsx";
import Main from "./Main.jsx";
const Home = ({
  isLoginVisible,
  setIsLoginVisible,
  isRegisterVisible,
  setIsRegisterVisible,
}) => {
  const myCards = mockBooks.map((b, index) => (
    <BookCard key={index} book={b} />
  ));
  return (
    <div className="App">
      <Header
        setIsRegisterVisible={setIsRegisterVisible}
        setIsLoginVisible={setIsLoginVisible}
      />
      <Main
        setIsLoginVisible={setIsLoginVisible}
        setIsRegisterVisible={setIsRegisterVisible}
        isLoginVisible={isLoginVisible}
        isRegisterVisible={isRegisterVisible}
      />
    </div>
  );
};

export default Home;
