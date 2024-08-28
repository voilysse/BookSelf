import { Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
      <Link to="/login">
      Login
      </Link>
    </Navbar>
  )
}

export default Header