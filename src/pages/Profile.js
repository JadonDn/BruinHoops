import './Profile.css';
import NavBar from "../components/NavBar";
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged} from 'firebase/auth';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ref, getDownloadURL  } from "firebase/storage";


const Profile = () => {


  useEffect(() => {

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const userID = auth.currentUser;

    const eventWithUser = storedEvents.find(event => event.user === userID.uid);
    let savedEvents = eventWithUser ? [eventWithUser] : [];
    if (eventWithUser) {
      savedEvents = [Object.assign({}, eventWithUser, {
        start: new Date(eventWithUser.start),
        end: new Date(eventWithUser.end),
      })];
    } else {
      savedEvents = [];
    }

    setEvents(savedEvents);
  }, []);   // render events from local storage on the calendar



  const handleClick = async (event) => {

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const userID = auth.currentUser;
    const eventWithUser = storedEvents.find(event => event.user === userID.uid);
    let savedEvents = eventWithUser ? [eventWithUser] : [];
    if (eventWithUser) {
      savedEvents = [Object.assign({}, eventWithUser, {
        start: new Date(eventWithUser.start),
        end: new Date(eventWithUser.end),
      })];
    } else {
      savedEvents = [];
    }
    const userEvents = savedEvents.map(event => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const start = startDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric"
      });
      const end = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric"
      });
      return {
        title: event.title,
        start: startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        end: endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        startTime: start,
        endTime: end
      };
    });
    
    const formattedEvents = userEvents.map(event => {
      const { title, start, end, startTime, endTime } = event;
      return `Reservation Details: \n\nGame: ${title}\n\nStart: ${start} ${startTime}\n\nEnd: ${end} ${endTime}`;
    }).join('\n\n');

    Swal.fire({
      title: formattedEvents,
      confirmButtonColor: '#007bff',
      imageUrl: 'mascot.png',
      imageWidth: 150,
      imageHeight: 150,

    });

  }


const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        onAuthStateChanged(auth, (user) => {
            const fetchUserData = async () => {
            const user = auth.currentUser;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setuserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
            const pathReference = ref(storage, "images/" + user.uid + ".png");
            getDownloadURL(pathReference).then((url) => {
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
                if (!isImageLoaded) {
                    return (
                    <div>
                        <h1>Loading...</h1>
                    </div>);
                }
                setIsImageLoaded(true);
            }).catch((error) => {
                console.log(error);
            });
        };
    fetchUserData();
        })
    });


    return (
        <div>
            <NavBar />
            <div className="profile">
                <div className="profile-container">
                    <h2 className="profile-header">Your Profile</h2>
                    <div className="profile-content">
                        <div className='circular--landscape'><img id='myimg' alt='could not display...'></img></div>
                        <h3 className="profile-name">Username: {userData?.username}</h3>
                        <h4 className="profile-email">Email: {userData?.email}</h4>
                        <p className="profile-bio">Bio: {userData?.bio}</p>
                        <button type="submit" onClick={() => {editProfile()}}>Edit Bio</button>
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
          onSelectEvent={handleClick}
          style={{ height: 475, width: 725, paddingLeft: '50px', paddingRight: '50px', }}
          intervalHeight={50}
          slotDuration={'00:30:00'}

        /> </div> 
        </div>
    );
}

const editProfile = () => {
    const uid = auth.currentUser.uid
    const userRef = doc(db, "users", uid)
    Swal.fire({
      title: 'Write a bio',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (!inputValue.trim()) {
            Swal.showValidationMessage('You Must Write Something!');        
        } else {
            updateDoc(userRef, { bio : inputValue }, { merge : true}, {})
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(()=>{
                window.location.reload(false);
            }, 500);
        }
    })
}

export default Profile;