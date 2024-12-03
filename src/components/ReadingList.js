import React from 'react';

const ReadingList = ({ books }) => (
  <div className="reading-list">
    {books.map((book) => (
      <div key={book.id} className="reading-list-item">
        <p>
          <strong>{book.title}</strong> by {book.author}
        </p>
      </div>
    ))}
  </div>
);

export default ReadingList;
