import { send } from 'emailjs-com';
import { useState, useEffect } from 'react';

import "./css/volunteer.css"

const Volunteer = () => {

  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
    });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        toSend,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setToSend({from_name: '', to_name: '', message: '', reply_to: ''});
    })
    .catch((err) => {
        console.log('FAILED...', err);
    })
  };
    
  const handleChange = (e) => {
    setToSend({...toSend, [e.target.name]: [e.target.value]});
  };

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
  
  // if (events.length < 0){
  if (events != null && events.length > 0){
    return(
      <div className = "volunteer">
        <div className="volunteer-banner">
          <a>
            <h1>VOLUNTEER</h1>
          </a>
        </div>
  
        <div className='volunteer-form-container'>
          <form className='volunteer-form' onSubmit={onSubmit}>
            <h1>Full Name:</h1>
            <input className="volunteer-inputbox" type='text' name='from_name' placeholder='Full Name' value={toSend.from_name} onChange={handleChange}/>
  
            <h1>Email:</h1>
            <input className="volunteer-inputbox" type='text' name='reply_to' placeholder='Your email' value={toSend.reply_to} onChange={handleChange}/>
  
            <h1>Message</h1>
            <p>Please ensure that you state which event you would like to volunteer for.</p>
            <textarea className="volunteer-msgbox" type='text' rows="5" name='message' placeholder='Your message' value={toSend.message} onChange={handleChange}/>
            <button type='submit'>Submit</button>
          </form>
        </div>

        
        <div className="vevent-cards">
          <h1>Available Events:</h1>
        {events.map((props) => {
            return(
            <div key = {props.Id} className = 'vevent-card-holder'>
              <div className = "vevent-card-main">
                <div className = "vevent-elements">
                  <img src={require(`../images/${props.Image}`)} alt="Image"></img>
                  <div className="vevent-txts">
                    <h1>{props.Title}</h1>
                    <div className = "vevents-txts-sub"><span>Location:</span> {props.Location} -
                    <span> Date:</span> {props.Date}</div>
                    <p>{props.Description}</p>

                    {/* <div className="vevent-button">
                      <a href={props.link} target="_blank">
                        <button>VOLUNTEER</button>
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            )
        })}
        </div>
  
        <div className = "spacer"></div>
      </div>
    )
  }else {
    return(
      <div className = "volunteer">
        <div className="volunteer-banner">
          <a>
            <h1>VOLUNTEER</h1>
          </a>
        </div>
  
        <div className='volunteer-form-container'>
          <form className='volunteer-form' onSubmit={onSubmit}>
            <h1>Full Name:</h1>
            <input className="volunteer-inputbox" type='text' name='from_name' placeholder='Full Name' value={toSend.from_name} onChange={handleChange}/>
  
            <h1>Email:</h1>
            <input className="volunteer-inputbox" type='text' name='reply_to' placeholder='Your email' value={toSend.reply_to} onChange={handleChange}/>
  
            <h1>Message</h1>
            <p>Please ensure that you state which event you would like to volunteer for.</p>
            <textarea className="volunteer-msgbox" type='text' rows="5" name='message' placeholder='Your message' value={toSend.message} onChange={handleChange}/>
            <button type='submit'>Submit</button>
          </form>
        </div>

        <div className="vevent-cards">
          <h1>No events available right now.</h1>
        </div>
  
        <div className = "spacer"></div>
      </div>
    )
    
  }
};

export default Volunteer