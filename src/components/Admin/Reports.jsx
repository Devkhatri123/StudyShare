import axios from "axios";
import { Blocks, StopCircle, StopCircleIcon, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import API_BACKEND_URL from "../../utils/API";
import Loader from "../Loader";
import UserDetailModal from "./UserDetailModal";
import { toast } from "react-toastify";
import BlockModal from "./BlockModal";

export default function Reports() {
    const [reportedProfiles,setReportedProfiles] = useState([]);
    const [pageNumber,setPageNumber] = useState(0);
    const [loading,setloading] = useState(false);
    const [hasMore,sethasMore] = useState(true);
    const [clickedReportIndex,setClickedReportIndex] = useState(null);
    const [showModal,setShowModal] = useState(false);
    const [showBlockModal,setShowBlockModal] = useState(false);
    const [loading2,setLoading2] = useState(false);

    useEffect(()=>{
        if(!hasMore) return;
        setloading(true);
        axios.get(`${API_BACKEND_URL}/report/admin/profile/all?pageNumber=${pageNumber}&limit=4`,{withCredentials:true})
     .then((response)=>{
        if(response.data.reports.length > 0){
        setReportedProfiles((prev)=>([...prev,...response.data.reports]));
        }else{
            sethasMore(false);
        }
     }).catch((error)=>{
        console.log(error);
     }).finally(()=>{
        setloading(false);
     })
    },[pageNumber]);


    const handleScroll = () => {
        if(hasMore && window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
         setPageNumber((Prev) => Prev + 1);
       }
      }
   
      useEffect(()=>{
       window.addEventListener("scroll",handleScroll);
    
       return () => window.removeEventListener("scroll",handleScroll);
      },[]);

      const blockUser = (userId) => {
        setLoading2(true);
        axios.post(`${API_BACKEND_URL}/profile/admin/block/user/${userId}`,{},{withCredentials:true})
        .then((response)=>{
            if(response.status == 200){
              discardUserReports(userId);
            }
            toast.success(response.data.message);
         console.log(response);
        }).catch((error)=>{
            console.log(error);
            
        }).finally(()=>{
            setLoading2(false);
        })
      }
      
     const discardUserReports = (userId) => {
        axios.delete(`${API_BACKEND_URL}/admin/user/${userId}/reports`,{withCredentials:true})
                .then((response)=>{
                    if(response.status == 200);
                    const filteredReports = reportedProfiles.filter((profile)=>{
                        return profile.id != userId;
                    });
                    setReportedProfiles([...filteredReports]);
                    toast.success(response.data.message);
                }).catch((error)=>{
                    console.log(error);
                });
     } 

    return (
        <div>
            <div className="UserInfoUpdate_Header bg-[#fef1f2] rounded-tl-2xl rounded-tr-2xl p-3">
                <div className="flex gap-1.5 items-center mb-1.5">
                    <UserCheck className="text-[#7f1d1d]" />
                    <h1 className="text-[#7f1d1d] text-2xl font-semibold truncate">User Reports</h1>
                </div>
                <p className="text-[#7f1d1d] line-clamp-2">Review and take action on user reports</p>
            </div>
            <div className="body bg-white p-5 mb-2">
               {reportedProfiles.length > 0 ? (
                reportedProfiles.map((report,i)=>{
               return <div key={i} className="update mb-2.5 bg-[#fef1f2] gap-3 sm:gap-0 flex items-center flex-col sm:flex-row justify-between border border-gray-200 rounded-lg px-2 py-3 hover:shadow-xl">
                    <div className="left w-full sm:w-fit flex">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs sm:text-sm font-semibold text-white">{report.fullname.substring(0,1)}</span>
                        </div>
                        <div className="ml-2">
                            <h1 className="font-bold text-[#7f1d1d]">{report.fullname}</h1>
                            <div className="truncate">
                                <p className="text-sm truncate text-[#7f1d1d]">{report.universityEmail}</p>
                                <p className="text-xs text-white bg-[#ef4444] w-fit px-2 rounded-lg text-center">{report.reportCount} Reports</p>
                            </div>
                        </div>
                    </div>
                    <div className="right w-full flex-col sm:w-fit sm:flex-row flex items-center gap-2">
                        <div className="flex w-full justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={(e)=>{setClickedReportIndex(i);setShowModal(true);document.body.style.overflow="hidden"}}>
                            
                            <StopCircle className="w-4 mr-2"/>
                            <button className="text-sm">View Reports</button>
                        </div>
                        <div className="flex w-full text-white bg-[#ef4444] justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={()=>{setShowBlockModal(true);setClickedReportIndex(i)}}>
                            <Blocks className="w-4 mr-2" />
                            <button className="text-sm">Block</button>
                        </div>
                    </div>
                    {showModal && clickedReportIndex != null && clickedReportIndex == i && <UserDetailModal user={report} setShowModal={setShowModal} ShowModal={showModal} />}
                    {showBlockModal && clickedReportIndex != null && clickedReportIndex == i && <BlockModal blockUser={blockUser} user={report} setShowBlockModal={setShowBlockModal} loading={loading2}/>}
                  </div>
                 })
                ):<p>No Reports Found</p>}
                {loading && <Loader/>}
            </div>
        </div>

    )
}