import { useAuth } from './../Auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import "./css/adminEvents.css"

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
    const [link, setLink] = useState("")
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
        setLink(props.Link)
        setImage(props.Image)
        setShowForm(true)
      }

    const handleCreateClick = () => {
        setTitle('')
        setDate('')
        setDescription('')
        setLocation('')
        setLink('')
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
        formData.append("Link", link)
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
        formData.append("Link", link)
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
                    <form className="event-form" onSubmit={handleEdit}>
                        <h1>Editing Event: <span>{title}</span></h1>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Date:</label>
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                        <label>Desciption:</label>
                        <textarea type="text" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label>Location:</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <label>Link:</label>
                        <p>
                            Required Format for links: https://www.example.com 
                            <br/> 
                            'https://' is required, 'www.' is not.
                        </p>
                        <input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
                        
                        <label>Image:</label>
                        <input
                            type="file"
                            id="file"
                            accept=".jpg,.png,.jpeg,.JPG"
                            onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                            }}
                        />
                        <div className="event-buttons">
                            <button className="event-save" type="submit">Save</button>
                            <button className="event-close" onClick={() => setShowForm(false)}>X</button>
                        </div>
                        
                    </form>
            )}

            {showCreate && (
                    <form className="event-form" onSubmit={handleCreateUser}>
                        <h1><span>Creating a new event</span></h1>
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
                        <textarea type="text" className="event-form-des" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <br/>
                        <label>Location:</label>
                        <br/>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <br/>
                        <label>Link:</label>
                        <p>
                            Required Format for links: https://www.example.com 
                            <br/> 
                            'https://' is required, 'www.' is not.
                        </p>
                        <br/>
                        <input type="url" value={link} onChange={(e) => setLink(e.target.value)}/>
                        <br/>
                        <label>Image:</label>
                        <br/>
                        <input type="file" id="file" accept=".jpg,.png,.jpeg,.JPG" onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                                }}/>
                        <br/>
                        <div className="event-buttons">
                            <button className="event-save" type="submit">Create Event</button>
                            <button className='event-close' onClick={() => setShowCreate(false)}>X</button>
                        </div>
                        
                    </form>
                )}
            {!showCreate && !showForm && (<button className='create-event-button' onClick={() => handleCreateClick()}>Create Event</button>)}
            <div className="table-container">
            <table table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Link</th>
                        <th>Image</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((props) => {
                        return(
                            <tr className="event-table" key = {props.Id}>
                                <td>{props.Id}</td>
                                <td>{props.Title}</td>
                                <td>{props.Date}</td>
                                <td className="description">{props.Description}</td>
                                <td>{props.Location}</td>
                                <td className="link"><a>{props.Link}</a></td>
                                <td><img className = 'image is-32x32' src={require(`../images/${props.Image}`)} alt="Image"/></td>
                                <td>{props.Action}</td>
                                <td>
                                    <button className='button' onClick={() => deleteEvent(props.Id)} >Delete</button>
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