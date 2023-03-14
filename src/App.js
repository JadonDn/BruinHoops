import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'
import {setMinutes, setHours} from "date-fns";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from './components/NavBar';
import firebase from 'firebase/compat/app';
import { database } from 'firebase/compat/app';






function App() {

  
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

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);




  const toggleModal = () => {

    setModal(!modal);
  };

  const modalEventCheck = (start, end, title) => {

    const { star } = start;
    const {en} = end;
    const canAdd = canAddEvent(start, end, events);
    const isNotAllowed = moment(start).hour() < 8 || moment(end).hour() > 20; // set the time range here
    const eventDuration = moment.duration(moment(end).diff(moment(start))).asHours(); // get the duration of the event in hours
    const maxEventDuration = 2;
    const minEventDuration = 0.5;

    if (canAdd && !isNotAllowed && eventDuration <= maxEventDuration && eventDuration >= minEventDuration && title != '') {
      Swal.fire({
        icon: 'success',
        title: 'Court reserved!',
        confirmButtonColor: '#007bff',
      });
      return(true);
    } else if (isNotAllowed && !modal) {
      Swal.fire({
        icon: 'error',
        title: 'Please select an available time slot',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000

      });
      setModal(false);
      
      return(false);
    } else if (eventDuration > maxEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts may be reserved for up to 2 hours only.',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000
      });
      setModal(false);
      return(false);
    } else if (eventDuration < minEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts must be reserved for at least 30 minutes',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000
      });
      setModal(false);
      return(false);

    } else if(title == ''){
      Swal.fire({
        icon: 'error',
        title: 'Please choose a game.',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000
      });
      setModal(false);
      return(false);

    }else {
        Swal.fire({
          icon: 'error',
          title: 'All courts are reserved at this time, please choose a different time.',
          confirmButtonColor: '#007bff',
          timerProgressBar: true,
          timer: 4000
        });
        setModal(false);
        return(false);

      }


  }

  if(modal){
      document.body.classList.add('active-modl')
      document.body.style.overflow = 'hidden';
  }
  else{
      document.body.classList.remove('active-modl')
      document.body.style.overflow = 'auto';

  }
  
  const canAddEvent = (start, end, events) => {
    const maxEventsPerSlot = 4;
    const eventsDuringSlot = events.filter((event) => {
      return (
        (moment(event.start).isSameOrAfter(start) && moment(event.start).isBefore(end)) ||
        (moment(event.end).isSameOrAfter(start) && moment(event.end).isBefore(end))
      );
    });
    return eventsDuringSlot.length < maxEventsPerSlot;
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    const canAdd = canAddEvent(start, end, events);
    const isNotAllowed = moment(start).hour() < 8 || moment(end).hour() > 20; // set the time range here
    const eventDuration = moment.duration(moment(end).diff(moment(start))).asHours(); // get the duration of the event in hours
    const maxEventDuration = 2;
    const minEventDuration = 0.5;

    if (canAdd && !isNotAllowed && eventDuration <= maxEventDuration && eventDuration >= minEventDuration) {
      return(true);
    } else if (isNotAllowed && !modal) {
      Swal.fire({
        icon: 'error',
        title: 'Please select an available time slot',
        confirmButtonColor: '#007bff'
      });
      setModal(false);
      return(false);
    } else if (eventDuration > maxEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts may be reserved for up to 2 hours only.',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000
      });
      setModal(false);
      return(false);
    } else if (eventDuration < minEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts must be reserved for at least 30 minutes',
        confirmButtonColor: '#007bff',
        timerProgressBar: true,
        timer: 4000

      });
      setModal(false);
      return(false);

    } else {
        Swal.fire({
          icon: 'error',
          title: 'All courts are reserved at this time, please choose a different time.',
          confirmButtonColor: '#007bff',
          timerProgressBar: true,
          timer: 4000
        });
        setModal(false);
        return(false);

    }
  };


  const handleSelectEvent = (event) => {
    console.log('Selected Event:', event);
    handleDeleteEvent(event);
  };

  const handleDeleteEvent = (clickedEvent) => {
    Swal.fire({
      title: 'Delete Reservation?',
      html: '<div style="text-align: center;">You cannot revert this!</div>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({

          title: 'Success!',
          html: '<div style="text-align: center;">Your event has been deleted.',
          icon: 'success',
          confirmButtonColor: '#007bff',
          timerProgressBar: true,
          timer: 4000

        })
        const newEvents = events.filter((event) => event.id !== clickedEvent.id);
        setEvents(newEvents);
      }

    })
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    if(modalEventCheck(startDate, endDate, title))
    {
      const newEvent = {
        id: events.length + 1,
        title: title,
        start: startDate,
        end: endDate,
      };
      setEvents([...events, newEvent]);
    }

  
    toggleModal();
  };

  const termsPopup = () => {

    Swal.fire({
      icon: 'info',
      title: '<div style="text-align: left;">Reservations - Terms</div>',
      titleClass: 'title-left',
      width: '800px',
      html: `
      <div style="text-align: left;   line-height: 1.5;      ">
        • You can reserve courts by clicking 'Reserve' or by clicking on the calendar.<br/>
        • You may have only one court reserved per day.<br/>
        • Courts must be reserved at least 30 minutes and at most 2 hours.<br/>
        • If you do not confirm your reservation within the first 15 minutes, it will be cancelled.<br/>
        • Only one court can be reserved per user, per day.<br/>
        • Be responsible! Basketball courts rules and courtesies apply at all times.<br/>
        • There may only be up to 4 reservations per time slot.<br/>
        • And most importantly, have fun!</div>`, 
             confirmButtonColor: '#007bff',
    });

  }

  useEffect(() => {
    // Get canvas elements
    const hitchMeter = document.getElementById("hitch-meter");
    const woodenMeter = document.getElementById("wooden-meter");
  
    // Get canvas contexts for draawing
    const hitchCtx = hitchMeter.getContext("2d");
    const woodenCtx = woodenMeter.getContext("2d");


    const now = new Date();
    const hour = now.getHours();

    let hitchValue;
    let woodenValue;
    // Generate values between 0 and 100
    if (hour >= 8 && hour < 14) {
      // Set values for 8am-2pm
      hitchValue = Math.floor(Math.random() * 21) + 50; // round number down from random number between 50-70
      woodenValue = Math.floor(Math.random() * 31) + 20;
    } else if (hour >= 2 && hour < 20) {
      // 2pm - 8pm
      hitchValue = Math.floor(Math.random() * 31) + 20; // round number down from random number between 20-50
      woodenValue = Math.floor(Math.random() * 51) + 50;// 50-100
    } else {
      // closed
      hitchValue = 0;
      woodenValue = 0;
    }
    // Set colors for the meters
    const hitchColor = "#3f51b5";
    const woodenColor = "#ff9800";
    // Draw Hitch meter
    hitchCtx.fillStyle = hitchColor; // set color
    hitchCtx.fillRect(0, 0, hitchValue * 2, hitchMeter.height); // make rectangle, start at (0,0), width = hitchvalue * 2, height of hitchmeter
    // Draw Wooden meter
    woodenCtx.fillStyle = woodenColor;
    woodenCtx.fillRect(0, 0, woodenValue * 2, woodenMeter.height);
  }, []);

  

  return (
    <div id="events" className="App">
      <div className="header-container" >
        <NavBar />
      </div>
      <div className="event-btn-container" >
        <button onClick={toggleModal}className="btn-modal"> Reserve </button>    
        <div class="meter">
          <span class="hitch-meter-label">Hitch Activity:</span>
          <canvas class="meter-canvas" id="hitch-meter" ></canvas>
        </div>
        <div class="meter"> 
          <span class="wooden-meter-label">Wooden Activity:</span>
          <canvas class="meter-canvas" id="wooden-meter" ></canvas>
        </div>

        <button onClick={termsPopup}className="btn-modal"> Terms </button>
      </div>
      <div style={{clear: 'both'}}></div>
      <div style={{paddingTop: '20px'}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['week', 'day']}
          defaultView={'week'}
          eventPropGetter={eventStyleGetter}
          dayFormat={dayFormat}
          timeFormat={timeFormat}
          headerFormat={headerFormat}
          style={{ height: 770, paddingLeft: '100px', paddingRight: '100px'}}
          intervalHeight={50}
          slotDuration={'00:30:00'}
          min={new Date(0, 0, 0, 8, 0)} // start time of day view
          max={new Date(0, 0, 0, 20, 0)} // end time of day view
          selectable={true}
          onSelectSlot={(slotInfo) => { 
            setModal(handleSelectSlot(slotInfo));  
            setStartDate(slotInfo.start);
            setEndDate(slotInfo.end);
            ;}}
          onSelectEvent={handleSelectEvent}
        />
              <div className="button-container" style={{marginLeft: '20px'}}>
      <>
         {modal && (         
         <div className="modal">
            <div 
            onClick={toggleModal}
            className="overlay"></div>
            <div className="modal-content">
              <h2>Reserve a Court!</h2>
              <form onSubmit={handleSubmit}>
              <div className="input-group-title">
              <label htmlFor="title" style={{marginRight: '39px'}} >Title:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <select id="title" style={{width: '200px',fontFamily:'Josefin Sans', height: '25px'}} 
                  value={title} onChange={(e) => setTitle(e.target.value)}  > 
                  <option value="">Choose a Game</option>
                  <option value="1v1s">1v1s</option>
                  <option value="2v2s">2v2s</option>
                  <option value="3v3s">3v3</option>
                  <option value="4v4s">4v4s</option> 
                  <option value="5v5s">5v5s</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="start">Start:</label>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                timeCaption="time"
                minDate={new Date().setHours(8, 0)}
                minTime={new Date().setHours(8, 0)}
                maxTime={new Date().setHours(20, 0)}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="custom-date-picker-start"
                />
              </div>
              <div className="input-group">
                <label htmlFor="end">End:&nbsp;&nbsp;</label>
                <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                disabled={!startDate}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                timeCaption="time"
                minDate={startDate}
                maxDate={startDate}
                minTime={setMinutes(startDate, 30)}
                maxTime={setMinutes(startDate, 120)}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="custom-date-picker-end"
                />
              </div>
                <button type="submit">Create Event</button>
              </form>
            <button className='close-modal' onClick={toggleModal}>Cancel</button>
            </div>
         </div>)}
        </>
      </div>
      </div>
    </div>
  );
}

export default App;