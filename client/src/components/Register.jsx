import { useState } from "react";
import axios from "axios";

function Register({ setIsRegisterVisible }) {
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
    console.log("I did something");
  };
  return (
    <>
      <div className="Register">
        <div className="Container">
          <div className="CloseButton">
            <button onClick={() => setIsRegisterVisible(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <img className="Logo" src="/images/logo.png" alt="Bookself Logo" />
          <div className="Title">
            <h1 className="Typewriter">Welcome to Bookself</h1>
            <div className="ParagraphContainer">
              <p className="SmallGrey" style={{ marginRight: "20px" }}>
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
            <input
              className="Input"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          <button className="OrangeButton" onClick={registerUser}>
            Register
          </button>
          <div className="textSeparator">
            <hr className="separator" />
            <p>or</p>
            <hr className="separator" />
          </div>
          <p className="SmallGrey">
            Already have an account? <a className="LinkText">Log in</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
