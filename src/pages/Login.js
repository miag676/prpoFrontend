import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../AuthContext"; 

const Login = () => {
  const [userName, setUserName] = useState(""); // Change to userName
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(userName, password); // Use userName instead of email
    alert("Login successful!");
    console.log(response);

    // Use the token returned by the backend
    login(response.token); // Save the token and set isAuthenticated
    navigate("/"); // Redirect to the home page
  } catch (error) {
    alert("Login failed. Check console for details.");
    console.error(error);
  }
};

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text" // Change input type to text
        placeholder="Username"
        value={userName} // Use userName state
        onChange={(e) => setUserName(e.target.value)} // Update userName state
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account yet?{" "}
        <button type="button" onClick={handleRegisterRedirect}>
          Register
        </button>
      </p>
    </form>
  );
};

export default Login;
