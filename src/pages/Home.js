import React from "react";
import './Home.css';
import NavBar from "../components/NavBar";
import { goToLink, getCircularImageSrc } from "../components/Utils";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { storage, db } from "../firebase";
import { ref, getDownloadURL  } from "firebase/storage";
import Swal from "sweetalert2";

function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [Query, setQuery] = useState('');
  const [results, setResults] = useState([]);  

    const fetchUserData = async () => {
      if(Query.trim() !== '') {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", Query.trim()));
        const querySnapshot = await getDocs(q);
        setResults(querySnapshot.docs.map((doc) => doc.data()));
      }  
      else { setResults([]); }
    }

    function handleChange(event) {
      setQuery(event.target.value);
    }
  

    const handleUserClick = async (user) => {
      const pathReference = ref(storage, "images/" + user.uid + ".png");
        getDownloadURL(pathReference).then((url) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url); // try using getCircularImageSrc(url) to show a circular image
            if (!isImageLoaded) {
                return (
                <div>
                    <h1>Loading...</h1>
                </div>);
            }
            setIsImageLoaded(true);
        }).catch((error) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', 'https://png.pngtree.com/png-clipart/20210608/ourmid/pngtree-light-gray-silhouette-avatar-png-image_3418403.jpg')
        });

      Swal.fire({
        icon: "info",
        title: "Username: " + user.username,
        html: "<pre><div className='circular--landscape'><img height= 300 width=300 id='myimg' alt='No Profile Photo'></img></div><br>Email: " + user.email + "<br>Bio: " + user.bio + "<br></pre>",
        customClass: {
          popup: 'format-pre'
        },
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
  <div>
      <input className="search-input" type="text" value={Query} placeholder="Search for players/events..." onChange={handleChange}></input>
      <button type="button" onClick={() => {fetchUserData()}}>Search</button>
      <div className="dropdown">
      {results.map(user => (
        <li className="user-list" key={user.uid} onClick={() => {handleUserClick(user)}}>{user.username}</li>
      ))}
      </div>
    </div>
    </div>
  </form>
  </div>
  </body>
  );
}

export default Home; 