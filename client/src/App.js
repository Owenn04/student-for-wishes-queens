
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
 } from "react-router-dom";

import Home from './pages/home'
import About from './pages/about.js'
import Volunteer from './pages/volunteer.js'
import Donate from './pages/donation.js'
import Contact from './pages/contact'
import Events from './pages/events';
import Mailing from './pages/mailing'
import "./App.css"


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/volunteer' element={<Volunteer/>} />
          <Route path='/donate' element={<Donate/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/events' element={<Events/>} />
          <Route path='/mailing' element={<Mailing/>} />
        </Routes>
      </Router>
      


    </div>
  );
}

export default App;
