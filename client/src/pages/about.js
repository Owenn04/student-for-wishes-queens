import "./css/about.css"
import React, { useState, useEffect } from "react"

const About = () => {
  useEffect(() => {
    const handleAdmin = async () =>{
      const staff = await fetch("http://localhost:3002/api/staff/get")
      const people_returned = await staff.json()
      await setPeople(people_returned)
      console.log(people_returned);
    }
    handleAdmin()
  }, [])
  const [people, setPeople] = useState([])
  return (
      <div className='about'>
        <div className="about-banner">
          <a>
            <h1>ABOUT US</h1>
          </a>
        </div>

        <div className="home-textbox">
          <h1>WHAT DO WE DO?</h1>
          <p>Students for Wishes is the Queen’s University student-run Kingston branch of Make-A-Wish Eastern Ontario.
            Our goal is to grant the wishes of local Kingston children between the ages of 3 to 17 with critical medical
            conditions in order to fill their lives with hope, strength, and joy. Our branch strives to promote
            awareness of the foundation within the Kingston community by hosting events to help raise funds for granting
            wishes. We focus tremendously on creating great connections between Queen’s students and the Kingston
            community.</p>
        </div>

        <h1 className="people-ab">
          MEET THE TEAM
        </h1>

        <div className="card-holder-ab">
          {people.map((props) => {
            return (
                <div className="card-main-ab">
                  <img src={props.Image} ></img>
                  <div className="card-txts-ab">
                    <h1>{props.Name} | <span>{props.Job}</span></h1>
                    <p>{props.Bio}</p>
                  </div>
                </div>
            )
          })}
        </div>
        {/* end spacer */}
        <div className="spacer"></div>

      </div>
  );
}
export default About