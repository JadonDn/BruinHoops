import './Profile.css';
import NavBar from "../components/NavBar";
import { auth, database } from '../firebase';
import { ref, child, get, getDatabase } from 'firebase/database';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { useState } from 'react';




function Profile() {

    const user = auth.currentUser;
    if (user !== null) {;
        var uid = user.uid;   
    }
    // const auth = getAuth();
    // const db = getDatabase();
    // var dbRef = firebase.database().ref()

    // onAuthStateChanged(auth, async (user) => { 
    //     const snap = await get(child(dbRef, `users/${user.uid}`));
    //     console.log(snap.val());
      
    //     if (snap.exists()) {
    //       displayName.innerText = "Currently logged in as: " + user.email;
    //       displayID.innerText = "School ID: " + user.schoolID;
    //       displayEmail.innerText = "Email: " + user.email;
    //       displayUsername.innerText = "Username: " + user.username;
    //       displayLogin.innerText = "Account Creation: " + user.last_login;
    //     }
    //   })

    return(
        <div>
            <NavBar />
            <div>
                {uid}
            </div>  
        </div>
    );
}

export default Profile