import { useState } from "react";
import axios from "axios";
import { ReactComponent as Eye } from "./assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "./assets/eye-slash-solid.svg";
import OrangeButton from "./OrangeButton";
function Login({ setIsLoginVisible }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
    } catch (error) {}
    console.log("I did something");
  };
  return (
    <>
      <div
        className="LoginBackground"
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
            <button onClick={() => setIsLoginVisible(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <img className="Logo" src="/images/logo.png" alt="Bookself Logo" />
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
              <h1 className="Typewriter Twelve">Welcome back</h1>
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
                Continue exploring the vast world of literature
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
          <OrangeButton size={15} text="Log in" func={loginUser} />
          <div className="textSeparator">
            <hr className="separator" />
          </div>
          <p className="SmallGrey">Forgot your password?</p>
        </div>
      </div>
    </>
  );
}

export default Login;
