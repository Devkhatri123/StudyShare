import axios from "axios";
import { X } from "lucide-react";
import API_BACKEND_URL from "../utils/API";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../components/Loader"

export default function DeleteNoteModal({setShowDeleteModal,setcurrentNoteIndex,noteID,Notes,setNotes}){
    const [loading,setLoading] = useState(false);

    const deleteNote = () =>{
      setLoading(true);
      axios.delete(`${API_BACKEND_URL}/notes/${noteID}`,{withCredentials:true})
      .then((response)=>{
        if(response.status == 200){
            const noneDeletedNotes = Notes.filter((note)=>{
              return note.id != noteID;
            });
            setNotes(noneDeletedNotes);
            toast.success("Note deleted successfully!");
            setShowDeleteModal(false);
        }
      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        setLoading(false);
      })
    }

   return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
        <div className="deleteModal w-full max-w-96 fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
            <div className="header flex items-center justify-between">
                <h1 className="font-bold sm:text-xl">Confirm Delete</h1>
                <X onClick={()=>{setShowDeleteModal(false);setcurrentNoteIndex(null)}}/>
            </div>
            <p className="text-[15px] text-gray-500">Are you sure you want to delete this note?</p>
            <div className="options flex justify-end gap-2 mt-4">
                {!loading ? (
                <>
                <button className="bg-[#ef4444] py-1.5 px-2 rounded-md text-white" onClick={(()=>{deleteNote()})}>Delete</button>
                <button onClick={()=>{setShowDeleteModal(false)}}>Cancel</button>
                </>
                ):<>
                <button className="bg-[#ef4444] py-1.5 px-2 rounded-md text-white"><Loader/></button>
                <button disabled>Cancel</button>
                </>}
                </div>
        </div>
    </div>
   )
}