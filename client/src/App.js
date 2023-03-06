import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about.js';
import Volunteer from './pages/volunteer.js';
import Donate from './pages/donation.js';
import Contact from './pages/contact';
import Events from './pages/events';
import Mailing from './pages/mailing';
import './App.css';

import Login from './Auth/login';
import Admin from './pages/admin';
import PrivateRoute from './Auth/PrivateRoute'
import { AuthProvider} from './Auth/AuthContext';

import Sidebar from './Sidebar';
import { slide as Menu } from 'react-burger-menu';



function App() {
  return (
    <div className="App">
      <div id="outer-container">
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="page-wrap">

          </div>
      </div>

      <div className='header'>
        <a href = "/home"><img src="./sfwq-white.png"/></a>
      </div>

      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mailing" element={<Mailing />} />
            <Route path = "/login" element = {<Login/>}/>
            <Route
              path = "/admin"
              element={
                <PrivateRoute>
                  <Admin/>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}





//<PrivateRoute path="/admin" element={<Admin />} />

//<Route path="/login" component={<PrivateRoute />} />


export default App;
