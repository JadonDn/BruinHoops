import React from "react";
import './Home.css';
import NavBar from "../components/NavBar";
import { goToLink } from "../components/Utils";

function Home() {
  return (
    
    <body> <div>
    <NavBar />
  </div>
  <div className="Home">
  <h1>Basketball Made Easy</h1>
  <p>Find Teammates and set up basketball games at Hitch and John Wooden Center courts!</p>
  <button type="Getstarted" onClick={() => {goToLink('/App')} }>Get Started</button>
  </div>
</body>

  
  
  );
}
  
export default Home; 
