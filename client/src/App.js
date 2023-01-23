
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
 } from "react-router-dom";

import Home from './pages/home'
import About from './pages/about.js'


function App() {
  return (
    <div className="App">
      
      
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/donate'>Donate</Link>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </Router>
      


    </div>
  );
}

export default App;
