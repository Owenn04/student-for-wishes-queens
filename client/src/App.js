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
import AdminEvents from './pages/adminEvents'
import AdminStaff from './pages/adminStaff'
import AdminConnect from './pages/adminConnect'

import PrivateRoute from './Auth/PrivateRoute'
import { AuthProvider} from './Auth/AuthContext';

import Sidebar from './Sidebar';
import { slide as Menu } from 'react-burger-menu';



function App() {
  return (
    <div className="App">
      <div className="sidebar-container">
      {/* <div id="outer-container"> */}
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="page-wrap">

          </div>
      </div>

      <div className='header'>
        <a href = "/home"><img src={require(`./sfwq-white.png`)}/></a>
      </div>

      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/connect" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mailing" element={<Mailing />} />
            <Route path = "/login" element = {<Login/>}/>
            
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}/>
            
            <Route path="/admin/events" element={<PrivateRoute><AdminEvents /></PrivateRoute>} />
            <Route path="/admin/connect" element={<PrivateRoute><AdminConnect/></PrivateRoute>} />
              
            <Route path='/admin/staff' element = {<PrivateRoute><AdminStaff/></PrivateRoute>}/>
            
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

//<Routes>
  //<Route path = '/admin/events' element = {<AdminEvents/>}/>
  //<Route path = '/admin' element = {<Admin/>}/>
//</Routes>




//<PrivateRoute path="/admin" element={<Admin />} />

//<Route path="/login" component={<PrivateRoute />} />


export default App;
