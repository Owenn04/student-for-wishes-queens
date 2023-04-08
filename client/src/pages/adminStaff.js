import { useAuth } from './../Auth/AuthContext'
import React, { useState, useEffect } from 'react'
import AdminBar from './components/adminBar'
import { Outlet, useNavigate } from 'react-router-dom'
import "./css/adminStaff.css"

const AdminStaff= () => {

    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/login")
    }

    //State Values

    const [staff, setStaff] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const [showCreate, setShowCreate] = useState(false)

    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
        console.log("data fetched for staff")
        const handleAdmin = async () =>{
            const response = await fetch("http://localhost:3002/api/staff/get")
            const newStaff = await response.json()
            await setStaff(newStaff)
            console.log(newStaff)
        }
        handleAdmin()
    }, [])

    const deleteStaff = (id)=>{
        fetch(`http://localhost:3002/api/staff/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response)
            alert("Staff Member Killed ;/")
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditClick = (props) => {
        setSelectedId(props.id)
        setName(props.name)
        setJob(props.job)
        setBio(props.bio)
        setImage(props.image)
        setShowForm(true)
      }

    const handleCreateClick = () => {
        setName('')
        setJob('')
        setBio('')
        setImage(null)
        setShowCreate(true)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log("submit went through")

        const formData = new FormData()
        formData.append("name", name)
        formData.append("job", job)
        formData.append("bio", bio)
        formData.append("image", image)
        //Must pass 'formData' as the body as Json does not work with files.

        const response = await fetch(`http://localhost:3002/api/staff/put/${selectedId}`,{
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

    const handleCreateStaff = async (e) => {
        e.preventDefault()
        console.log("func called")
        const formData = new FormData()
        formData.append("name", name)
        formData.append("job", job)
        formData.append("bio", bio)
        formData.append("image", image)

        const response = await fetch("http://localhost:3002/api/staff/create",{
            method: "POST",
            body: formData,
        })

        if (response.status === 200) {
          alert("Row Updated")
          window.location.reload()
        } else {
          console.log("Error")
        }
    
    }



    return(
        <div>
            <AdminBar/>
            {showForm && (
                    <form className="staff-form" onSubmit={handleEdit}>
                        <h1>Editing Staff: <span>{name}</span></h1>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label>Job:</label>
                        <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
                        <label>Bio:</label>
                        <textarea type="text" rows="5" value={bio} onChange={(e) => setBio(e.target.value)} />
                        
                        <label>Image:</label>
                        <input type="file" id="file" accept=".jpg,.png,.jpeg,.JPG" onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                                }}/>
                        <div className="staff-buttons">
                            <button className="staff-save" type="submit">Save</button>
                            <button className="staff-close" onClick={() => setShowForm(false)}>X</button>
                        </div>
                        
                    </form>
            )}

            {showCreate && (
                    <form className="staff-form" onSubmit={handleCreateStaff}>
                        <h1><span>Creating a new staff member</span></h1>
                        <label>Name:</label>
                        <br/>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        <br/>
                        <label>Job:</label>
                        <br/>
                        <input type="text" value={job} onChange={(e) => setJob(e.target.value)}/>
                        <br/>
                        <label>Bio:</label>
                        <br/>
                        <textarea type="text" className="staff-form-des" rows="5" value={bio} onChange={(e) => setBio(e.target.value)}/>
                        <br/>
                        
                        <label>Image:</label>
                        <br/>
                        <input type="file" id="file" accept=".jpg,.png,.jpeg,.JPG" onChange={e => {
                                const image = e.target.files[0]
                                setImage(image)
                                }}/>
                        <br/>
                        <div className="staff-buttons">
                            <button className="staff-save" type="submit">Create Staff</button>
                            <button className='staff-close' onClick={() => setShowCreate(false)}>X</button>
                        </div>
                        
                    </form>
                )}
            {!showCreate && !showForm && (<button className='create-staff-button' onClick={() => handleCreateClick()}>Create Staff</button>)}
            <div className="table-container">
            <table table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Bio</th>
                        <th>Image</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((props) => {
                        return(
                            <tr className="staff-table" key = {props.id}>
                                <td>{props.id}</td>
                                <td>{props.name}</td>
                                <td>{props.job}</td>
                                <td>{props.bio}</td>
                                <td><img className = 'image is-32x32' src={require(`../images/${props.image}`)} alt="Image"/></td>
                                <td>{props.Action}</td>
                                <td>
                                    <button className='button' onClick={() => deleteStaff(props.id)}>Delete</button>
                                    <button className='button' onClick={() => handleEditClick(props)}>Edit</button>
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

export default AdminStaff