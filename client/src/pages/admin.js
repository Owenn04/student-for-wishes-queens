import { useAuth } from './../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        auth.logout()
        navigate("/")
    }


    return(
        <div>
            <h1>This is the admin panel !!!</h1>
            <button onClick = {handleLogout}>Logout!</button>
        </div>
    )
}

export default Admin