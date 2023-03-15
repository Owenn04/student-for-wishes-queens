import { useAuth } from './../Auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'


const Admin = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/login")
    }
    const showUser = (id) => {
        navigate(`/admin/${id}`)
    }

    //State Values

    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')


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
            body: JSON.stringify({ name, email, role, updated: new Date() }),

            //right now it creates a new date object but we only want first half
        })
        if (response.status === 200) {
          alert("Row Updated")
          window.location.reload()
        } else {
          console.log("Error")
        }
    }

      const handleEditClick = (id) => {
        setSelectedId(id)
        setShowForm(true)
      }
      
    useEffect(() => {
        console.log("data fetched")
        const handleAdmin = async () =>{
            const response = await fetch("http://localhost:3002/api/users/get")
            const newUsers = await response.json()
            await setUsers(newUsers)
            console.log(newUsers)
        }
        handleAdmin()
    }, [])

    
    

    if (users != null && users.length > 0){
        return(
            <div>
                
                {showForm && (
                    <form onSubmit={handleEdit}>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Role:</label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                        <button type="submit">Save</button>
                        <button onClick={() => setShowForm(false)}>x</button>
                    </form>
                )}

                <Outlet/>
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
                                        <button className='button' onClick={() => showUser(props.id)}>Show</button>
                                        <button className='button' onClick={() => handleEditClick(props.id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
            </div>
        )
    } else{
        return(
            <div>
                <h1>This is the admin panel !!!</h1>
                <button onClick = {handleLogout}>Logout!</button>
            </div>
        )
    }
        
    
}

export default Admin