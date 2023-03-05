import React from "react";
import logo from './logo.svg';
import firebase from 'firebase/app';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM50IoA5Ah4Na_h5fyHBIHDPrONjtZ9jk",
  authDomain: "bruin-hoops.firebaseapp.com",
  projectId: "bruin-hoops",
  storageBucket: "bruin-hoops.appspot.com",
  messagingSenderId: "133820248934",
  appId: "1:133820248934:web:20b9bb7e3729c3f2668ea7",
  measurementId: "G-JNL13FVSXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <div classname = "WebsiteName"><h2>Bruin</h2><h3>hoops</h3></div>
        </p>
        <a
  >
       
      <img src = "https://content.sportslogos.net/logos/35/882/full/ucla_bruins_logo_mascot_20043890.png" className="App-logo" alt="logo"/>
<body>
  <div class = "login-Section">
    <h1>Login</h1>
    <form>
      <label for ="username">Username</label>
      <input type = "text" id ="username" name = "password"></input>
      <label for="password">Password</label>
      <input type="password" id="password" name="password"></input>
      <input type="submit" value="Login"></input>
    </form>
  </div>
</body>
          
        </a>
      </header>

    </div>
    
  );
}

export default App;
