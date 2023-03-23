import { useAuth } from './../Auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import AdminBar from './components/adminBar'

const AdminEvents = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/login")
    }

    //State Values

    const [events, setEvents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const [showCreate, setShowCreate] = useState(false)

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState(null)


    useEffect(() => {
        console.log("data fetched")
        const handleAdmin = async () =>{
            const response = await fetch("http://localhost:3002/api/events/get")
            const newEvents = await response.json()
            await setEvents(newEvents)
            console.log(newEvents)
        }
        handleAdmin()
    }, [])

    const deleteEvent = (Id)=>{
        fetch(`http://localhost:3002/api/events/delete/${Id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response)
            alert("Event Deleted")
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditClick = (props) => {
        setSelectedId(props.Id)
        setTitle(props.Title)
        setDate(props.Date)
        setDescription(props.Description)
        setLocation(props.Location)
        setImage(props.Image)
        setShowForm(true)
      }

    const handleCreateClick = () => {
        setTitle('')
        setDate('')
        setDescription('')
        setLocation('')
        setImage(null)
        setShowCreate(true)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log("submit went through")

        const formData = new FormData()
        formData.append("title", title)
        formData.append("date", date)
        formData.append("description", description)
        formData.append("location", location)
        formData.append("image", image)
        //Must pass 'formData' as the body as Json does not work with files.

        const response = await fetch(`http://localhost:3002/api/events/put/${selectedId}`,{
            method: "PUT",
            body: formData,
        })

        if (response.status === 200) {
          alert("Row Updated")
          window.location.reload()
        } else {
          console.log("Error")
        }
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        console.log("func called H")
        const formData = new FormData()
        formData.append("Title", title)
        formData.append("Date", date)
        formData.append("Description", description)
        formData.append("Location", location)
        formData.append("Image", image)

        const response = await fetch("http://localhost:3002/api/events/create",{
            method: "POST",
            body: formData,
        })

        if (response.status === 200) {
          alert("Row Updated")
          console.log(image)
          window.location.reload()
        } else {
          console.log("Error")
        }
    
    }


    return(
        <div>
            <AdminBar/>
            {showForm && (
                    <form onSubmit={handleEdit}>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Date:</label>
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                        <label>Desciption:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label>Location:</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        
                        <label>Image:</label>
                        <input
                            type="file"
                            id="file"
                            accept=".jpg"
                            onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                            }}
                        />
                        
                        <button type="submit">Save</button>
                        <button onClick={() => setShowForm(false)}>x</button>
                    </form>
            )}

            {showCreate && (
                    <form onSubmit={handleCreateUser}>
                        <label>Title:</label>
                        <br/>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <br/>
                        <label>Date:</label>
                        <br/>
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
                        <br/>
                        <label>Description:</label>
                        <br/>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <br/>
                        <label>Location:</label>
                        <br/>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <br/>
                        <label>Image:</label>
                        <br/>
                        <input type="file" id="file" accept=".jpg" onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                                }}/>
                        <br/>
                        <button className='button' onClick={() => setShowCreate(false)}>Close</button>
                        <button className="button" type="submit">Create User</button>
                    </form>
                )}
            {!showCreate && !showForm && (<button className='button' onClick={() => handleCreateClick()}>Create Event</button>)}
            <div className="table-container">
            <table table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Image</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((props) => {
                        return(
                            <tr key = {props.Id}>
                                <td>{props.Id}</td>
                                <td>{props.Title}</td>
                                <td>{props.Date}</td>
                                <td>{props.Description}</td>
                                <td>{props.Location}</td>
                                <td><img className = 'image is-32x32' src={require(`../images/${props.Image}`)} alt="Image"/></td>
                                <td>{props.Action}</td>
                                <td>
                                    <button className='button' onClick={() => deleteEvent(props.Id)} >Delete</button>
                                    <button className='button'>Show</button>
                                    <button className='button' onClick={() => handleEditClick(props)} >Edit</button>
                                </td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
        </div>
        <button onClick = {handleLogout} className="button">Logout</button>
        <div className="spacer"></div>
        </div>
        
    )
}

export default AdminEvents