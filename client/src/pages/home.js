import "./css/home.css"
import React, { useState, useEffect } from "react"

const Home = () => {

  const [people, setPeople] = useState([
    { // NOTE: Used chatgpt to generate some placeholder people
      name: "Sarah Davis",
      role: "President",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      blurb: "A visionary leader with a passion for empowering marginalized communities."
    },
    {
      name: "Jordan Patel",
      role: "Vice-President",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      blurb: "A dedicated and experienced executive with a strong commitment to making a positive impact on the world."
    },
    {
      name: "Lauren Nguyen",
      role: "Events",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      blurb: "A master of operations with a talent for optimizing processes and systems."
    },
    {
      name: "Michael Thompson",
      role: "Marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      blurb: "A creative and innovative marketer with a talent for building brand awareness and engagement. "
    },
    {
      name: "James Carter",
      role: "Finance",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      blurb: "A highly analytical and strategic thinker with a track record of driving financial success."
    },
  ])

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

        <div className="card-holder">
        {people.map((props) => {
          return (
            <div className="card-main">
              <img src={props.image} ></img>
              <div className="card-txts">
                <h1>{props.name} | <span>{props.role}</span></h1>
                <p>{props.blurb}</p>
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