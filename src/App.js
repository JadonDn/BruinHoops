import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'

function App() {

  
  const localizer = momentLocalizer(moment);

  const [view, setView] = useState('week');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting',
      start: new Date(2023, 2, 5, 10, 0),
      end: new Date(2023, 2, 5, 11, 0),
    },
  ]);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#3174ad',
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

  const toggleModal = () => {

      setModal(!modal)
  };

  if(modal){
      document.body.classList.add('active-modl')
      document.body.style.overflow = 'hidden';
  }
  else{
      document.body.classList.remove('active-modl')
      document.body.style.overflow = 'auto';
  }
  
  const handleClick = (eventTitle) => {
    const newEvent = {
      id: events.length + 1,
      title: eventTitle,
      start: new Date(),
      end: new Date(),
    };
    setEvents([...events, newEvent]);
    setInputValue(''); 
  }; 

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
    const isNotAllowed = moment(start).hour() < 8 || moment(end).hour() > 17; // set the time range here
    if (canAdd && !isNotAllowed) {
      const newEvent = {
        id: events.length + 1,
        title: 'MONKEY',
        start: start,
        end: end,
      };
      setEvents([...events, newEvent]);
    } else if (isNotAllowed) {
      alert('Please select an available time slot');
    }
    else {
      alert('Maximum number of events per time slot reached');
    }
  };


  const handleSelectEvent = (event) => {
    console.log('Selected Event:', event);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  


  return (
    <div className="App">
      <div className="header-container" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: '20px'}}>
        {/* <h1 style={{marginBottom: '10px'}}>Events</h1> */}
      </div>
      <div style={{clear: 'both'}}></div>
      <div style={{paddingTop: '50px'}}>
      <button onClick={toggleModal}className="btn-modal"> Open </button>

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
          onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo)}
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
                <h2> Hello Modal</h2>
                <p>
                    lorum psum
                </p>
                <button
                className='close-modal'
                onClick={toggleModal}
                >CLOSE</button>
            </div>
         </div>)}
        </>
      </div>
      </div>
    </div>
  );
}

export default App;
