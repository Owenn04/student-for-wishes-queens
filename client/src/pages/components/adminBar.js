import React from "react"

const AdminBar = () =>{
    return(
        <nav className="navbar-start" role="navigation" aria-label="main navigation">
                <div className="navbar-start">
                    <a href = "/admin" className = 'navbar-item'>Users</a>
                    <a href = "/admin/events" className = 'navbar-item'>Events</a>
                    <a href = "/admin/staff" className = 'navbar-item'>Staff</a>
                    <a href = "/admin/connect" className = 'navbar-item'>Connect Links</a>
                </div>  
        </nav>
    )
}

export default AdminBar