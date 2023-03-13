import React from "react"
import { Link } from "react-router-dom";
import { goToLink } from './components/Utils';
import {signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase';
import firebase from 'firebase/compat/app';
import './Login.css'

function Login() {
    return(
        <div className="Login">
        <header className="Login-header">
          <p>
          <div classname = "WebsiteName"><h2>Bruin</h2><h3>Hoops</h3></div>
          </p>
        <img src = "mascot.png" className="Login-logo" alt="logo"/>
  <body>
    <div class = "login-Section">
      <meta name ="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h1>Login Here</h1>
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
  </body>
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
