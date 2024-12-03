import React from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const Home = () => {
  const featuredBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 4.5 },
    { id: 2, title: '1984', author: 'George Orwell', rating: 4.7 },
  ];

  return (
    <div className="home">
      <h1>Welcome to the LitLink</h1>
      <SearchBar onSearch={(query) => console.log(`Searching for: ${query}`)} />
      <section>
        <h2>Featured Books</h2>
        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToList={(id) => console.log(`Add to list: ${id}`)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
