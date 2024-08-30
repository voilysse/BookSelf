import { Navbar, Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar className=" shadow dark:bg-gray-800">
      <div className="container mx-auto md:flex">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            BookSelf
          </Link>        
        </div>

        <div className="w-full px-6 py-4 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/users">Community</Link>
            </li>
          </ul>

          <div className="relative mt-4 md:mt-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 input input-bordered w-24 md:w-auto"
            />
          </div>

          <div></div>

          <div className="relative mt-4 md:mt-0 bg-white">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>

                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>

                  <li>
                    <button onClick={handleLogout} className="text-error outline-error hover:bg-error hover:text-gray-800">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="navbar-end">
                <Link to="/login" className="btn pr-6 pl-6" >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
