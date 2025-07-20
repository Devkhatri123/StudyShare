import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();
export const ErrorProvider = ({children}) => {
    const [error, setError] = useState({});

    const handleError = (errorObj) => {
      setError(errorObj);
    };
    return (
        <ErrorContext.Provider value={{error,handleError}}>
            {children}
        </ErrorContext.Provider>
    )

}
 const useError = () =>{
   return useContext(ErrorContext);
}
export {useError};