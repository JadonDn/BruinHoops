import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/Home">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/Create-Account">
            <FaUser />
            <span>Create Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;