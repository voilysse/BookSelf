import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div>
      {currentUser ? (
        <h1>Welcome, {currentUser.user.username}!</h1>
      ) : (
        <h1>Please log in to continue.</h1>
      )}
    </div>
  )
}

export default Home

