import React, { useState } from "react";

const BookCard = ({ book, onAddToList, onAddRating, averageRating, userRating, lists }) => {
  const [rating, setRating] = useState(userRating || ""); // Initial rating input state
  const [selectedList, setSelectedList] = useState("");

  const handleRatingSubmit = () => {
    if (rating) {
      onAddRating(book.id, rating); // Submit the rating
    }
  };

  const handleAddToList = () => {
    if (selectedList) {
      onAddToList(selectedList, book.id); // Pass selected list ID and book ID
    } else {
      alert("Please select a list first!");
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Average Rating: {averageRating || "No ratings yet"}</p>
      <p>Your Rating: {userRating || "Not rated"}</p>
      <input
        type="number"
        placeholder="Rate 1-5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <button onClick={handleRatingSubmit}>Submit Rating</button>
      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option value="">Select a list</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToList}>Add to List</button>
    </div>
  );
};

export default BookCard;
