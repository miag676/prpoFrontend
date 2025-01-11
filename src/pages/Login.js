import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userName, password);
      alert("Login successful!");
      console.log(response);

      login(response.id); // Pass userId to login
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
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
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
