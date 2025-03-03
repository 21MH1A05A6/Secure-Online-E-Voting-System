import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../assets/css/home.css";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle Dropdown
  const toggleDropdown = () => {
    console.log("Profile icon clicked");
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const LogoutButton = () => {
    // Clear the localStorage data (token and user)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect the user to the login page
    navigate("/loginpage");
  };
  
  return (
    <div className="home">
      {console.log("Dropdown Open State:", dropdownOpen)}

      <header className="home-header">
        <h1 className="welcome-text">Welcome, User</h1>

        <div className="profile-container" ref={dropdownRef}>
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} />

          {/* Apply 'show' class when dropdownOpen is true */}
          <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={LogoutButton}>Logout</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
