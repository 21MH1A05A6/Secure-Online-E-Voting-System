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

    console.log("Submitting Login Request:", formData); // Debug log

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("Login Response:", response.data); // Debug log

      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);

      // Redirect based on user role
      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/admin-home");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email" // ✅ Fix autofill warning
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password" 
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <br />
        <p className="forgot-password">
          <a href="/" style={{margin:"30px"}}>Home</a> 
          <a href="/forgot-password">Forgot Password?</a> 
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
