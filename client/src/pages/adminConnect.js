import { useAuth } from './../Auth/AuthContext'
import React, { useState, useEffect } from 'react'
import AdminBar from './components/adminBar'
import { Outlet, useNavigate } from 'react-router-dom'
import "./css/adminConnect.css"

const AdminConnect= () => {

    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/login")
    }

    //State Values

    const [connect, setConnect] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const [showCreate, setShowCreate] = useState(false)

    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
        console.log("data fetched for connect")
        const handleAdmin = async () =>{
            const response = await fetch("http://localhost:3002/api/connect/get")
            const newConnect = await response.json()
            await setConnect(newConnect)
            console.log(newConnect)
        }
        handleAdmin()
    }, [])

    const deleteTile = (id)=>{
        fetch(`http://localhost:3002/api/connect/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response)
            alert("Connect tile deleted.")
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditClick = (props) => {
        setSelectedId(props.id)
        setTitle(props.title)
        setLink(props.link)
        setImage(props.image)
        setShowForm(true)
      }

    const handleCreateClick = () => {
        setTitle('')
        setLink('')
        setImage(null)
        setShowCreate(true)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log("submit went through")

        const formData = new FormData()
        formData.append("title", title)
        formData.append("link", link)
        formData.append("image", image)
        //Must pass 'formData' as the body as Json does not work with files.

        const response = await fetch(`http://localhost:3002/api/connect/put/${selectedId}`,{
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

    const handleCreateTile = async (e) => {
        e.preventDefault()
        console.log("func called")
        const formData = new FormData()
        formData.append("title", title)
        formData.append("link", link)
        formData.append("image", image)

        const response = await fetch("http://localhost:3002/api/connect/create",{
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
            {/* <AdminBar/> */}
            {showForm && (
                    <form className="connect-form" onSubmit={handleEdit}>
                        <h1>Editing Connect Tile: <span>{title}</span></h1>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Redirect Link:</label>
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
                        <div className="connect-buttons">
                            <button className="connect-save" type="submit">Save</button>
                            <button className="connect-close" onClick={() => setShowForm(false)}>X</button>
                        </div>
                        
                    </form>
            )}

            {showCreate && (
                    <form className="connect-form" onSubmit={handleCreateTile}>
                        <h1><span>Creating a new connect tile</span></h1>
                        <label>Title:</label>
                        <br/>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <br/>
                        <label>Redirect Link:</label>
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
                        <div className="connect-buttons">
                            <button className="connect-save" type="submit">Create Tile</button>
                            <button className='connect-close' onClick={() => setShowCreate(false)}>X</button>
                        </div>
                        
                    </form>
                )}
            {!showCreate && !showForm && (<button className='create-connect-button' onClick={() => handleCreateClick()}>Create Connect Tile</button>)}
            <div className="table-container">
            <table table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Image</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {connect.map((props) => {
                        return(
                            <tr className="connect-table" key = {props.id}>
                                <td>{props.id}</td>
                                <td>{props.title}</td>
                                <td>{props.link}</td>
                                <td><img className = 'image is-32x32' src={require(`../images/${props.image}`)} alt="Image"/></td>
                                <td>{props.Action}</td>
                                <td>
                                    <button className='button' onClick={() => deleteTile(props.id)}>Delete</button>
                                    <button className='button'>Show</button>
                                    <button className='button' onClick={() => handleEditClick(props)}>Edit</button>
                                </td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
        </div>

        <div className="spacer"></div>
        </div>
    )
}

export default AdminConnect