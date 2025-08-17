import { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({children}) => {
   const [count,setCount] = useState({});
   
  return (
  <AdminContext.Provider value={{count,setCount}}>
    {children}
    </AdminContext.Provider>
  )
}

export  {AdminContext,AdminProvider};