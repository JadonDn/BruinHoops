import React from "react"
import { Link } from "react-router-dom";
import { goToLink } from './components/Utils';
import {signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore"
import Swal from 'sweetalert2';
import { useState } from "react";

import './Login.css'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { last_login : Date.now() }, { merge : true}, {  
    })
    goToLink('/Home');
  } catch(error) {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Email or password!',
      confirmButtonColor: '#007bff',
      timerProgressBar: true,
      timer: 4000
    });
    }
  }

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
        <input type = "text" id ="email" value={email} name = "email" onChange={(event) => setEmail(event.target.value)} required placeholder="Type Your Email"></input>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)}required placeholder="Type Your Password"></input>
           <button type="submit" onClick={() => {login()} }>Login</button>
        <Link to="/Create-Account">
              <a>Create Account</a>
        </Link>
      </div>
    </div>
  </body>
        </header>
      </div>
    );
  };



export default Login;
