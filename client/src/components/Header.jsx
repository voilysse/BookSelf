import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button/Button";
import { logout, setCredentials } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../features/auth/authApi";
import { useState, useRef, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetUserQuery("user", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div as="nav" className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="BookSelf Logo"
                  src="/images/logo.png"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">Home</Link>
                <Link to="/browse" className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">Browse</Link>
                <Link to="/forum" className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">Forum</Link>
                {user && <Link to="/shelves" className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">My Books</Link>}
                {user && <Link to={`/profile`} className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">Profile</Link>}
                {user && <Link to={`/community`} className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-2 hover:bg-gray-100">Community</Link>}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {user ? (
              <div ref={menuRef} className="relative ml-3">
                <div>
                  <button type="button" onClick={toggleMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="size-8 rounded-full" src={user.img || "/images/default-avatar.jpg"} alt="" />
                  </button>
                </div>

                {isMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden p-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</Link>
                    <PrimaryButton text="Sign out" onClick={handleLogout} />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative ml-3">
                <div className="flex space-x-2">
                  <Link to="/login">
                    <SecondaryButton text="Log In" />
                  </Link>
                  <Link to="/register">
                    <PrimaryButton text="Sign Up" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
