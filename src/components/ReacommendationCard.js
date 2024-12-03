import React from 'react';

const RecommendationCard = ({ book }) => (
  <div className="recommendation-card">
    <h3>{book.title}</h3>
    <p>by {book.author}</p>
  </div>
);

export default RecommendationCard;
