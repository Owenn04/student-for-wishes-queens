import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu right>
        <img src="./sfwq-white.png"/>

        <div className="mailing-list">
            <a className="menu-item" href="/mailing">
                Join our Mailing List!
            </a>
            <div className="divider"></div>
        </div>

        <a className="menu-item" href="/home">
            Home
        </a>

        <a className="menu-item" href="/about">
            About Us
        </a>

        <a className="menu-item" href="/events">
            Events
        </a>

        <a className="menu-item" href="/volunteer">
            Volunteer
        </a>
        
        <a className="menu-item" href="/donate">
            Donate
        </a>

        <a className="menu-item" href="/connect">
            Connect
        </a>

    </Menu>
  );
};
