import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    //this code check if the value for "isLoggedIn" === "true"
    //i have to use quotes around true for some reason.
    return {
      email: null,
      password: null,
      isAuthenticated: isLoggedIn
    }
  });
    


  const login = (email, password) => {
    setAuthData({email, password, isAuthenticated: true})
    localStorage.setItem("isLogginIn", "true")
    //when the login function is used creates an item in the local storage
    //that looks like this "isLoggedIn": "true"
  }

  const logout = () => {
    setAuthData({email: null, password: null, isAuthenticated: false})
    localStorage.removeItem("isLoggedIn")
  }

  return(
    <AuthContext.Provider value = {{authData, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

/* How does this boy work :)
  1. AuthProvider Component is created which carries the state of an object called authData containing 3 properties: email, pwrod, 
  and isAuth.. 
  This component also carries 2 functions: login and logout which can be called in other function. These function alter the state data
  2. The AuthContext.Provider is a custom react component that is created when you use the useContext hook through createContext. 
  The values passes through this component are then able to be used globally in any components its wrapped around as well as the children
  components, which in this case is the AuthProvider function which is exported
  3. Then a useAuth hook is created and also exported which allows all other functions to use the the AuthContext function and its values 
  by created a useAuth object such as const auth = useAuth()
*/
