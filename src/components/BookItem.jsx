import React, { useState } from 'react';
import { deleteBook, updateBook } from '../api/bookService'; 
import BookForm from './BookForm';

const BookItem = ({ book, setBooks }) => {
  const [isEditing, setIsEditing] = useState(false);  


  const handleDelete = () => {
    deleteBook(book._id).then(() => {
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
    });
  };

 
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  
  const formattedDate = new Date(book.dateAdded).toLocaleDateString();

  return (
    <div className="book-item">
      {isEditing ? (
      
        <BookForm 
          book={book} 
          setBooks={setBooks} 
          setIsEditing={setIsEditing} 
        />
      ) : (
        <>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Rating:</strong> {book.rating} </p>
          <p><strong>Review:</strong> {book.review}</p>
          <p><strong>Date Added:</strong> {formattedDate}</p>

       
          <button className="edit" onClick={handleEdit}>Edit</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default BookItem;
