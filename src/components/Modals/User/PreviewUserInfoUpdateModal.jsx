import axios from "axios";
import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { AdminContext } from "../../../ContextApi/AdminContext";

export default function PreviewUserInfoUpdateModal({setPreviewUserInfoUpdate,selectedUpdate,Profiles,setProfiles}){
    const [enableRemarkModal,setEnableRemarkModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const adminContext = useContext(AdminContext);

    const [remarkRequest,setRemarkRequest] = useState({
        id:"",
        message:""
    });

    useEffect(()=>{
     document.body.style.overflowY = "hidden";
     return () => document.body.style.overflowY = "scroll";
    },[])

    const rejectUpdateRequestInfo = async(ID) => {
      if(remarkRequest.message.length == 0){
        toast.error("Message text area is empty");
        return;
      }
      setRemarkRequest((prev) => ({...prev,id:ID}))
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/profile/admin/RejectInfoUpdateRequest/${ID}`,remarkRequest,{withCredentials:true})
      .then((response)=>{
        if(response.status === 200){
            toast.success(response.data);
            updatePendingProfilesArray(ID);
            adminContext.setCount({});
            setEnableRemarkModal(false);
            setPreviewUserInfoUpdate(false);
        }
      }).catch((error)=>{
        toast.error(error.response.data);
        console.log(error);
      }).finally(()=>{
         setLoading(false);
      });

    }


    const approveChanges = async(userId) => {
       setLoading2(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/profile/admin/approveChanges/${userId}`,{},{withCredentials:true,signal:signal})
       .then((response)=>{
         if(response.status === 200){
             toast.success(response.data);
             updatePendingProfilesArray(userId);
             adminContext.setCount({});

             setEnableRemarkModal(false);
             setPreviewUserInfoUpdate(false);
            
           
           }
       }).catch((error)=>{
         if(error.response.data != undefined) toast.error(error.response.data);
       }).finally(()=>{
          setLoading2(false);
       })
    }

    const updatePendingProfilesArray = (userId) => {
      const NonApprovedProfiles = Profiles.filter((profile)=>{
              return profile.id !== userId;
      });
            setProfiles([...NonApprovedProfiles]);
    }
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
            <div className="previewInfoUpdateModal w-full max-w-96 fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
              <div className="header flex justify-between">
                <h2 className="font-bold text-lg">Preview Info</h2>
                <X onClick={()=>{setPreviewUserInfoUpdate(false)}}/>
              </div>
              <p className="text-sm text-gray-400">How the profile will look after changes</p>
             <div className="Modal_body no-scrollbar overflow-y-scroll">
                <div className="flex justify-between border-gray-200 border-b mt-1.5">
                    <p className="text-sm">Attributes</p>
                     <p className="text-sm">New</p>
                </div>
                <div className="flex justify-between">
                    <div className="old_info text-md">
                    <p>Name</p>
                    <p>Email</p>
                    <p>Semester</p>
                    <p>Gender</p>
                    <p>Dept</p>
                </div>
                
                <div className="new_info text-end text-md text-green-500">
                    <p>{selectedUpdate.username}</p>
                    <p>{selectedUpdate.universityEmail}</p>
                    <p>{selectedUpdate.semester}</p>
                    <p>{selectedUpdate.gender}</p>
                    <p>{selectedUpdate.department}</p>
                </div>
                </div>
                {!enableRemarkModal ? (
                <div className="flex justify-end gap-2 mt-2 flex-col sm:flex-row">
                    {!loading2 ? (
                    <>
                    <button className="bg-gray-900 text-white px-2 p-1.5 rounded-md text-sm" onClick={()=>{approveChanges(selectedUpdate.id)}}>Accept</button>
                    <button className="bg-gray-100 text-black px-2.5 rounded-md text-sm py-1" onClick={()=>{setEnableRemarkModal(true);}}>Reject</button>  
                    </>
                  ):
                    <button className="bg-gray-900 text-white px-2 p-1.5 rounded-md text-sm w-full sm:w-[70px]" disabled style={{opacity:"0.3"}}><Loader/></button>}
                    
                </div>
                 ):
                 <>
                 <div className="remarkModal mt-1.5">
                    <textarea className="text-sm w-full rounded-md border border-gray-300 py-1 px-1.5 outline-0" name="" id="" placeholder="Write rejection reason..." onChange={(e)=>setRemarkRequest((prev) => ({...prev,message:e.target.value}))}></textarea>
                    <div className="flex justify-end gap-1.5 flex-col sm:flex-row">
                        {!loading ? (
                        <>
                        <button className="bg-gray-900 text-white px-2 p-1.5 rounded-md text-sm" onClick={() => rejectUpdateRequestInfo(selectedUpdate.id)}>Confirm</button>
                        <button className="bg-gray-100 text-black py-1.5 px-2.5 rounded-md text-sm" onClick={()=>{setEnableRemarkModal(false)}}>Cancel</button>
                        </>
                        ):<button className="bg-gray-900 text-white px-2 p-1.5 rounded-md text-sm w-full sm:w-[70px]" disabled><Loader/></button>}
                       
                    </div>
                 </div>
                 </>
                 }
              </div>
            </div>
        </div>
    )
}