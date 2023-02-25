
import {Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function PrivateRoute({ children }) {
  const { authData } = useAuth()
  const location = useLocation()
  console.log(authData)

  if (!authData.isAuthenticated){
    return(
      <Navigate to = '/login' replace state = {{from: location}} />
    )
  }
  return children
    
}
  
export default PrivateRoute

