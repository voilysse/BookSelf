import { useState } from "react";
import "./Home.css";
import "./Header.css";

import OrangeButton from "./OrangeButton";
import SearchBar from "./SearchBar";
function Header({ setIsRegisterVisible, setIsLoginVisible }) {
  console.log(typeof setIsLoginVisible);
  return (
    <>
      <header
        className="HeaderContainer"
        style={{
          width: "100%",
          height: "100px",
          alignItems: "center",
        }}
      >
        <img
          className="HeaderLogo"
          src="images/logo.png"
          alt="Bookself Logo"
        ></img>
        <SearchBar width="200px" fontSize="16" />
        <div class="HeaderActions">
          <button
            className="LogIn"
            style={{
              background: "transparent",
              margin: "3px",
              fontSize: "16px",
            }}
            onClick={() => setIsLoginVisible(true)}
          >
            Log in
          </button>
          <OrangeButton
            size={14}
            text="Sign Up"
            func={() => setIsRegisterVisible(true)}
          />{" "}
        </div>
      </header>
      ;
    </>
  );
}
export default Header;
