import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'
import {setMinutes, setHours} from "date-fns";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from './components/NavBar';





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

  const modalEventCheck = (start, end) => {

    const { star } = start;
    const {en} = end;
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
      });
      setModal(false);
      return(false);
    } else if (eventDuration > maxEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts may be reserved for up to 2 hours only.',
      });
      setModal(false);
      return(false);
    } else if (eventDuration < minEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts must be reserved for at least 30 minutes',
      });
      setModal(false);
      return(false);

    } else {
        Swal.fire({
          icon: 'error',
          title: 'All courts are reserved at this time, please choose a different time.',
          confirmButtonColor: 'rgb(120, 120, 255)'
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
      });
      setModal(false);
      return(false);
    } else if (eventDuration > maxEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts may be reserved for up to 2 hours only.',
      });
      setModal(false);
      return(false);
    } else if (eventDuration < minEventDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Courts must be reserved for at least 30 minutes',
      });
      setModal(false);
      return(false);

    } else {
        Swal.fire({
          icon: 'error',
          title: 'All courts are reserved at this time, please choose a different time.',
          confirmButtonColor: 'rgb(120, 120, 255)'
        });
        setModal(false);
        return(false);

    }
  };


  const handleSelectEvent = (event) => {
    console.log('Selected Event:', event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(modalEventCheck(startDate, endDate))
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

  

  return (
    <div id="events" className="App">
      <div className="header-container" >
        <h1> Events</h1>  <NavBar />
      </div>
      <div className="event-btn-container" >
        <button onClick={toggleModal}className="btn-modal"> Reserve </button>
      </div>
      <div style={{clear: 'both'}}></div>
      <div style={{paddingTop: '1px'}}>
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
          style={{ height: 670, paddingLeft: '20px', paddingRight: '20px'}}
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
                maxTime={new Date().setHours(20, 0)}
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