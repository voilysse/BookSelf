import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Books from '../components/Books';
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div>
      {currentUser ? (
        <h1>Welcome, {currentUser.user.username}!</h1>
      ) : (
        <h1>Please log in to continue.</h1>
      )}

      <Books />
      </div>
  )
}

export default Home

