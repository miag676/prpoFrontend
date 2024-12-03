import React, { useState } from 'react';
import './Review.css';

const Review = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    } else {
      alert('Please enter a valid comment.');
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
        Submit Review
      </button>
    </form>
  );
};

export default Review;
