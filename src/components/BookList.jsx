import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';

const BookList = ({ books, setBooks }) => {
  const [ratingFilter, setRatingFilter] = useState(1);  
  const [sortOrder, setSortOrder] = useState('asc');     


  const filteredBooks = books.filter((book) => book.rating >= ratingFilter);

  
  const sortedBooks = filteredBooks.sort((a, b) => {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });


  const handleRatingChange = (e) => {
    setRatingFilter(Number(e.target.value));
  };

  
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="book-list">
      <div className="filters">
     
        <label>
          Filter by Rating:
          <select value={ratingFilter} onChange={handleRatingChange}>
            <option value={1}>1 star and up</option>
            <option value={2}>2 stars and up</option>
            <option value={3}>3 stars and up</option>
            <option value={4}>4 stars and up</option>
            <option value={5}>5 stars only</option>
          </select>
        </label>

 
        <label>
          Sort by Date Added:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </label>
      </div>

    
      {sortedBooks.map((book) => (
        <BookItem key={book._id} book={book} setBooks={setBooks} />
      ))}
    </div>
  );
};

export default BookList;
