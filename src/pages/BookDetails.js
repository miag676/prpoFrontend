import React, { useState } from 'react';
import Rating from '../components/Rating';
import Review from '../components/Review';

const BookDetails = () => {
  const book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the Jazz Age in the United States.',
    rating: 4.5,
  };

  const [reviews, setReviews] = useState([
    { user: 'Alice', comment: 'Loved this book!' },
    { user: 'Bob', comment: 'A timeless classic.' },
  ]);

  const addReview = (comment) => {
    setReviews([...reviews, { user: 'You', comment }]);
  };

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>by {book.author}</p>
      <p>{book.description}</p>
      <Rating rating={book.rating} />
      <section>
        <h2>Reviews</h2>
        <div>
          {reviews.map((review, index) => (
            <p key={index}>
              <strong>{review.user}:</strong> {review.comment}
            </p>
          ))}
        </div>
        <Review onSubmit={addReview} />
      </section>
    </div>
  );
};

export default BookDetails;
