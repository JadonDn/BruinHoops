import React from "react";
import './Home.css';
import NavBar from "../components/NavBar";
import { goToLink } from "../components/Utils";


import firebase from 'firebase/compat/app';
import { database } from 'firebase/compat/app';
function Home() {
  return (
    
    <body> <div>
    <NavBar />
  </div>
  <div className="Home">
  <h1>Basketball Made Easy</h1>
  <p>Find Teammates and set up basketball games at Hitch and John Wooden Center courts!</p>
  <button type="Getstarted" onClick={() => {goToLink('/App')} }>Get Started</button>
  <form>
  <input type="text" placeholder="Search for players' events..."></input>
  <button type="search">Search</button>
</form>

  </div>

</body>


  );
}
  
export default Home; 

