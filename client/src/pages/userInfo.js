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
                <p>{user.name}'s Information</p>
                <a className="button" href="./admin">
                    <span className="icon-text">
                        <span className="icon">
                            <i class="fa-solid fa-reply-all"></i>
                        </span>
                        <span>Back to users</span>
                    </span>
                </a>
                
            </div>
        )
    }
    else {
        navigate("/admin")
    }
}

export default UserInfo