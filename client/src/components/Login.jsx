import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authActions.js";
import OrangeButton from "./OrangeButton.jsx";
import { ReactComponent as Eye } from "./assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "./assets/eye-slash-solid.svg";

function Login({ setIsLoginVisible }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      console.log("omg it works/");
      navigate("/profile");
    }
  }, [navigate, user]);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(loginUser(data));
    console.log(user)
    navigate("/profile");
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="Input"
                {...register("email")}
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
            <OrangeButton size={15} text="Log In" type="submit" />
            <div className="textSeparator">
              <hr className="separator" />
            </div>
            <p className="SmallGrey">Forgot your password?</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
