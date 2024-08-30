import React from 'react'
import Books from '../components/Books';

function Dashboard() {
  return (
    <div>
      <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
      </div>
      {tab === 'books' && <Books />}
    </div>
    </div>
  )
}

export default Dashboard
