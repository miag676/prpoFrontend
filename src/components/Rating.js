import React, { useState } from 'react';
import './Rating.css';

const Rating = ({ rating }) => {
  const [userRating, setUserRating] = useState(null);

  const handleRating = (rate) => {
    setUserRating(rate);
    alert(`You rated this book: ${rate} stars`);
  };

  return (
    <div className="rating">
      <p>Average Rating: {rating} / 5</p>
      <p>Your Rating: {userRating ? `${userRating} / 5` : 'Not rated yet'}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              color: star <= (userRating || 0) ? 'gold' : 'gray',
              fontSize: '1.5rem',
            }}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
