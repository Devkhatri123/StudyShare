import axios from "axios";
import { X } from "lucide-react";
import API_BACKEND_URL from "../utils/API";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function ReportModal({setShowModal,reportType,createdBy}){
    
    const authContext = useContext(AuthContext);
    const [loading,setLoading] = useState(false);

    const selectRef = useRef();
    const [Report,SetReport] = useState({
        reportedBy:authContext.AuthenticatedUser?.id,
        reportedUser:createdBy.id,
        reason:"Spam or scam",
        additionalDetails:""
    });

    useEffect(()=>{
    document.body.style.overflowY = "hidden";
    return () => document.body.style.overflowY = "unset";
    },[])
   const report = async() => {
    if(authContext.AuthenticatedUser == null){
        toast.error("You are not signed In.");
        return;
    }
    // if(authContext.AuthenticatedUser.id === createdBy.id){
    //     toast.error("You can't report to yourself");
    //     return;
    // }
    if(reportType === "user"){
       setLoading(true);
        await axios.post(`${API_BACKEND_URL}/report/user`,Report,{withCredentials:true})
        .then((response)=>{
        toast.success(response.data);
        setShowModal(false);
        }).catch((error)=>{
          console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    }
   }

   const handleReportDescription = (e) => {
    console.log(e.target.value.length)
    if(e.target.value.length <= 120){
        SetReport((prev)=>({...prev,additionalDetails:e.target.value}));
        //return
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
                     <div className="bg-black text-white rounded-sm px-2 py-1 text-sm" onClick={()=>{report()}}>
                        <button className="text-sm">Submit Report</button>
                    </div>
                    ):
                    <div className="bg-gray-200 text-white rounded-sm px-2 py-1 text-sm">
                        <button className="text-sm"><Loader/></button>
                    </div>
                    }
                </div>
               </div>
            </div>
        </div>
    )
}