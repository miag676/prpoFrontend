import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Add userId state

  useEffect(() => {
    // Check if the user is logged in by looking at localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId); // Restore userId from localStorage
    }
  }, []);

  const login = (id) => {
    localStorage.setItem("userId", id);
      setIsAuthenticated(true);
      setUserId(id); 
  };

  const logout = () => {
    localStorage.removeItem("userId"); 
    console.log("logout");
    setIsAuthenticated(false);
    setUserId(null); // Clear userId state
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
