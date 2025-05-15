import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../features/auth/authActions.js";
import { ReactComponent as Eye } from "../assets/eye-solid.svg";
import { ReactComponent as EyeSlash } from "../assets/eye-slash-solid.svg";
import "./Register.css";
import { PrimaryButton } from "../Button/Button.jsx";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, user, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [navigate, user])

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (

    <div className="h-full bg-gray-500">
      <div className="bg-white flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src="/images/logo.png" alt="BookSelf Logo" />
          <h1 className="Typewriter Twelve">Welcome back</h1>

          <p className="mt-10 text-center text-xl/9 font-semibold tracking-tight text-gray-900">Continue exploring the vast world of literature.</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
              <div className="mt-2">
                <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
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
              <div className="mt-2">
                <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                  required
                />        </div>
              <div className="text-sm flex justify-end">
                <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?
            <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-500"> Register.</Link>
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;
