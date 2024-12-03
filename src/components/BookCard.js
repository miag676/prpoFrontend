import React from 'react';

const BookCard = ({ book, onAddToList }) => (
  <div className="book-card">
    <h3>{book.title}</h3>
    <p>{book.author}</p>
    <p>Rating: {book.rating}</p>
    <button onClick={() => onAddToList(book.id)}>Add to List</button>
  </div>
);

export default BookCard;
