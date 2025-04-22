import Resct, { useState } from "react";
import Register from "./Register";
import Header from "./Header";
import Login from "./Login";
import { mockBooks } from "./mockBooks.jsx";
import BookCard from "./BookCard.jsx";
import Carousel from "./Carousel.jsx";
import BookSidebar from "./BookSidebar.jsx";
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
      <header className="App-header">
        <Header
          setIsRegisterVisible={setIsRegisterVisible}
          setIsLoginVisible={setIsLoginVisible}
        />
      </header>
      <main>
        {/*<BookSidebar book={mockBooks[6]} />*/}
        <Carousel
          cards={myCards}
          cardHeight={350}
          cardWidth={180}
          cardsToShow={5}
          gap={0}
        />
        {isRegisterVisible && (
          <Register setIsRegisterVisible={setIsRegisterVisible} />
        )}
        {isLoginVisible && <Login setIsLoginVisible={setIsLoginVisible} />}
      </main>
    </div>
  );
};

export default Home;
