import { Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    dispatch(logout());
    navigate('/');
  };
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap'>
        ayo
      </Link>
      <form>
        <TextInput 
          type='text'
          placeholder='Search'
        />
      </form>
      {user ? (
        <div>
        <Link to="/profile">
          {user.user.username}
        </Link>
        <Link to="/settings">
          settings
        </Link>
          <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleChange}>
          Log Out
          </button>
        </div>
      ) : (
        <Link to="/login">
        Login
        </Link>
      )}
      
    </Navbar>
  )
}

export default Header