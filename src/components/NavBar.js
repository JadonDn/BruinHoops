import React from 'react';
import { FaHome, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import img from '../../public/ucla_bruins_logo_mascot_20043890.png';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/Home">
            <FaHome />
            <span>Bruin Hoops</span>
          </Link>
        </li>
        <li>
          <Link to="/About">
            <FcAbout />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link to="/Contact">
            <FaPhoneAlt />
            <span>Contact Us</span>
          </Link>
        </li>
        <li>
          <Link to="/Profile  ">
            <FaHome />
            <span></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;