import "./css/events.css"

import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([
    {
      image: "https://images.unsplash.com/photo-1676806995068-fe6c530423dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Placeholder Event",
      date: "March 13th 2023",
      location: "Jefferey 128",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat.",
      link: "http://www.zuofx.xyz"
    },
    {
      image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Placeholder Event",
      date: "April 24th 2023",
      location: "Stirling Auditorium",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat.",
      link: "http://www.zuofx.xyz"
    },
    {
      image: "https://images.unsplash.com/photo-1677058569057-675cb6f0e4d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      title: "Placeholder Event",
      date: "April 17th, 2023",
      location: "Victoria Hall",
      description:"Short blurb for placeholder",
      link: "http://www.zuofx.xyz"
    }
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
          <a>
            <h1>EVENTS</h1>
          </a>
        </div>
        
          {events.map((props) => {
            return(
            <div key = {props.Id} className = 'event-card-holder'>

              <div className = "event-card-main">
                <div className = "event-elements">
                  <img src={props.Image}></img>
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