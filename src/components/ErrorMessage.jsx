import React from "react";
const ErrorMessage = ({Msg}) => {
    return (
     <p className="text-left p-2.5 rounded-[6px] text-[18px]" style={{backgroundColor: "#f6d9d8",color: "#6e211e"}}>
        {Msg}
        </p>
    )
}
export default ErrorMessage;