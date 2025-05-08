import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authActions.js";
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

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    toggle()
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="Input"
                {...register("email")}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="Input"
                {...register("username")}
                required
              />
              <label htmlFor="password">Password</label>
              <div
                style={{
                  position: "relative",
                  left: "-4px",
                }}
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="Input"
                  {...register("password")}
                  required
                />
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
            <OrangeButton size={15} text="Register" type="submit" />
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
        </form>
      </div>
    </>
  );
}

export default Register;
