import React from "react";
import logo from './logo.svg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM50IoA5Ah4Na_h5fyHBIHDPrONjtZ9jk",
  authDomain: "bruin-hoops.firebaseapp.com",
  databaseURL: "https://bruin-hoops-default-rtdb.firebaseio.com",
  projectId: "bruin-hoops",
  storageBucket: "bruin-hoops.appspot.com",
  messagingSenderId: "133820248934",
  appId: "1:133820248934:web:20b9bb7e3729c3f2668ea7",
  measurementId: "G-JNL13FVSXB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

function App() {
    return (
    <div className="App">
    <header className="App-header">
      <div className = "WebsiteName"><h2>Bruin</h2><h3>hoops</h3></div>
     
    <img src = "https://content.sportslogos.net/logos/35/882/full/ucla_bruins_logo_mascot_20043890.png" className="App-logo" alt="logo"/>
<div>
<div className = "login-Section">
  <h1>Login</h1>
  <div id = "contactForm">
    <label htmlFor ="email">Username</label>
    <input type = "text" id ="email" name = "email"></input>
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password"></input>
    <div id = "button_container">
            <button onClick={() => {login()}}>Login</button>
            <button onClick={() => {register()}}>Register</button>
    </div>
  </div>
</div>
</div>
        
    </header>
        </div>
            )
  }
function register() {
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
        var user = auth.currentUser
        
        var database_ref = firebase.database().ref()
        
        var user_data = {
            email : email,
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).set(user_data)
        
        alert('User Created!!')
    })
        .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
        alert(errorMessage);
      console.log(error);
    });
}

function login () {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
    
  signInWithEmailAndPassword(auth, email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = firebase.database().ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}
export default App;
