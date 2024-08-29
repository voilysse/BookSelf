import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };

const handleSubmit = async (e) =>{
  e.preventDefault();
  try {
    const res = await fetch( '/api/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData),
      //add errors etc
      
    });
    if (res.ok) {
        navigate('/login');
    }
  }
    catch (error) {

    }
  }

return (
  <div>
    <div className='min-h-screen mt-20'>
  <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    
    <div className='flex-1'>
      <p className='text-sm mt-5'>
        smt smt smt
      </p>
    </div>
    
    <div className='flex-1'>
      <h1>Welcome</h1>
      <p className='text-sm'>wow smt smt</p>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <p>Email</p>
          <TextInput
            type='email'
            placeholder='name@company.com'
            id='email'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Username</p>
          <TextInput
            type='username'
            placeholder='username'
            id='username'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Password</p>
          <TextInput
            type='password'
            placeholder='**********'
            id='password'
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Sign Up
        </button>
      </form>
      
      <div className='flex gap-2 text-sm mt-5'>
        <span>Already have an account?</span>
        <Link to="/login" className='text-blue-500'>Sign In</Link>
      </div>
    </div>
  </div>
</div>
  </div>
  )
}

export default Register

