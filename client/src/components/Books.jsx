import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Books() {
  /*
 // const user = useSelector((state) => state.auth.user);
  const {books, setBooks} = useState({});
  console.log(books);

  useEffect(() => {
    const fetchBooks = async () => {
      try{
        const res = await fetch(`api/books/all`);
        const data = await res.json();
        if (res.ok) {
          setBooks(data.books);
        }

      }
      catch(error){

      }
    }
  }, [user.user.userId])*/
  return (
    <div>
      A BOOK
    </div>
  )
}

export default Books
