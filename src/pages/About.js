import React from 'react';
import './About.css';
import NavBar from "../components/NavBar";

const About = () => {
    return(
      <div className="About">
        <NavBar/>
        <img src = "https://www.freeiconspng.com/thumbs/calendar-image-png/calendar-image-png-3.png" className='cale'></img>
        <p>Bruin Hoops allows students at UCLA to schedule games and check the availability of various basketball courts around campus. 
          This includes Hitch courts and the John Wooden Center. Based on the John Wooden Center and Hitch courts’ hours of operation, students 
          are able to create events, team up with others, and reserve courts to host fun and competitive basketball games!</p>
          <h1>Our Approach</h1>
       
      </div>
    );
}

export default About;