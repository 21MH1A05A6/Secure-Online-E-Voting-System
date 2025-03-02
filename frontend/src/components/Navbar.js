import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <div style={{
  flex: 2, 
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width:'100px'
}}>
  <h1 style={{
    fontSize: '3rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#5A3E1B', // Deep brown for warm contrast
    textShadow: '2px 2px 10px rgba(255, 223, 186, 0.9)', // Soft golden glow
    background: 'linear-gradient(45deg, #D2B48C, #C19A6B, #8B4513)', // Tan, Light Brown, Saddle Brown
    padding: '10px 30px',
    borderRadius: '8px',
    display: 'inline-block',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)', // Soft gold glow to match yellow background
}}>
    ONLINE E-VOTING SYSTEM
</h1>

</div>




      {/* Login and Register aligned to the right */}
      <ul className="right-nav">
        <li className="nav-item">
          <button className="s">
            <Link className="nav-link" to="/loginpage">
              Login
            </Link>
          </button>
        </li>
        <li className="nav-item">
          <button className="u">
            <Link className="nav-link" to="/registerpage">
              Register
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
