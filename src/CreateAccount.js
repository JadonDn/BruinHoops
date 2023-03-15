import React from 'react'
import 'firebase/compat/auth';
import 'firebase/compat/database';
import './CreateAccount.css';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { goToLink } from './components/Utils';
import {auth, db} from './firebase';
import { setDoc, doc } from "firebase/firestore"
import { useState } from 'react';
// import { redirect } from "react-router-dom";


const CreateAccount = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pfp, setPfp] = useState(null);

    const register = async (event) => { 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email : email,
                last_login : Date.now(),
                username : username,
                password : password,
                profile_photo : pfp,
                bio : "insert bio"
            })
            goToLink('/Home');
        }
        catch(error) {
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
        }
    }

    return(
           <div className='test'>
           <div  className='Create'>
           <img src = "mascot.png" className="bear" alt="logo"/>
           <div>
           <div>Create Account</div>
           <label htmlFor="username">Username:</label>
           <input type="text" id="username" value={username} name="username" onChange={(event) => setUsername(event.target.value)} required placeholder='Create a Username'></input>
           <label htmlFor="email">Email:</label>
           <input type="text" id="email" value={email} name="email" onChange={(event) => setEmail(event.target.value)} required placeholder='Create an Email'></input>
           <label htmlFor="password">Password:</label>
           <input type="password" id="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)} required placeholder='Create a Password'></input>
           <label htmlFor="Photo">Upload Your Photo:</label>
           <input type="file" id="pfp" name="pfp" accept="image/png, image/jpeg" onChange={(event) => setPfp(event.target.value)} required></input>
           <button type ="submit" onClick={() => {register()} }>Register</button>
           </div>
           </div>
           </div>   
           );
    
};


export default CreateAccount;
