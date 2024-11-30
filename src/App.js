import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { getBooks } from './api/bookService'; 

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  return (
    <div className="App">
      <h1>Book Reviews</h1>
      <BookForm setBooks={setBooks} />
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
}

export default App;
