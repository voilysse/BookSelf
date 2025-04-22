import { useState } from "react";
import axios from "axios";

function Login({ setIsLoginVisible }) {
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
      <div className="Register">
        <div className="Container">
          <div className="CloseButton">
            <button onClick={() => setIsLoginVisible(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <img className="Logo" src="/images/logo.png" alt="Bookself Logo" />
          <div className="Title">
            <h1 className="Typewriter Twelve">Welcome back</h1>
            <div className="ParagraphContainer">
              <p className="SmallGrey" style={{ marginRight: "20px" }}>
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
            <input
              className="Input"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
            </div>
          <button className="OrangeButton" onClick={loginUser}>Log in</button>
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
