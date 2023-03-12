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


    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Tester McTesterson",
            email: "test@test.com",
            role: "admin",
            created: "2020-03-07 14:53:35",
            updated: "2023-03-07 15:46:24",
            last_login: "2023-03-07 15:46:24",
        },
        {
            id: 2,
            name: "Testie McTesterson",
            email: "tester@test.com",
            role: "admin",
            created: "2023-03-07 14:58:23",
            updated: "2023-03-07 15:46:24",
            last_login: "2023-03-07 15:46:24",
        }    
    ])

    if (users != null && users.length > 0){
        return(
            <div>
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
                                        <button className='button'>Edit</button>
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