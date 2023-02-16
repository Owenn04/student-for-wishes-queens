import "./css/events.css"

import React, { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([
    {
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
      title: "Squirtle Event",
      date: "novermber 1",
      location: "queens",
      description: "yodie gang"
    },
    {
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
      title: "Charmander Event",
      date: "novermber 1",
      location: "queens",
      description: "BRURJRHRHRHHRHRH"
    }
  ])

  // I just added some preset data for testing

  useEffect(() => {
    const handleEvents = async () =>{
      const response = await fetch("url") //no url added
      const newEvents = await response.json()
      setEvents(newEvents)
    }
    handleEvents()
  }, [])
  
  // Feel Free to change this monstrocity of css. i tried

  if (events != null && events.length > 0){
    return(
      <div className='events'>
        <h1>Events</h1>
          {events.map((props) => {
            return(
            <div className = 'event-item'>
              <img className = 'event-image' src = {props.image} alt = {props.title}/>
              <span className = 'event-header'>
                <h3 className = 'event-title'>{props.title}</h3>
                <p className = 'event-date'>Date: {props.date} </p>
              </span>
              <span className = 'event-info'>
                <p className = 'event-location'>Location: {props.location} </p>
                <p className = 'event-description'>{props.description}</p>
                <button className = 'event-join-button'>Join!</button>
              </span> 
            </div>
            )
          })}
      </div>
    )
  } else {
    <div className = 'events'>
      <h1>Events</h1>
        <h3>Events Coming Soon</h3>
    </div>
  }
  
  };

export default Events