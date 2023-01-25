
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


function App() {
  return (
    <div className="App">
      
      
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/volunteer'>Volunteer</Link>
          <Link to='/donate'>Donate</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/volunteer' element={<Volunteer/>} />
          <Route path='/donate' element={<Donate/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
      </Router>
      


    </div>
  );
}

export default App;
