import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { getAllBooks, addBook, getAllRatings, addRating,   createList,
  getAllLists,
  addBookToList,
  removeBookFromList,
  deleteList, } from "../api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [query, setQuery] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", releaseDate: "" });
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState({ name: "", bookIds: [] });

  // Fetch books and ratings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await getAllBooks();
        const fetchedRatings = await getAllRatings(); // Fetch all ratings
        const fetchedLists = await getAllLists();
        setBooks(fetchedBooks);
        setRatings(fetchedRatings);
        setLists(fetchedLists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const addedBook = await addBook(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setNewBook({ title: "", author: "", releaseDate: "" });
      alert("Book added successfully!");
    } catch (error) {
      alert("Failed to add book. Check console for details.");
    }
  };

  // Add a rating
  const handleAddRating = async (bookId, ratingValue) => {
    const userId = 1; // Replace with actual user ID from context or auth
    try {
      const newRating = await addRating({ userId, bookId, rating: ratingValue });
      setRatings((prevRatings) => [...prevRatings, newRating]);
      alert("Rating submitted successfully!");
    } catch (error) {
      alert("Failed to submit rating. Check console for details.");
    }
  };

  // Calculate average and user-specific ratings
  const calculateRatings = (bookId) => {
    const bookRatings = ratings.filter((rating) => rating.bookId === bookId);
    const averageRating =
      bookRatings.length > 0
        ? (bookRatings.reduce((sum, r) => sum + r.rating, 0) / bookRatings.length).toFixed(1)
        : null;

    const userRating = bookRatings.find((rating) => rating.userId === 1)?.rating || null; // Replace 1 with actual user ID
    return { averageRating, userRating };
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreateList = async (e) => {
    e.preventDefault();
    try {
      const createdList = await createList({
        userId: 1, // Replace with actual user ID from auth context
        name: newList.name,
        bookIds: [],
      });
      setLists((prevLists) => [...prevLists, createdList]);
      setNewList({ name: "", bookIds: [] });
      alert("List created successfully!");
    } catch (error) {
      alert("Failed to create list. Check console for details.");
    }
  };

  const handleAddBookToList = async (listId, bookId) => {
    try {
      await addBookToList(listId, bookId);
      alert(`Book added to list successfully!`);
    } catch (error) {
      alert("Failed to add book to list. Check console for details.");
    }
  };

    // Remove a book from a list
    const handleRemoveBookFromList = async (listId, bookId) => {
      try {
        await removeBookFromList(listId, bookId);
        alert(`Book removed from list successfully!`);
      } catch (error) {
        alert("Failed to remove book from list. Check console for details.");
      }
    };
  
    // Delete a list
    const handleDeleteList = async (listId) => {
      try {
        await deleteList(listId);
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
        alert("List deleted successfully!");
      } catch (error) {
        alert("Failed to delete list. Check console for details.");
      }
    };

    

  return (
    <div className="home">
      <h1>Welcome to the LitLink</h1>
      <SearchBar onSearch={(query) => setQuery(query)} />

      <section>
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Release Year"
            value={newBook.releaseDate}
            onChange={(e) => setNewBook({ ...newBook, releaseDate: e.target.value })}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </section>

      <section>
        <h2>Create a New List</h2>
        <form onSubmit={handleCreateList}>
          <input
            type="text"
            placeholder="List Name"
            value={newList.name}
            onChange={(e) => setNewList({ ...newList, name: e.target.value })}
            required
          />
          <button type="submit">Create List</button>
        </form>
      </section>

      <section>
        <h2>Your Lists</h2>
        {lists.length > 0 ? (
          lists.map((list) => (
            <div key={list.id} className="list-card">
              <h3>{list.name}</h3>
              <ul>
                {list.bookIds.map((bookId) => {
                  const book = books.find((b) => b.id === bookId);
                  return book ? (
                    <li key={bookId}>
                      {book.title}{" "}
                      <button
                        onClick={() => handleRemoveBookFromList(list.id, bookId)}
                      >
                        Remove
                      </button>
                    </li>
                  ) : null;
                })}
              </ul>
              <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
            </div>
          ))
        ) : (
          <p>No lists available</p>
        )}
      </section>

      <section>
        <h2>All Books</h2>
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const { averageRating, userRating } = calculateRatings(book.id);
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToList={(listId, bookId) => handleAddBookToList(listId, bookId)}
                  onAddRating={handleAddRating}
                  averageRating={averageRating}
                  userRating={userRating}
                  lists={lists}
                />
              );
            })
          ) : (
            <p>No books found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
