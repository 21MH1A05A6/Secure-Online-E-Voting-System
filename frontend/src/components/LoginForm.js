import React, { useState } from "react";
import "../assets/css/login.css";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);

        if (formData.username === "" || formData.password === "") {
            alert("Please enter both username and password.");
            return;
        }

        alert("Login Successful!"); // Simulating login success
    };

    return (
        <div className="login-page">
        
        <div className="login-container">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
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
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
        </div>
        
    );
};

export default LoginForm;
