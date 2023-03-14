import './Profile.css';
import NavBar from "../components/NavBar";
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from '@firebase/auth';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Profile = () => {
    // const [Uid, setUid] = useState('');
    const [userData, setuserData] = useState(undefined);

    useEffect(() => {
        const user = auth.currentUser
        const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            setuserData(docSnap.data());
        } 
    };    
    fetchUserData();
    }, []);

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         setUid(user.uid);
    //         fetchUserData();
    //     } else {
    //         // user signed out
    //     } 
    // });

    return (
        <div>
            <NavBar />
            <div className="profile">
                <div className="profile-container">
                    <h2 className="profile-header">Your Profile</h2>
                    <div className="profile-content">
                        <img src={userData?.profile_photo}  className="profile-image" alt = "Loading..." />
                        <h3 className="profile-name">{userData?.username}</h3>
                        <h4 className="profile-email">{userData?.email}</h4>
                        <p className="profile-bio">I am a point guard for the Los Angeles Lakers. I love Lebron.</p>
                        <button onClick={editProfile}className="edit-profile-btn">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const editProfile = () => {
    Swal.fire({
        icon: 'error',
        title: 'CHANGE ME!',
        confirmButtonColor: '#007bff',
    });
}

export default Profile;
