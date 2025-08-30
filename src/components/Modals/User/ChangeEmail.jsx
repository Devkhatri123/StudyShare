import { X } from "lucide-react"
import Loader from "../../Loader"
import { useState } from "react"

export default function ChangeEmail({setAuthenticatedUser,tempAuthenticatedUser,updateEmail,setShowModal,loading}){
    const [newEmail,setNewEmail] = useState(tempAuthenticatedUser.universityEmail);

    return (
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
        <div className="deleteModal max-w-[100%] sm:w-full sm:max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
            <div className="header flex items-center justify-between">
                <h1 className="font-bold sm:text-xl">Change Email</h1>
                <X onClick={()=>{setShowModal(false)}}/>
            </div>
            <p className="text-[15px] text-gray-500 mt-2">New Email</p>
            <input type="email" className="border border-gray-300 w-full px-3 py-2 rounded-lg" name="emailInput" placeholder="Enter New Email..." value={newEmail} onChange={(e) => { setNewEmail(e.target.value) }}/>
            <div className="options flex justify-end gap-2 mt-4">
                {!loading ? (
                <>
                <button className="bg-black py-1.5 px-2 rounded-md text-white" onClick={(()=>{updateEmail(newEmail)})}>Change Email</button>
                <button className="border border-gray-300 px-2 rounded-md" onClick={()=>{setShowModal(false)}}>Cancel</button>
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