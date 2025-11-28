import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import PDFViewer from "./PDFViewer";

const ViewNote = () => {
  const {noteID} = useParams();
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [pdfURL,setpdfURL] = useState(null);
  const [error,setError] = useState(null);
  useEffect(()=>{
    const getNote = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/notes/note/${noteID}`)
   .then((response)=>{
    setNote(response.data);
   }).catch((error)=>{
      if(error.status == 404) {
      setError("Note not found. May be this note wouldn't have been approved or removed by admin");
     }else {
      setError("Internal Server error");
     }
    }).finally(()=>{
     setLoading(false);
   })
      }
       getNote();
  },[noteID]);
    return (
      !loading ?
      error == null ? (
        note != null &&
        <div className="viewNote" style={{fontFamily:"Arial, Helvetica, sans-serif"}}>
            <Navbar />
            <div className="body max-w-7xl mx-auto p-5" style={{background:"#f9fafb"}}>
               <Link to={`/${note.subject.subjectName}/${note.subject.code}/notes`} className="block ml-2.5 overflow-ellipsis overflow-hidden">
                <div className="back_Option w-fit flex p-3 hover:bg-blue-200 rounded-md transition-all duration-300 cursor-pointer">
                    <ArrowLeft/>
                    Back to {note.subject.subjectName}
                </div>
                </Link>
                <div className="course_header bg-white shadow-sm mt-3 rounded-md p-6">
                  <h1 className="mb-1 text-[21px] font-semibold overflow-ellipsis overflow-hidden">{note.title}</h1>
                  <p className="mb-2 text-base text-gray-600 overflow-ellipsis overflow-hidden line-clamp-3">{note.description}</p>
                  <div className="user_profile flex items-center gap-2 mt-5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs sm:text-sm font-semibold text-white">{note.createdBy.username.substring(0,1)}</span>  
                    </div>
                    <p>{note.createdBy.username}</p>
                  </div>
                </div>
                <div className="note_pdf bg-white shadow-sm mt-5 p-5 rounded-md">
                  <PDFViewer pdfURL={note.notePdfData}/>
                </div>
            </div>
        </div>
      ):<div className="h-[100vh] flex items-center justify-center text-md "><p className="text-center line-clamp-2 mx-2">{error}</p></div>
    : <div className="h-[100vh] flex items-center justify-center"><Loader/></div>
    )
}
export default ViewNote;