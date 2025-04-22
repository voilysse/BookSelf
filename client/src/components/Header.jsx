import { useState } from "react";
import "./Home.css";
function Header({ setIsRegisterVisible, setIsLoginVisible }) {
  console.log(typeof setIsLoginVisible);
  return (
    <>
      <div className="HeaderContainer">
        <img
          className="HeaderLogo"
          src="images/logo.png"
          alt="Bookself Logo"
        ></img>
        <div class="HeaderActions">
          <button
            className="TextLink HeaderButton"
            onClick={() => setIsLoginVisible(true)}
          >
            Log in
          </button>
          <button
            class="OrangeButton HeaderButton"
            onClick={() => setIsRegisterVisible(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
      ;
    </>
  );
}
export default Header;
