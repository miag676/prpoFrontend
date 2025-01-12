import axios from "axios";

// const USERS_URL = "http://localhost:8080/v1";
// const BOOKS_URL = "http://localhost:9090/v1";
// const RATINGS_URL = "http://localhost:9091/v1/ratings";
// const LISTS_URL = "http://localhost:9092/v1";
// const RECOMMENDATIONS_URL = "http://localhost:9093/v1/recommendations";
// const NOTIFICATIONS_URL = "http://localhost:9095/v1/notifications";

const USERS_URL = "http://72.146.54.221/v1";
const BOOKS_URL = "http://72.146.54.221/v1";
const RATINGS_URL = "http://72.146.54.221/v1/ratings";
const LISTS_URL = "http://72.146.54.221/v1";
const RECOMMENDATIONS_URL = "http://72.146.54.221/v1/recommendations";
const NOTIFICATIONS_URL = "http://72.146.54.221/v1/notifications";

//USERS

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${USERS_URL}/users/register`,
      {
        name: userData.name,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Required if backend requires cookies
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error);
    throw error;
  }
};

// Login User
export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(`${USERS_URL}/users/login`, {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error);
    throw error;
  }
};

//LISTS

// Get all lists
export const getAllLists = async () => {
  try {
    const response = await axios.get(`${LISTS_URL}/lists`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error.response?.data || error); 
    throw error;
  }
};

// Create a new list
export const createList = async (listData) => {
  try {
    const response = await axios.post(`${LISTS_URL}/lists`, {
      userId: listData.userId,
      name: listData.name,
      bookIds: listData.bookIds || [], // Optional: start with an empty list of books
    });
    return response.data;
  } catch (error) {
    console.error("Error creating list:", error.response?.data || error);
    throw error;
  }
};

// Add a book to a list
export const addBookToList = async (listId, bookId) => {
  try {
    const response = await axios.post(`${LISTS_URL}/lists/${listId}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding book to list:", error.response?.data || error);
    throw error;
  }
};

// Remove a book from a list
export const removeBookFromList = async (listId, bookId) => {
  try {
    const response = await axios.delete(`${LISTS_URL}/lists/${listId}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing book from list:", error.response?.data || error);
    throw error;
  }
};

// Delete a list
export const deleteList = async (listId) => {
  try {
    const response = await axios.delete(`${LISTS_URL}/lists/${listId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting list:", error.response?.data || error);
    throw error;
  }
};

//BOOKS

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BOOKS_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error.response?.data || error);
    throw error;
  }
};

// Get a single book by ID
export const getBook = async (id) => {
  try {
    const response = await axios.get(`${BOOKS_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error.response?.data || error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${BOOKS_URL}/books`, {
      title: bookData.title,
      author: bookData.author,
      releaseDate: bookData.releaseDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error.response?.data || error);
    throw error;
  }
};


// RATINGS

export const getAllRatings = async () => {
  try {
    const response = await axios.get(RATINGS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error.response?.data || error);
    throw error;
  }
};

// Add a rating
export const addRating = async (ratingData) => {
  try {
    const response = await axios.post(RATINGS_URL, ratingData);
    return response.data;
  } catch (error) { 
    console.error("Error adding rating:", error.response?.data || error);
    throw error;
  }
};

export const getRecommendations = async (userId) => {
  console.log("userId", userId)
  try {
    const response = await axios.get(`${RECOMMENDATIONS_URL}/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error.response?.data || error);
    throw error;
  }
};

export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${NOTIFICATIONS_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data || error);
    throw error;
  }
};

// Clear notifications for a user
export const clearNotifications = async (userId) => {
  try {
    const response = await axios.delete(`${NOTIFICATIONS_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error clearing notifications:", error.response?.data || error);
    throw error;
  }
};

export const addNotification = async (message) => {
  try {
    const response = await axios.post(`${NOTIFICATIONS_URL}/add`, message, {
      headers: { "Content-Type": "text/plain" }, // Ensure correct content type
    });
    return response.data;
  } catch (error) {
    console.error("Error adding notification:", error.response?.data || error);
    throw error;
  }
};

