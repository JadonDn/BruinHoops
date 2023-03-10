import React from 'react';
import { FaHome, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../BruinHoopsLogo.png';

const NavBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/Home">
          <img src={logo} class = "logo" alt="Logo"/>
          </Link>
        </li>
        <li>
          <Link to="/About">
            <AiOutlineInfoCircle />
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
            <FaUser />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;