import { send } from 'emailjs-com';
import {useState} from 'react';


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
        'service_hmg9sdh',
        'template_nfjugx9',
        toSend,
        'qZQcYzrxAdPr9GWWF'
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
  


  return (<div className='contact'>
    <h1>Contact</h1>
    <div className='email-form-container'>
      <form className='email-form' onSubmit={onSubmit}>
        <input type='text' name='from_name' placeholder='from name' value={toSend.from_name} onChange={handleChange}/>
        <input type='text' name='to_name' placeholder='to name' value={toSend.to_name} onChange={handleChange}/>
        <input type='text' name='message' placeholder='Your message' value={toSend.message} onChange={handleChange}/>
        <input type='text' name='reply_to' placeholder='Your email' value={toSend.reply_to} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  </div>);

  };


export default Contact