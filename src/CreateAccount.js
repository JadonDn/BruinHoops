import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import './CreateAccount.css';
import Swal from 'sweetalert2';
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
           <label htmlFor="Photo">Upload Your Photo:</label>
           <input type="file" id="pfp" name="pfp" accept="image/png, image/jpeg" required></input>
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
    var pfp = document.getElementById('pfp').value;    

    createUserWithEmailAndPassword(auth, email, password, pfp)
    .then(function() {
        var user = auth.currentUser
        
        var database_ref = firebase.database().ref()
        
        var user_data = {
            email : email,
            last_login : Date.now(),
            username : username,
            profile_photo : pfp
        }
        
        database_ref.child('users/' + user.uid).set(user_data)
        goToLink("/Home")
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email / Username!',
            html: `
      <div style="text-align: center;   line-height: 1.5;      ">
      It looks like you may have entered an incorrect email address or username. Please correct it if necessary.
      </div>`,
            confirmButtonColor: '#007bff',
            timerProgressBar: true,
            timer: 4000
          });
                  console.log(error);
    });
}



export default CreateAccount;
