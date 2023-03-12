import React from 'react';
import { FaHome, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {
  return (
<nav className='Navigation'>
      <header>
      <Link to="/Home">
         <img src = "mascot.png" className="logo" alt="logo"/>
      </Link>
          <ul class = "navlinks">
            <li>
              <Link to="/About">
                <a>About</a>
              </Link>
           </li>
            <li>
              <Link to="/Profile">
                <a>Profile</a>
              </Link>
            <li>  
              <Link to="/Contact">
                <button>Contact Us</button>
              </Link>
            </li>
            </li>
          </ul>
      </header>
  </nav>

    // <nav className="navigation-bar">
    //   <ul>
    //     <li>
    //       <Link to="/Home">
    //       <img src={logo} class = "logo" alt="Logo"/>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/About">
    //         <AiOutlineInfoCircle />
    //         <span>About</span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/Contact">
    //         <FaPhoneAlt />
    //         <span>Contact Us</span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/Profile  ">
    //         <FaUser />
    //         <span>Profile</span>
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>

  );
}

export default NavBar;