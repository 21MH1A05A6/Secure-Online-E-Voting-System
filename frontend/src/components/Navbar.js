import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul>
      <li className="nav-item">
          <button  className="t"><Link className="nav-link active" aria-current="page" to="/"><span class="a">Home</span></Link></button>
        </li>
      <li className="nav-item">
        <button className="s"><Link className="nav-link" to="/loginpage"><span class="a">Login</span></Link></button>
        </li>
        <li className="nav-item">
        <button className="u"><Link className="nav-link" to="/registerpage"><span class="a">Register</span></Link></button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;