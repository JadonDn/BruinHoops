import React from "react";
import './Home.css';
import NavBar from "../components/NavBar";
import { goToLink } from "../components/Utils";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

function Home() {

  const [Query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
    useEffect(() => {
      const fetchUserData = async () => {
        if(Query.trim() !== '') {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", Query.trim()));
          const querySnapshot = await getDocs(q);
          const data = [];
            querySnapshot.forEach((doc) => {
            data.push(doc.data());
            });
            setResults(data);
        }  
        else { setResults([]); }
      }
      fetchUserData();
    }, [Query]);

    function handleChange(event) {
      setQuery(event.target.value);
    }
  

  return (
  <body> 
  <div>
  <NavBar />
  </div>
  <div className="Home">
  <h1>Basketball Made Easy</h1>
  <p>Find Teammates and set up basketball games at Hitch and John Wooden Center courts!</p>
  <button type="Getstarted" onClick={() => {goToLink('/App')} }>Get Started</button>
  <form>
  <div className = "search-bar">
  </div>
  <div>
      <input type="text" value={Query} onChange={handleChange} placeholder="Search for players/events..."/>
      {results.map(result => (
        <div key={result.id}>{result.username}</div>
      ))}
    </div>
  <button type="search">Search</button>
  </form>
  </div>
  </body>
  );
}

export default Home; 

