import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { getAllBooks, addBook, getAllRatings, addRating,   createList,
  getAllLists,
  addBookToList,
  removeBookFromList,
  deleteList,   getNotifications,
  clearNotifications, addNotification } from "../api";
import { useAuth } from "../AuthContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [query, setQuery] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", releaseDate: "" });
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState({ name: "", bookIds: [] });
  const [notifications, setNotifications] = useState([]);
  const { userId } = useAuth();
  const navigate = useNavigate();

  // Fetch books and ratings
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const fetchedBooks = await getAllBooks();
        const fetchedRatings = await getAllRatings(); // Fetch all ratings
        const fetchedLists = await getAllLists();
        const fetchedNotifications = await getNotifications(userId);
        setBooks(fetchedBooks);
        setRatings(fetchedRatings);
        console.log("fetchedLists", fetchedLists);
        setLists(fetchedLists); 
        console.log("fetchedNotifications", fetchedNotifications);
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const userLists = lists.filter((list) => list.userId === userId);

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const addedBook = await addBook(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setNewBook({ title: "", author: "", releaseDate: "" });
  
      // Send a notification to all users
      const notificationMessage = `A new book titled "${addedBook.title}" by ${addedBook.author} has been added!`;
      await addNotification(notificationMessage);
  
      alert("Book added successfully!");
    } catch (error) {
      console.error("Failed to add book:", error);
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
        userId: userId, 
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
  
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId && !list.bookIds.includes(bookId) // Ensure no duplicates
            ? { ...list, bookIds: [...list.bookIds, bookId] }
            : list
        )
      );
  
      alert(`Book added to list successfully!`);
    } catch (error) {
      alert("Failed to add book to list. Check console for details.");
    }
  };  
  

  const handleRemoveBookFromList = async (listId, bookId) => {
    try {
      await removeBookFromList(listId, bookId);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? { ...list, bookIds: list.bookIds.filter((id) => id !== bookId) }
            : list
        )
      );
      alert(`Book removed from list successfully!`);
    } catch (error) {
      alert("Failed to remove book from list. Check console for details.");
    }
  };
  
  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      alert("List deleted successfully!");
    } catch (error) {
      alert("Failed to delete list. Check console for details.");
    }
  };  

  const handleClearNotifications = async () => {
    try {
      await clearNotifications(userId);
      setNotifications([]);
      alert("Notifications cleared successfully!");
    } catch (error) {
      alert("Failed to clear notifications. Check console for details.");
    }
  };

    const goToRecommendations = () => {
      navigate("/recommendations");
    };
    

  return (
    <div className="home">
      <h1>Welcome to LitLink</h1>

      {/* <SearchBar onSearch={(query) => setQuery(query)} /> */}
      <button onClick={goToRecommendations} style={{ marginBottom: "20px" }}>
        View Recommendations
      </button>

      <section>
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          <>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
            <button onClick={handleClearNotifications}>Mark as Seen</button>
          </>
        ) : (
          <p>No notifications available</p>
        )}
      </section>

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
        {userLists.length > 0 ? (
          userLists.map((list) => (
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
                  lists={userLists}
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
