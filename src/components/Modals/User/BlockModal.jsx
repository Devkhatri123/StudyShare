import { X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../Loader";
import { toast } from "react-toastify";

export default function BlockModal({user,blockUser,setShowBlockModal,loading}){
    const [blockReason,setblockReason] = useState("");

    const deleteNote = () => {
      if(blockReason.trim().length == 0 ){
        toast.error("Write block reason");
        return;
      }
        blockUser(user.id,blockReason);
     }

     const handleBlockReason = (e) => {
       if(e.target.value.length > 0 && e.target.value.length <= 512){
         setblockReason(e.target.value);
       }
     }
    return (
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
        <div className="deleteModal w-full max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
            <div className="header flex items-center justify-between">
                <h1 className="font-bold sm:text-xl">Confirm Block</h1>
                <X onClick={()=>{setShowBlockModal(false)}}/>
            </div>
            <p className="text-[15px] text-gray-500">Are you sure you want to block @{user.fullname}? This action will prevent them from accessing the platform.</p>
            <textarea className="border border-gray-300 w-full px-3 py-2 rounded-lg" name="emailInput" placeholder="Write reason..." value={blockReason} onChange={(e) => {handleBlockReason(e)}} maxLength={512}/>
            <p className="text-sm text-gray-400">Length {blockReason.length} / 512</p>
            <div className="options flex justify-end gap-2 mt-4">
                {!loading ? (
                <>
                <button className="bg-black py-1.5 px-2 rounded-md text-white" onClick={(()=>{deleteNote()})}>Block User</button>
                <button className="border border-gray-300 px-2 rounded-md" onClick={()=>{setShowBlockModal(false)}}>Cancel</button>
                </>
                ):<>
                <button className="bg-black py-1.5 px-2 rounded-md text-white"><Loader/></button>
                {/* <button className="border border-gray-300 px-2 rounded-md">Cancel</button> */}
                </>}
                </div>
        </div>
    </div>
    )
}