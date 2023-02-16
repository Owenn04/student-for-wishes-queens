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

  const handleSubscribe = async (e) => {
    await fetch("http://localhost:3001/mailing", { //no url yet
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email
      })
        .then((res) => res.json())
        .then(setName(""))
        .then(setEmail(""))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubscribe()
  }



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