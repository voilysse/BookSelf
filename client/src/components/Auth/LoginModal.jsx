import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { loginUser } from "../../features/auth/authActions.js";
import { ReactComponent as Eye } from "../assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "../assets/eye-slash-solid.svg";
import "./Register.css";
import { PrimaryButton } from "../Button/Button.jsx";

function Login({ isOpen, onClose, switchModal }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, user, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      onClose();
      navigate('/profile')
    }
  }, [navigate, onClose, user])

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  if (!isOpen) return null;
console.log(user);

  return ReactDOM.createPortal(
    <div
      className="background"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <div className="CloseButton">
            <button type="button" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="form-title">            
            <img className="Logo" src="/images/logo.png" alt="Bookself Logo" />
            <h1 className="Typewriter Twelve">Welcome back</h1>
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
          <div className="form-inputs">
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
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <Eye /> : <EyeSlash />}
              </button>
            </div>
          </div>
          <PrimaryButton text="Log In" type="submit" />
          <div className="textSeparator">
            <hr className="separator" />
          </div>
          <p className="SmallGrey">Forgot your password?</p>
          <p className="SmallGrey">
            Don't have an account?{" "}
            <button
              style={{
                background: "transparent",
                color: "rgba(0,0,0,1)",
              }}
              className="LinkText"
              onClick={switchModal}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Login;
