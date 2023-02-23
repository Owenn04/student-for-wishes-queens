import "./css/events.css"

import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    console.log("data fetched")
    const handleEvents = async () =>{
      const response = await fetch("http://localhost:3002/api/events/get")
      const newEvents = await response.json()
      await setEvents(newEvents)
      console.log(newEvents)
    }
    handleEvents()
  }, [])

  if (events != null && events.length > 0){
    return(
      <div className='events'>
        <div className="events-banner">
          <a>
            <h1>EVENTS</h1>
          </a>
        </div>
          {events.map((props, i) => {
            return(
            <div key = {props.Id} className = 'event-item'>
              <img className = 'event-image' src = {props.Image} alt = {props.Title}/>
              <div className ="event-textitems">
                <div className="event-toptext">
                  <h1 className ="event-title">{props.Title}</h1>
                  <p className = 'event-date'>Date: {props.Date} </p>
                  <p className = 'event-location'>Location: {props.Location} </p>
                </div>
                <p className = 'event-description'>{props.Description}</p>
                <a href="" target="_blank">
                  <button className="event-join">JOIN!</button>
                </a>
              </div>
            </div>
            )
          })}

          <div className="spacer"></div>
      </div>
    )
  } else {
    return (
      <div className = 'events'>
        <h1>Events</h1>
          <div className="events-banner">
            <a>
              <h1>EVENTS</h1>
            </a>
          </div>
          <h3>Events Coming Soon</h3>
      </div>
  )}
  
  };

export default Events