import { useState } from "react";
import axios from "axios";
import "./Register.css";
import OrangeButton from "./OrangeButton.jsx";
import { ReactComponent as Eye } from "./assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "./assets/eye-slash-solid.svg";

function Register({ setIsRegisterVisible, setIsLoginVisible }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggle = () => {
    setIsRegisterVisible(false);
    setIsLoginVisible(true);
  };
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:4000/api/register", {
        username,
        email,
        password,
      });
    } catch (error) {}
  };
  return (
    <>
      <div
        className="RegisterBackground"
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          backgroundColor: "rgba(0,0,0,0.8)",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="Container">
          <div className="CloseButton">
            <button onClick={() => setIsRegisterVisible(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="Logo">
            <img src="/images/logo.png" alt="Bookself Logo" />
          </div>
          <div
            className="Title"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div>
              <h1 className="Typewriter">Welcome to Bookself</h1>
            </div>
            <div
              className="ParagraphContainer"
              style={{
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "3px",
              }}
            >
              <p className="SmallGrey">
                Start exploring the vast world of literature
              </p>
            </div>
          </div>
          <div className="Form">
            <h2>Email</h2>
            <input
              className="Input"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            ></input>
            <h2>Username</h2>
            <input
              className="Input"
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            ></input>
            <h2>Password</h2>
            <div
              style={{
                position: "relative",
                left: "-4px",
              }}
            >
              <input
                className="Input"
                type={passwordVisible ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              ></input>
              <button
                className="eye"
                style={{
                  background: "transparent",
                  width: "18px",
                  position: "absolute",
                  right: "2px",
                  top: "10px",
                }}
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
              >
                {passwordVisible ? <Eye /> : <EyeSlash />}
              </button>
            </div>
          </div>
          <OrangeButton size={15} text="Register" func={registerUser} />
          <div className="textSeparator">
            <hr className="separator" />
            <p>or</p>
            <hr className="separator" />
          </div>
          <p className="SmallGrey">
            Already have an account?{" "}
            <button
              style={{
                background: "transparent",
                color: "rgba(0,0,0,1)",
              }}
              className="LinkText"
              onClick={toggle}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
