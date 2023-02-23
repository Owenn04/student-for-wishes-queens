import {useState} from 'react';


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
  <div className='/mailing'>
      <form onSubmit = {handleSubmit}>
        <input
        placeholder = 'Name'
        type = 'text'
        value = {name}
        onChange = {handleNameChange}
        />
        <input
        placeholder = 'email'
        type = 'text'
        value = {email}
        onChange = {handleEmailChange}
        />
        <button type = 'submit'>Sign Up!</button>
      </form>
  </div>
  )
}
export default Mailing