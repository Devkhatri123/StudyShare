import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthenticationProvider = ({children}) => {
   const [isAuthenticated,setIsAuthenticated] = useState(false);
   const [AuthenticatedUser,setAuthenticatedUser] = useState(null);
   
  return (
  <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,AuthenticatedUser,setAuthenticatedUser}}>
    {children}
    </AuthContext.Provider>
  )
}

export  {AuthContext,AuthenticationProvider};