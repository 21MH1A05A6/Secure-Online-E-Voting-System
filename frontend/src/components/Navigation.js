import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      
      <ul className="mx-1">
      <li className="nav-item">
          <button  className="t"><Link className="nav-link active" aria-current="page" to="/"><span class="a">Home</span></Link></button>
        </li>
      <li className="nav-item mx-1">
        <button className="s"><Link className="nav-link" to="/loginpage"><span class="a">Logout</span></Link></button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;