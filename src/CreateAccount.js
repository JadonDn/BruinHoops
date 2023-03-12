import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import './CreateAccount.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { goToLink } from './components/Utils';
import {app, auth} from './firebase';


const CreateAccount = () => {
    
    
    return(
           <div className='test'>
           <div  className='Create'>
           <img src = "mascot.png" className="bear" alt="logo"/>
           <div>
           <a>Create Account</a>
           <label htmlFor="username">Username:</label>
           <input type="text" id="username" name="username" required></input>
           <label htmlFor="email">Email:</label>
           <input type="text" id="email" name="email" required></input>
           <label htmlFor="password">Password:</label>
           <input type="password" id="password" name="password" required></input>
           <button type ="submit" onClick={() => {register()}}>Register</button>
           </div>
           </div>
           </div>
           
           
           
           );
    
};

function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
        var user = auth.currentUser
        
        var database_ref = firebase.database().ref()
        
        var user_data = {
            email : email,
            last_login : Date.now(),
            username : username
        }
        
        database_ref.child('users/' + user.uid).set(user_data)
        goToLink("/Home")
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
    });
}
export default CreateAccount;
