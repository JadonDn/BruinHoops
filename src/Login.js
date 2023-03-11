import React from "react"
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { goToLink } from './components/Utils';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import  './Login.css';

// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

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





function Login() {
    return(
        <div className="Login">
        <header className="Login-header">
          <p>
          <div classname = "WebsiteName"><h2>Bruin</h2><h3>Hoops</h3></div>
          </p>
          <a>
        <img src = "mascot.png" className="Login-logo" alt="logo"/>
  <body>
    <div class = "login-Section">
      <meta name ="viewport" content="width=device-width, initial-scale=1.0"></meta>

            
            <h1>Login Here</h1>
   
      <div className="Logincolor">

      <div>
        <label htmlFor ="email">Email</label>
        <input type = "text" id ="email" name = "email"></input>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"></input>
           <button type="submit" onClick={() => {login()} }>Login</button>
        <Link to="/Create-Account">
              Create Account
        </Link>
      </div>
      </div>
  
    </div>
  </body>
          </a>
        </header>
      </div>
    );
  };

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
    goToLink("/Home")


  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}



export default Login;
