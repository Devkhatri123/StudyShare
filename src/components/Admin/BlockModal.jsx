import { X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";

export default function BlockModal({user,blockUser,setShowBlockModal,loading}){
    
    const deleteNote = () => {
        blockUser(user.id);
     }
    return (
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
        <div className="deleteModal w-full max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
            <div className="header flex items-center justify-between">
                <h1 className="font-bold sm:text-xl">Confirm Block</h1>
                <X onClick={()=>{setShowBlockModal(false)}}/>
            </div>
            <p className="text-[15px] text-gray-500">Are you sure you want to block @{user.fullname}? This action will prevent them from accessing the platform.</p>
            <div className="options flex justify-end gap-2 mt-4">
                {!loading ? (
                <>
                <button className="bg-black py-1.5 px-2 rounded-md text-white" onClick={(()=>{deleteNote()})}>Block User</button>
                <button className="border border-gray-300 px-2 rounded-md" onClick={()=>{setShowBlockModal(false)}}>Cancel</button>
                </>
                ):<>
                <button className="bg-black py-1.5 px-2 rounded-md text-white"><Loader/></button>
                <button className="border border-gray-300 px-2 rounded-md">Cancel</button>
                </>}
                </div>
        </div>
    </div>
    )
}