import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios";
import toast from "react-hot-toast"; // For notifications
import "../assets/css/login.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
