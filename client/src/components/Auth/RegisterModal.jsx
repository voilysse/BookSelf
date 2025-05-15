import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { registerUser } from "../../features/auth/authActions.js";
import "./Register.css";
import { ReactComponent as Eye } from "../assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "../assets/eye-slash-solid.svg";
import { PrimaryButton } from "../Button/Button.jsx";


function Register({ isOpen, onClose, switchModal }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      onClose();
      navigate('/profile')
    }
}, [user, onClose, navigate, switchModal]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  if (!isOpen) return null;

  return ReactDOM.createPortal(
      <div
        className="background"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="CloseButton">
              <button type="button" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="form-title">
              <div className="Logo">
              <img src="/images/logo.png" alt="Bookself Logo" />
            </div>
                <h1 className="Typewriter">Welcome to Bookself</h1>
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
            <div className="form-inputs">
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
            <PrimaryButton text="Register" type="submit" />
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
                onClick={switchModal}
              >
                Log in
              </button>
            </p>
        </form>
      </div>,
    document.getElementById("modal-root")
  );
}

export default Register;
