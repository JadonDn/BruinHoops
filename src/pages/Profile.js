import './Profile.css';
import NavBar from "../components/NavBar";
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const Profile = () => {

const localizer = momentLocalizer(moment);

const [view, setView] = useState('week');
const [events, setEvents] = useState([]);  

const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#007bff',
        color: '#fffff',
      },
    };
  };

  const dayFormat = (date, culture, localizer) => {
    return localizer.format(date, 'dd');
  };

  const timeFormat = (date, culture, localizer) => {
    return localizer.format(date, 'h:mm a');
  };

  const headerFormat = (date, culture, localizer) => {
    return localizer.format(date, 'MMMM YYYY');
  };

    const [userData, setuserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setuserData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };    
    fetchUserData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="profile">
                <div className="profile-container">
                    <h2 className="profile-header">Your Profile</h2>
                    <div className="profile-content">
                        <img src = "pfp_placeholder.png" className='profile-image'></img>
                        <h3 className="profile-name">Username: {userData?.username}</h3>
                        <h4 className="profile-email">Email: {userData?.email}</h4>
                        <p className="profile-bio">"insert bio"</p>
                        <button onClick={editProfile}className="edit-profile-btn">Edit Bio</button>
                       
                     

                    </div>
                </div>
            </div>
           
            <div className='cal'> <Calendar  localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['week', 'day']}
          min={new Date(0, 0, 0, 8, 0)} // start time of day view
          max={new Date(0, 0, 0, 20, 0)} // end time of day view
          defaultView={'week'}
          eventPropGetter={eventStyleGetter}
          dayFormat={dayFormat}
          timeFormat={timeFormat}
          headerFormat={headerFormat}
          style={{ height: 475, width: 725, paddingLeft: '50px', paddingRight: '50px', }}
          intervalHeight={50}
          slotDuration={'00:30:00'}

        /> </div> 
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
