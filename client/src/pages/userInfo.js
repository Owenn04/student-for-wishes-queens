import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom"
const UserInfo = () => {

    const [IDs, setIDs] = useState([])
    const [users, setUsers] = useState([]) 
    const navigate = useNavigate()
    const { id } = useParams();
    const findUser = (id) => {
        for (let i = 0; i < users.length; i++){
            if (users[i].id === id) {
                return users[i]
            }
        }
    }

    useEffect(() => {
        console.log("data fetched")
        const handleUserInfo = async () => {
            const response = await fetch("http://localhost:3002/api/users/get")
            const newUsers = await response.json()
            const newIDs = []
            newUsers.map((props) => {
                newIDs.push(props.id)
            })
            setIDs(newIDs)
            setUsers(newUsers)
        }
        handleUserInfo()
    }, [])

    if (IDs.includes(parseInt(id))) {
        const user = findUser(parseInt(id))
        return(
            <div className="box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{user.name}'s Information</th>
                            <th>
                                <a className="button" href="../admin">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i class="fa-solid fa-reply-all"></i>
                                        </span>
                                        <span>Back to users</span>
                                    </span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan='2'>
                                <p><strong>{user.name}</strong></p>
                                <br/>
                                <a href={user.email}>{user.email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>ID</strong></td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Name</strong></td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Role</strong></td>
                            <td>{user.role}</td>
                        </tr>
                        <tr>
                            <td><strong>Created On</strong></td>
                            <td>{user.created}</td>
                        </tr>
                        <tr>
                            <td><strong>Updated On</strong></td>
                            <td>{user.updated}</td>
                        </tr>
                        <tr>
                            <td><strong>Last Login</strong></td>
                            <td>{user.last_login}</td>
                        </tr>
                    </tbody>
                </table>
                
                
            </div>
        )
    }
    else {
        navigate("/admin")
    }
}

export default UserInfo