import { Eye, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import PreviewUserInfoUpdateModal from "./PreviewUserInfoUpdateModal";
import axios from "axios";
import API_BACKEND_URL from "../../utils/API";
import { Link } from "react-router-dom";

export default function UserInfoUpdate(){
    const [PreviewUserInfoUpdate,setPreviewUserInfoUpdate]= useState(false);
    const [currentUpdateIndex,setCurrentUpdateIndex] = useState(null);
    const [updates,SetUpdates] = useState([]);
    const [pageNumber,setPageNumber] = useState(0);
    const [selectedUpdate,setSelectedUpdate] = useState(null);
    const [hasMore,setHasMore] = useState(true);


    useEffect(()=>{
      if(!hasMore) return;
        const getApprovalPendingUserUpdates = () => {
            axios.get(`${API_BACKEND_URL}/profile/admin/ApprovalPendingUserInfo?pageNumber=${pageNumber}&limit=2`,{withCredentials:true})
            .then((response)=>{
              if(response.data.length > 0){
                SetUpdates((prev) => [...prev,...response.data]);
              }else setHasMore(false);
        }).catch((error)=>{
                console.log(error);
            });
        }
        getApprovalPendingUserUpdates();
       // return () => SetUpdates([])
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


    return (
        <div>
            <div className="UserInfoUpdate_Header bg-[#edfdf4] rounded-tl-2xl rounded-tr-2xl p-3">
                    <div className="flex gap-1.5 items-center mb-1.5">
                      <UserCheck className="text-[#4a9e6a]" />
                      <h1 className="text-[#4a9e6a] text-2xl font-semibold truncate">Pending User Information Updates</h1>
                    </div>
                    <p className="text-[#4a9e6a] line-clamp-2">Review and approve user-submitted notes • {updates.length} pending submissions</p>
                  </div>
                  <div className="body bg-white p-5">
                    {updates.length > 0 ? (
                    updates.map((update,i)=>{
                  return <div key={i} className="update mb-2.5 gap-3 sm:gap-0 flex items-center flex-col sm:flex-row justify-between border border-gray-200 rounded-lg px-2 py-3 hover:shadow-xl">
                    <div className="left w-full sm:w-fit flex">
                        <Link to={"/profile"} className="h-fit" state={{userEmail:update.id}}>
                       <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                       <span className="text-xs sm:text-sm font-semibold text-white">{update.fullname.substring(0,1)}</span>
                        </div> 
                         </Link>
                        <div className="ml-2">
                            <h1 className="font-bold">{update.fullname}</h1>
                            <div>
                                <p className="text-sm truncate">{update.universityEmail}</p>
                                <p className="text-xs text-gray-600">Requested {update.requestAt}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right w-full sm:w-fit flex items-center">
                        <div className="flex w-full justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={()=>{setPreviewUserInfoUpdate(true);setCurrentUpdateIndex(i);setSelectedUpdate(update)}}>
                            <Eye className="w-4 mr-2"/>
                            <button className="text-sm">Preview</button>
                        </div>
                    </div>
                    {PreviewUserInfoUpdate && currentUpdateIndex == i && <PreviewUserInfoUpdateModal setPreviewUserInfoUpdate={setPreviewUserInfoUpdate} selectedUpdate={selectedUpdate} Profiles={updates} setProfiles={SetUpdates}/>}
                   </div>
                     })   
                ):<p>No Update Available</p>}
                   </div>
                  
        </div>
    )
}