import "./css/events.css"

import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([
    {
      image: "https://images.unsplash.com/photo-1676806995068-fe6c530423dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Placeholder Event",
      date: "March 13th 2023",
      location: "Jefferey 128",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat."
    },
    {
      image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Placeholder Event",
      date: "April 24th 2023",
      location: "Stirling Auditorium",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat."
    },
    {
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Placeholder Event",
      date: "April 17th, 2023",
      location: "Victoria Hall",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat."
    }
  ])

  useEffect(() => {
    const handleEvents = async () =>{
      const response = await fetch("url") //no url added
      const newEvents = await response.json()
      setEvents(newEvents)
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
          {events.map((props) => {
            return(
            <div className = 'event-item'>
              <img className = 'event-image' src = {props.image} alt = {props.title}/>
              <div className ="event-textitems">
                <div className="event-toptext">
                  <h1 className ="event-title">{props.title}</h1>
                  <p className = 'event-date'>Date: {props.date} </p>
                  <p className = 'event-location'>Location: {props.location} </p>
                </div>
                <p className = 'event-description'>{props.description}</p>
                <button className="event-join">JOIN!</button>
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