import axios from "axios";
import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function ReportModal({setShowModal,reportType,createdBy,reportedNote}){
    
    const authContext = useContext(AuthContext);
    const [loading,setLoading] = useState(false);

    const selectRef = useRef();
    const [Report,SetReport] = useState({
        reportedBy:authContext.AuthenticatedUser?.id,
        reportedUser:"",
        reportedNote:"",
        reason:"Spam or scam",
        additionalDetails:""
    });

    useEffect(()=>{
    document.body.style.overflowY = "hidden";
    if(reportType == "user") SetReport((prev)=>({...prev,reportedUser:createdBy.id}));
    else SetReport((prev)=>({...prev,reportedNote:reportedNote.id}));
    SetReport((prev)=>({...prev,reportedBy:authContext.AuthenticatedUser?.id}));
    return () => document.body.style.overflowY = "unset";
    },[])
   const report = async() => {
    if(authContext.AuthenticatedUser == null){
        toast.error("You are not signed In.");
        return;
    }
    if(authContext.AuthenticatedUser.id === createdBy.id){
        if(reportType == "user")
        toast.error("You can't report to yourself");
        else toast.error("You can't report to your own note");
        return;
    }
        if(validateInputs()){
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/report/${reportType == "user" ? "user":"note"}`,Report,{withCredentials:true})
        .then((response)=>{
        toast.success(response.data);
        setShowModal(false);
        }).catch((error)=>{
            if(error.response.status == 404){
            if(reportType == "note"){
                toast.error("Note note found. This note may has been removed by admin");
                return;
            }else {
               toast.error("User note found. This User may has been blocked by admin");
                return;
            }
            }
          console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    }
   }

   const validateInputs = () => {
    if(Report.reason.trim().length == 0) {
        toast.error("Select a reason");
        return false;
    }else if(Report.additionalDetails.trim().length == 0){
        toast.error("Write additional Detail");
        return false;
    }
    return true;
   }
   const handleReportDescription = (e) => {
    if(e.target.value.length <= 120){
        SetReport((prev)=>({...prev,additionalDetails:e.target.value}));
    }

   }
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
            <div className="ReportModal w-full h-full md:h-fit fixed sm:top-[50%] sm:translate-y-[-50%] bg-white md:max-w-[512px] rounded-md p-2.5 lg:max-w-xl">
               <div className="header flex justify-between">
                <h1 className="text-lg font-medium">Report {reportType}</h1>
                <X onClick={()=>setShowModal(false)}/>
               </div>
               <div className="body mt-5">
                <div className="reason">
                    <h2 className="text-sm">Reason</h2>
                    <select ref={selectRef} name="Reason" id=""className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer" defaultValue={"Spam or scam"} onChange={(e)=>{SetReport((prev)=>({...prev,reason:e.target.value}))}}>
                        <option value="Spam or scam">Spam or scam</option>
                        <option value="Harassment or bullying">Harassment or bullying</option>
                        <option value="Misinformation">Misinformation</option>
                    </select>
                </div>
                <div className="addtionalDetails mt-2.5">
                    <h2 className="text-sm mb-1">Additional Details</h2>
                    <textarea value={Report.additionalDetails} className="text-sm w-full rounded-md border border-gray-300 py-1 px-1.5 outline-0 min-h-[70px]" onChange={(e)=>{handleReportDescription(e)}}  name="report description" placeholder="Write additional details"></textarea>
                    <p className="text-sm text-gray-400 -mt-1 mb-4">Description length : {Report.additionalDetails.length} / 120</p>
                </div>
                <div className="footer flex gap-3 justify-end">
                    {!loading ? (
                     <div className="bg-black text-white rounded-sm px-2 py-2 w-full text-sm sm:w-[70px] flex justify-center" onClick={()=>{report()}}>
                        <button className="text-sm">Submit Report</button>
                    </div>
                    ):
                    <div className="bg-gray-200 text-white rounded-sm px-2 py-2 w-full text-sm sm:w-[70px] flex justify-center">
                        <button className="text-sm w-full sm:w-[70px]"><Loader/></button>
                    </div>
                    }
                </div>
               </div>
            </div>
        </div>
    )
}