import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'

function Settings() {
  const user = useSelector((state) => state.auth.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async (e) =>{
    e.preventDefault();
    try {
      const res = await fetch( `/api/user/delete/${user.user.userId}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      
    if (res.ok) {
      dispatch(deleteUser(data));
      navigate('/');
  }
    }
      catch (error) {

      }
    }

  return (
    <div>
    <button onClick={deleteAccount} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
       Delete account
    </button>    
    </div>
  )
}

export default Settings
