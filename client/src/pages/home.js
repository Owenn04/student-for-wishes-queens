import "./css/home.css"
import React, { useState, useEffect } from "react"

const Home = () => {

  useEffect(() => {
    const handleAdmin = async () =>{
      const staff = await fetch("http://localhost:3002/api/staff/limit")
      const people_returned = await staff.json()
      await setPeople(people_returned)
      console.log(people_returned);
    }
    handleAdmin()
  }, [])
  const [people, setPeople] = useState([])

  if (people != null && people.length > 0) {
    return (
      <div className='home'>
        <div className="home-banner">
          <a>
            <div className="home-h1">
              <h1><span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span></h1>
            </div>
            <p>TO THE OFFICIAL STUDENTS FOR WISHES QUEEN'S UNIVERSITY WEBSITE</p>
          </a>
        </div>

        <div className="home-textbox">
          <h1>WHO ARE WE?</h1>
          <p>
            Students for Wishes Queen’s University strives to raise money and awareness in the Kingston and Queen’s community to help create life-changing wishes for children with critical illnesses. 
            Help us in reaching our goals and supporting the children in the community by getting involved in our events or donating today!
          </p>
        </div>

        <h1 className="people">
          PEOPLE
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

        <a href="about">
          <button className="viewmore" href="/about">VIEW MORE</button>
        </a>
        {/* end spacer */}
        <div className = "spacer"></div>
    
      </div>
    )} else {
      return (
      <div className='home'>
        <div className="home-banner">
          <a>
            <h1><span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span></h1>
            <p>TO THE OFFICIAL STUDENTS FOR WISHES QUEEN'S UNIVERSITY WEBSITE</p>
          </a>
        </div>

        <div className="home-textbox">
          <h1>BOX FOR TEXT</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat.</p>
        </div>

        <div>
          <h1>There seems to be nothing to show here.</h1>
        </div>

        {/* end spacer */}
        <div className = "spacer"></div>
    
      </div>
    )}
};

export default Home