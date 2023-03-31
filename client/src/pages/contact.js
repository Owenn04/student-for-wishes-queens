import React, { useState, useEffect } from 'react'
import "./css/contact.css"

const Contact = () => {

  // const [tiles, setTiles] = useState([
  //   {
  //     id: "1",
  //     image: "https://images.unsplash.com/photo-1634942536790-dad8f3c0d71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdGFncmFtJTIwbG9nb3xlbnwwfHwwfHw%3D&w=1000&q=80",
  //     title: "Instagram",
  //     link: "https://www.instagram.com/queenss4wishes/"
  //   },
  //   {
  //     id: "2",
  //     image: "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
  //     title: "Facebook",
  //     link: "https://www.facebook.com/MakeAWish.StudentsforWishesQueens"
  //   },
  //   {
  //     id: "3",
  //     image: "https://vectorlogoseek.com/wp-content/uploads/2018/09/make-a-wish-vector-logo.png",
  //     title: "Make-A-Wish Foundation Canada",
  //     link: "https://makeawish.ca/"
  //   },
  //   {
  //     id: "4",
  //     image: "https://images.unsplash.com/photo-1677058569057-675cb6f0e4d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  //     title: "Placeholder Card",
  //     link: "http://www.zuofx.xyz"
  //   }
  // ])

  // useEffect(() => {
    
  // }, [])

  useEffect(() => {
    const handleAdmin = async () =>{
      const tiles = await fetch("http://localhost:3002/api/connect/get")
      const tiles_returned = await tiles.json()
      await setTiles(tiles_returned)
      console.log(tiles_returned);
    }
    handleAdmin()
  }, [])
  const [tiles, setTiles] = useState([])
  
  // if (cards == null){
  if (tiles != null && tiles.length > 0){
    return (
      <div className='contact'>
        <div className="contact-banner">
            <a>
              <h1>CONNECT</h1>
            </a>
        </div>

        <div className="contact-cards">
        {tiles.map((props) => {
              return(
              <div className="contact-main">
                <a 
                  key = {props.id} 
                  className = 'contact-card'
                  href={props.link}
                  target="_blank"
                >
                    <img 
                    src={require(`../images/${props.image}`)}
                    />
                    <h1>{props.title}</h1>
                </a>
              </div>
              )
        })}
        </div>
      
        <div className = "spacer"></div>
      </div>);
  }else {
    return (
      <div className='contact'>
        <div className="contact-banner">
            <a>
              <h1>CONNECT</h1>
            </a>
        </div>
  
        <h1 className="no-data">Nothing to display here, check back later.</h1>
      
        <div className = "spacer"></div>
      </div>);
  }
  

  };


export default Contact