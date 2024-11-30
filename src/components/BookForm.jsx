import React, { useState } from 'react';
import { addBook, updateBook } from '../api/bookService';

const BookForm = ({ setBooks, book = {}, setIsEditing }) => {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [rating, setRating] = useState(book.rating || 1);
  const [review, setReview] = useState(book.review || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { 
      title, 
      author, 
      rating, 
      review, 
      dateAdded: new Date().toISOString() 
    };

    if (book._id) {
      updateBook(book._id, newBook).then(() => {
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b._id === book._id ? { ...b, ...newBook } : b))
        );
        setIsEditing && setIsEditing(false);
      });
    } else {
      addBook(newBook).then((savedBook) => {
        setBooks((prevBooks) => [...prevBooks, savedBook]);
      });
    }


    setTitle('');
    setAuthor('');
    setRating(1);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
        required
      />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review"
        required
      />
      <button type="submit">{book._id ? 'Update Review' : 'Add Review'}</button>
    </form>
  );
};

export default BookForm;
