import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { goToLink } from './Utils';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

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
              <Link to="/Contact">
              <a>Contact Us</a>
              </Link>
              </li>
           <li>
              <Link to="/App">
                <a>Events</a>
              </Link>
           </li>
           
            <li>
              <Link to="/Profile">
                <a>Profile</a>
              </Link>
            </li>
            
            <li><Link to="/">
              <button type="submit" onClick={() => {signOutButton()} }>Sign Out</button>
              </Link></li>
             
            
          </ul>
      </header>
  </nav>

  );
}

function signOutButton() {
  signOut(auth)
    .then(() => {
      goToLink("/");
    })
    .catch((error) => {
      console.log("Error signing out:", error);
    });
}

export default NavBar;