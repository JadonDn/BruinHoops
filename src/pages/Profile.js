import './Profile.css';
import NavBar from "../components/NavBar";
import { auth, database } from '../firebase';
import { ref, child, get, getDatabase } from 'firebase/database';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { useState } from 'react';
import Swal from 'sweetalert2';





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

    const editProfile = () => {

        Swal.fire({
            icon: 'error',
            title: 'CHANGE ME!',
            confirmButtonColor: '#007bff',
          });
    }

    return (
        <div>
          <NavBar />
          <div className="profile">
            <div className="profile-container">
              <h2 className="profile-header">Your Profile</h2>
              <div className="profile-content">
                <img src="pfp_placeholder.png"  className="profile-image" />
                <h3 className="profile-name">Aanas Chowdhury</h3>
                <p className="profile-bio">I am a point guard for the Los Angeles Lakers. I love Lebron. This is my UID {uid}</p>
                <button onClick={editProfile}className="edit-profile-btn">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Profile