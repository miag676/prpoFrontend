import React from 'react';

const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search books..."
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchBar;
