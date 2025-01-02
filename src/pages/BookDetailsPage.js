import React, { useEffect, useState } from "react";
import { getBook } from "../api";

const BookDetailsPage = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(bookId);
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading book details...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Release Date: {book.releaseDate}</p>
    </div>
  );
};

export default BookDetailsPage;
