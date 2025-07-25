import { createContext, useState } from "react";

const ToggleContext = createContext();

const ToggleContextProvider = ({children}) => {
   const [isUploadModalVisible,setIsUploadModalVisible] = useState(false);
   
  return (
  <ToggleContext.Provider value={{isUploadModalVisible,setIsUploadModalVisible}}>
    {children}
    </ToggleContext.Provider>
  )
}

export  {ToggleContext,ToggleContextProvider};