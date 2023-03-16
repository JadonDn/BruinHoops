import React from "react";
import './Home.css';
import NavBar from "../components/NavBar";
import { goToLink } from "../components/Utils";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL  } from "firebase/storage";
import Swal from "sweetalert2";

function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

    useEffect(() => {
      const fetchProfilePhoto = async () => {
        const user = auth.currentUser;
        const pathReference = ref(storage, "images/" + user.uid + ".png");
        getDownloadURL(pathReference).then((url) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
            if (!isImageLoaded) {
                return (
                <div>
                    <h1>Loading...</h1>
                </div>);
            }
            setIsImageLoaded(true);
        }).catch((error) => {
            console.log(error);
        });
      }
      fetchProfilePhoto();
    })
    function handleChange(event) {
      setQuery(event.target.value);
    }
  

    const handleUserClick = (user) => {
      Swal.fire({
        icon: "info",
        title: "Username: " + user.username,
        html: "<pre><div className='circular--landscape'><img id='myimg' alt='could not display...'></img></div><br>Email: " + user.email + "<br>Bio: " + user.bio + "<br></pre>",
        customClass: {
          popup: 'format-pre'
        }
      });
    };

    
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
      <input className="search-input" type="text" value={Query} onChange={handleChange} placeholder="Search for players/events..."/>
      <ul>
      {results.map(user => (
        <li className="user-list" key={user.id} onClick={() => {handleUserClick(user)}}>{user.username}</li>
      ))}
      </ul>
    </div>
  </form>
  </div>
  </body>
  );
}

export default Home; 