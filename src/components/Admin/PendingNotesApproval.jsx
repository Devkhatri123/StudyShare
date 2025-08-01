import axios from "axios";
import { Clock, Eye, FileText, UserCheck, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import API_BACKEND_URL from "../../utils/API";
import Loader from "../Loader";
import RemarkModal from "./RemarkModal";
import PreviewNote from "./PreviewNote";
import { toast } from "react-toastify";

export default function PendingNotesApproval() {
  const[ApprovalPendingNotes,setApprovalPendingNotes] = useState([]);
  const [showPreviewModal,setShowPreviewModal] = useState(false);
  const[loading,setLoading] = useState(true);
  const [curretNoteIndex,setCurretNoteIndex] = useState(null);
  const [approveLoading,setApproveLoading] = useState(false);
  const [remarkModal,setRemarkModal] = useState(false);

  useEffect(()=>{
    axios.get(`${API_BACKEND_URL}/notes/admin/ApprovalPendingNotes`,{withCredentials:true})
    .then((response)=>{
      setApprovalPendingNotes([...response.data]);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setLoading(false);
    })
  },[]);


  useEffect(()=>{
   if(remarkModal){
    document.body.style.overflow = "hidden";
   }else{
     document.body.style.overflow = "scroll";
   }
   console.log(remarkModal)
  },[remarkModal]);


   const approveNote = async(i) => {
     setApproveLoading(true);
     const remaininArray = ApprovalPendingNotes.filter((item)=>{
      return item.id != ApprovalPendingNotes[i].id;
     });
     await axios.post(`${API_BACKEND_URL}/notes/${ApprovalPendingNotes[i].id}/approve`)
     .then((response)=>{
      toast.success(response.data.message);
      window.location.reload() 
    }).catch((error)=>{
      console.log(error);
     }).finally(()=>{
      setApproveLoading(false);
      setCurretNoteIndex(null);
     });
   }


  return (
    <div>
      <div className="PendingNotesApproval_Header bg-[#eef3ff] rounded-tl-2xl-2xl rounded-tr-2xl">
        <div className="flex gap-1.5 items-center mb-1.5">
          <FileText className="text-[#1e3a8a]" />
          <h1 className="text-[#1e3a8a] text-2xl font-semibold">Pending Note Approvals</h1>
        </div>
        <p className="text-[#2e5cdb]">Review and approve user-submitted notes • {ApprovalPendingNotes?.length} pending submissions</p>
        
      </div>
      <div className="PendingNotesApproval_body border-b-[1px] mt-4 p-5 bg-white flex flex-wrap">
       {!loading ? (
       ApprovalPendingNotes && ApprovalPendingNotes.map((note,i)=>{
       return <div key={i} className="w-1/1 bg-white rounded-xl sm:flex-[0_0_calc(50%_-_16px)] 2xl:flex-[0_0_calc(33.333%_-_16px)] shadow-sm hover:shadow-lg mb-5 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 max-w-sm mx-auto"
          style={{ maxWidth: "-webkit-fill-available"}}
        >
          <div className="relative bg-gradient-to-br from-blue-50 border-b to-indigo-100 overflow-hidden"
          >
            <img src={`data:image/jpeg;base64,${note.thumbnail}`}
              className="w-full h-[50vh] w-48 " style={{ objectFit: "cover" }}
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            {/* Title and Description */}
            <div className="mb-4">
              <h3 className="text-lg sm:text-md font-normal text-gray-900 mb-2 line-clamp-2 leading-tight">
               {note.title}
              </h3>
              <p className="text-gray-600 font-normal text-sm line-clamp-2 leading-relaxed">{note.description}</p>
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs sm:text-sm font-semibold text-white">{note.createdBy.name.substring(0,1)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Dev</p>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 mr-1 flex-shrink-0 " />
                  <span className="text-xs">{note.createdAt}</span>
                </div>
              </div>
             
            </div>
             <div className="card_footer">
                <div className="flex gap-2.5">
                  { curretNoteIndex != i && (
                  <div className="w-[50%] gap-3 bg-[#15843e] px-3.5 py-2 text-white flex items-center shadow-sm rounded-md " onClick={()=>{approveNote(i);setCurretNoteIndex(i)}} >
                    <UserCheck className="w-5"/>
                     <button>Approve</button>
                    </div>
                   )}
      
                   {curretNoteIndex == i && approveLoading &&
                   <div className="w-[50%] gap-3 bg-[#15843e] px-3.5 py-2 text-white flex items-center shadow-sm rounded-md " >
                    <Loader/>
                    </div>}

                  <div className="w-[50%] gap-3 flex items-center px-3.5 py-2 bg-[#be1d1d] text-white shadow-sm rounded-md" onClick={(e) => {
                    setRemarkModal(true);
                    setCurretNoteIndex(i);
                  }}
                    >
                    <X className="w-5"/>
                  <button >Decline</button>
                  </div>
                </div>
                <div className="border-blue-200 border mt-3 rounded-md p-2.5 justify-center flex items-center bg-transparent hover:bg-blue-50 border-blue-200 text-blue-700" onClick={()=>{
                  setShowPreviewModal(true); 
                  setCurretNoteIndex(i)
                  }}>
                  <Eye className="h-4 w-4 mr-2"/>
                <button className="" >View Note</button>
                </div>
              </div>
          </div>
          {remarkModal && curretNoteIndex == i && <RemarkModal currentNote={note} setCurretNoteIndex={setCurretNoteIndex} setRemarkModal={setRemarkModal}/>}
          {showPreviewModal && curretNoteIndex == i && <PreviewNote currentNote={note} setShowPreviewModal={setShowPreviewModal} setCurretNoteIndex={setCurretNoteIndex}/>}
        </div>
        
       })
      ):<Loader/>}
      </div>
    </div>
  )
}