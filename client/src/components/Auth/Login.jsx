import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../features/auth/authActions.js";
import { ReactComponent as Eye } from "../assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "../assets/eye-slash-solid.svg";
import "./Register.css";
import { toast } from "react-toastify";


function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, user, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      toast.success("Logged in :)");
      navigate('/home')
    }
  }, [navigate, user])

  const onSubmit = (data) => {
    const { email, password } = data;
    
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      toast.error("Please enter valid email address.");
      return;
    }

    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-600">
      <div className="bg-white rounded-xl shadow-lg px-8 py-4 w-full max-w-sm min-h-[612px]">
        <div className="flex justify-end pb-2">
          <Link to="/"> <i className="fa-solid fa-xmark"></i></Link>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="BookSelf Logo" />
          <h1 className="font-mono text-3xl text-center mt-4 Typewriter">
            <span className="text-white">....</span>Welcome back<span className="text-white">....</span>
          </h1>
          <p className="mt-4 text-center text-base text- text-gray-600">Continue exploring the vast world of literature.</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-gray-200 placeholder:text-gray-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 sm:text-sm"
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              </div>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-gray-200 placeholder:text-gray-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 sm:text-sm"
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                  required
                />
              </div>
              <div className="text-sm flex justify-start">
                <a href="#" className="font-semibold text-amber-600 hover:text-amber-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Sign in</button>
            </div>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow h-0.5 border-t-0 bg-neutral-200" />
            <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
            <hr className="flex-grow h-0.5 border-t-0 bg-neutral-200" />
          </div>
          <p className="my-4 text-center text-sm/6 text-gray-500">
            Don't have an account?
            <Link to="/register" className="font-semibold text-amber-600 hover:text-amber-500"> Register.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
