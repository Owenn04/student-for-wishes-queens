import "./css/events.css"

import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([

  ])

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
          <a href = '#'>
            <h1>EVENTS</h1>
          </a>
        </div>
        
          {events.map((props) => {
            console.log(props)
            return(
            <div key = {props.Id} className = 'event-card-holder'>

              <div className = "event-card-main">
                <div className = "event-elements">
                <img src={require(`../images/${props.Image}`)} alt="Image"/>
                  <div className="event-txts">
                    <h1>{props.Title}</h1>
                    <div className = "events-txts-sub"><span>Location:</span> {props.Location} -
                    <span> Date:</span> {props.Date}</div>
                    <p>{props.Description}</p>

                    <div className="event-button">
                      <a href={props.link} target="_blank">
                        <button>REGISTER</button>
                      </a>
                    </div>
                    
                  </div>
                </div>

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
          <div className="events-banner">
            <a>
              <h1>EVENTS</h1>
            </a>
          </div>
          <h1>We have no events to display currently, check back soon!</h1>
          <div className="spacer"></div>
      </div>
  )}
  
  };

export default Events