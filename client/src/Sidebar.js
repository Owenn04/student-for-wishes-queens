import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu right>
        <img src="./sfwq-white.png"/>

        <a className="menu-item" href="/home">
            Home
        </a>

        <a className="menu-item" href="/about">
            About
        </a>

        <a className="menu-item" href="/volunteer">
            Volunteer
        </a>
        
        <a className="menu-item" href="/donate">
            Donate
        </a>

        <a className="menu-item" href="/contact">
            Contact
        </a>

        <a className="menu-item" href="/events">
            Events
        </a>

        <div className="mailing-list">
            <a className="menu-item" href="/mailing">
                Join our Mailing List!
            </a>
        </div>
    </Menu>
  );
};
