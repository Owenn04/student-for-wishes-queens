import "./css/donation.css"
import React, { useState, useEffect } from 'react'

const Donation = () => {
  const [donateLink, setDonateLink] = useState([

  ])

  useEffect(() => {
    console.log("data fetched")
    const handleEvents = async () =>{
      const response = await fetch("http://localhost:3002/api/donation/get")
      const newDonateLink = await response.json()
      await setDonateLink(newDonateLink)
      console.log(newDonateLink)
    }
    handleEvents()
  }, [])

  return(
    <div className="donation">
      <div className="donate-banner">
          <h1>DONATE</h1>
          <p>Support our cause!</p>
      </div>

      {donateLink.map((props) => {
        return (
          <div className="donate-button">
            <a
              href={props.link}
              target="_blank"
            ><button>
              DONATE  
            </button></a>
        </div>
        )
      })}

      

      <div className="spacer"></div>
    </div>
)};

export default Donation 