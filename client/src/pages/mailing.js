import {useState} from 'react';
import './css/mailing.css'


const Mailing = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    console.log("works") 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3002/api/mailing/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        if (response.ok) {
          setName("");
          setEmail("");
        } else {
          throw new Error("Failed to create mailing");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className = 'mailing'>
      <div className='mailing-form-container'>
        <form className='mailing-form' onSubmit = {handleSubmit}>
          <input
          className="mailing-input-box"
          placeholder = 'Name'
          type = 'text'
          value = {name}
          onChange = {handleNameChange}
          />
          <input
          className="mailing-inputbox"
          placeholder = 'email'
          type = 'text'
          value = {email}
          onChange = {handleEmailChange}
          />
          <button type = 'submit'>Sign Up!</button>
        </form>
      </div>
    </div>
  
  )
}
export default Mailing