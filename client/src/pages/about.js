import "./css/about.css"
import React, { useState, useEffect } from "react"

const About = () => {
  useEffect(() => {
    console.log("data fetched")
    const handleAdmin = async () =>{
      const staff = await fetch("http://localhost:3002/api/staff/get")
      const people_returned = await staff.json()
      await setPeople(people_returned)
      console.log(people_returned);
    }
    handleAdmin()
  }, [])
  const [people, setPeople] = useState([])
  /*
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
      blurb: "A creative and innovative marketer with a talent for building brand awareness and engagement."
    },
    {
      name: "James Carter",
      role: "Finance",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      blurb: "A highly analytical and strategic thinker with a track record of driving financial success."
    },
    {
      name: "Thomas Conners",
      role: "Club Mascot",
      image: "https://images.unsplash.com/photo-1554144261-4362af4451fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1hc2NvdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
      blurb: "Always keeping the hype up!"
    },
    {
      name: "Will MacInnis",
      role: "Web Team-Lead",
      image: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
      blurb: "Best Team-Lead 2023"
    },
    {
      name: "Huy Truong",
      role: "Web Front-End",
      image: "https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      blurb: "Best Front-End 2023"
    },
    {
      name: "Evan Cook",
      role: "Web Back-End",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      blurb: "1/2 Best Back-End Duo 2023"
    },
    {
      name: "Owen Sawler",
      role: "Web Back-End",
      image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      blurb: "2/2 Best Back-End Duo 2023"
    }
  ])
  */
  if  (people != null && people.length > 0) {
    return (
      <div className='about'>
        <div className="about-banner">
          <a>
            <h1>ABOUT US</h1>
          </a>
      </div>

        <div className="home-textbox">
          <h1>WHAT DO WE DO?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend. Diam donec adipiscing tristique risus. Tellus pellentesque eu tincidunt tortor aliquam. Nec feugiat nisl pretium fusce id. Sagittis purus sit amet volutpat consequat. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Etiam erat velit scelerisque in dictum non consectetur a erat.</p>
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
        <div className = "spacer"></div>
    
      </div>
    )} else {
      return (
      <div className='home'>
        <div className="home-banner">
        <div className="contact-banner">
          <a>
            <h1>ABOUT US</h1>
          </a>
      </div>
        </div>

        <div className="home-textbox">
          <h1>WHAT DO ME DO?</h1>
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

export default About