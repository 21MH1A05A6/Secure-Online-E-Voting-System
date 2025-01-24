import React, { useState } from "react";
import "../assets/css/register.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("");
            console.log("Form Submitted:", formData);
        }
    };

    return (
        <div className="register-page">
        <div className="registration-container">
            <h2 style={{color:"black",fontWeight: "bold"}}> Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username/Name:</label>
                    <input type="text" name="username" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Email/Phone Number:</label>
                    <input type="text" name="email" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
        </div>
    );
};

export default RegistrationPage;
