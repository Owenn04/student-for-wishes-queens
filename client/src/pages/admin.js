import { useAuth } from './../Auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import AdminBar from './components/adminBar'

import "./css/admin.css"

const Admin = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/login")
    }

    //State Values

    const [users, setUsers] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    const [donateLink, setDonateLink] = useState('')
    const [oldDonate, setOldDonate] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentFrom, setCurrentForm] = useState('none')
    const [created, setCreated] = useState('')
    const [updated, setUpdated] = useState('')
    const [lastLogin, setLastLogin] = useState('')

    const deleteUser = (id)=>{
        fetch(`http://localhost:3002/api/users/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response)
            alert("User Deleted")
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        console.log("submit went through")
        const response = await fetch(`http://localhost:3002/api/users/put/${selectedId}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role, updated: new Date().toISOString().substring(0,10) }),

            //right now it creates a new date object but we only want first half
        })
        if (response.status === 200) {
          alert("Row Updated")
          window.location.reload()
        } else {
          console.log("Error")
        }
    }

    

    const updateDonateLink = async(e) => {
        e.preventDefault();
        console.log("submitted")
        const response = await fetch(`http://localhost:3002/api/donation/put`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ donateLink }),

        })
        if (response.status === 200) {
            console.log(donateLink)
            alert("Donate Link Updated.")
            window.location.reload()
          } else {
            console.log("Error")
          }
    }

      const handleEditClick = (props) => {
        setSelectedId(props.id)
        setName(props.name)
        setEmail(props.email)
        setRole(props.role)
        setCreated(props.created)
        setCurrentForm("edit")
      }

      const handleViewClick = (props) => {
        setSelectedId(props.id)
        setName(props.name)
        setEmail(props.email)
        setRole(props.role)
        setCreated(props.created)
        setUpdated(props.updated)
        setLastLogin(props.last_login)
        setCurrentForm("view")
      }

      const handleCreateUser = async (e) => {
        
      }
      const handleCreateClick = () => {
        setName('')
        setEmail('')
        setRole('')
        setPassword('')
        setConfirmPassword('')
        setCurrentForm("create")
      }
    
    useEffect(() => {
        console.log("data fetched")
        const handleAdmin = async () =>{
            const response = await fetch("http://localhost:3002/api/users/get")
            const newUsers = await response.json()
            await setUsers(newUsers)
            console.log(newUsers)

            const donate = await fetch("http://localhost:3002/api/donation/get")
            const newDonate = await donate.json()
            await setDonateLink(newDonate[0]["link"])
            await setOldDonate(newDonate[0]["link"])
        }
        handleAdmin()
    }, [])


    if (users != null && users.length > 0){
        return(
            <div>
                <AdminBar/>
                <div className="all-forms">
                    {(currentFrom === "edit") && (
                        <form className="edit-form" onSubmit={handleEdit}>
                            <h1>Editing User ID <span>{selectedId}</span></h1>

                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Role:</label>
                            <div className="edit-gr">
                                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div className="edit-buttons">
                                <button className="edit-save" type="submit">Save</button>
                                <button className="edit-close" onClick={() => setCurrentForm("none")}>X</button>
                            </div>
                            

                        </form>
                    )}
                    {currentFrom === "create" && (
                        <form className="create-form" onSubmit={handleCreateUser}>
                            <h1>Creating a new User</h1>
                            <label>Name:</label>
                            <br/>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <br/>
                            <label>Email:</label>
                            <br/>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <br/>
                            <label>Password:</label>
                            <br/>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <br/>
                            <label>Confirm Password:</label>
                            <br/>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <br/>
                            <label>Role:</label>
                            <br/>
                            <input type="text" value={role} onChange={(e) => setRole(e.target.value)}/>
                            <br/>
                            <div className="create-buttons">
                                <button className="create-create" type="submit">Create User</button>
                                <button className='create-close' onClick={() => setCurrentForm("none")}>X</button>
                            </div>      
                        </form>
                    )}
                    {currentFrom == "view" && (
                        <div className="box">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{name}'s Information</th>
                                        <th>
                                            <a className="button" href="../admin">
                                                <span>Close</span>
                                                <span className="icon-text">
                                                    <span className="icon">
                                                        <i class="fa-solid fa-reply-all"></i>
                                                    </span>
                                                </span>
                                            </a>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan='2'>
                                            <p><strong>{name}</strong></p>
                                            <br/>
                                            <a href={email}>{email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>ID</strong></td>
                                        <td>{selectedId}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Name</strong></td>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email</strong></td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Role</strong></td>
                                        <td>{role}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Created On</strong></td>
                                        <td>{created}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Updated On</strong></td>
                                        <td>{updated}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Last Login</strong></td>
                                        <td>{lastLogin}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            
                        </div>)}
                </div>
                
                    <Outlet/>
                    {currentFrom == "none" && (<button className='create-user-button' onClick={() => handleCreateClick()}>Create User</button>)}
                    <div className="table-container">
                        <table table className="table">
                            <thead>
                                <tr>
                                    {Object.getOwnPropertyNames(users[0]).map((props) => {
                                        return (<th key={props}>{props.toUpperCase().replace(/_/g, " ")}</th>)
                                    })}
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((props) => {
                                    return(
                                        <tr key = {props.id}>
                                            <td>{props.id}</td>
                                            <td>{props.name}</td>
                                            <td>{props.email}</td>
                                            <td>{props.role}</td>
                                            <td>{props.created}</td>
                                            <td>{props.updated}</td>
                                            <td>{props.last_login}</td>
                                            <td>
                                                <button className='button' onClick={() => deleteUser(props.id)}>Delete</button>
                                                <button className='button' onClick={() => handleViewClick(props)}>Show</button>
                                                <button className='button' onClick={() => handleEditClick(props)}>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                
                {(
                <div className="donations">
                    <h1>Update the DONATIONS Button:</h1>
                    <p>(!) This will change where <span><a href="/donate">the donation page</a></span> button takes a user when pressed.
                        <br/>Links are formatted as: http://example.com, ensure http:// or https:// is included.
                    </p>
                    <form className="donations-form" onSubmit={updateDonateLink}>
                        <input type="url" value={ donateLink } onChange={(e) => setDonateLink(e.target.value)}></input>
                        <button type="submit" className="button">Save</button>
                        <h2>Current Link: <span><a>{ oldDonate }</a></span></h2>
                    </form>
                </div>
                )}

                <button onClick = {handleLogout} className="button">Logout</button>
                <div className="spacer"></div>
            </div>
        )} else{
        return(
            <div>
                <h1>This is the admin panel !!!</h1>
                <button onClick = {handleLogout}>Logout</button>
            </div>
        )
    }
        
    
}

export default Admin