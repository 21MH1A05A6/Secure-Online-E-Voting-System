import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/admin-home.css";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const LogoutButton = () => {
    // Clear the localStorage data (token and user)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect the user to the login page
    navigate("/loginpage");
  };

  return (
    <div className="home-container">
      <div className="greeting">Welcome, Admin!</div>
      <div className="button-container">
        <button
          className="home-button"
          onClick={() => navigate("/create-election")}
        >
          Create Election
        </button>
        <button
          className="home-button"
          onClick={() => navigate("/view-voters")}
        >
          View Voters
        </button>
        <button
          className="home-button"
          onClick={() => navigate("/declare-results")}
        >
          Declare Results
        </button>
        <button className="home-button" onClick={LogoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHomePage;
