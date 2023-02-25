
import {Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function PrivateRoute({ children }) {
  const { authData } = useAuth()
  const location = useLocation()
  console.log(authData)

  if (!authData){
    return(
      <Navigate to = '/login' replace state = {{from: location}} />
    )
  }
  return children
    
}
  
export default PrivateRoute

/*
The code that returns back to login and logs the currect location as a state does not work but all is needed is return children :)
*/