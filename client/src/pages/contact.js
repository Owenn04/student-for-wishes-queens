import { send } from 'emailjs-com';
import {useState} from 'react';
import "./css/contact.css"

const Contact = () => {
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
  


  return (
    <div className='contact'>
      <div className="contact-banner">
          <a>
            <h1>CONTACT US</h1>
          </a>
      </div>
      <div className='email-form-container'>
        <form className='email-form' onSubmit={onSubmit}>
          <h1>Full Name:</h1>
          <input className="email-inputbox" type='text' name='from_name' placeholder='Full Name' value={toSend.from_name} onChange={handleChange}/>

          <h1>Email:</h1>
          <input className="email-inputbox" type='text' name='reply_to' placeholder='Your email' value={toSend.reply_to} onChange={handleChange}/>
          {/* <input className="email-inputbox" type='text' name='to_name' placeholder='to name' value={toSend.to_name} onChange={handleChange}/> */}

          <h1>Message</h1>
          <textarea className="email-msgbox" type='text' rows="20" name='message' placeholder='Your message' value={toSend.message} onChange={handleChange}/>
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div className = "spacer"></div>
    </div>);

  };


export default Contact