import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import Note from "./Note"
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import UploadNote from "./UploadNote";
import { AuthContext } from "../ContextApi/AuthContext";
import { Link } from "react-router-dom";
import { returnFullSemester } from "../utils/Validation";

export default function Notes() {
  const bodyRef = useRef();
  const messageRef = useRef();
  const authContext = useContext(AuthContext);
  const timerRef = useRef();
  const [notes, setNotes] = useState([]);
  const [subject,setSubject] = useState(null);
  const [query,setQuery] = useState("");
  const [hasMore,setHasMore] = useState(true);
  const [showUploadModal,setShowUploadModal] = useState(false);
  const [showMessage,setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber,setPageNumber] = useState(0);
  const { subjectCode, subjectName } = useParams();
  useEffect(() => {
    document.title = `${subjectName} Notes - StudyShare`;
    timerRef.current = setTimeout(async() => {
     const fetchNotes = async () => {
      if(!hasMore) return;
      await axios.get(`${import.meta.env.VITE_API_URL}/notes?subjectID=${subjectCode}&pageNumber=${pageNumber}&limit=3&query=${query}`)
        .then((response) => {
          document.body.textContent = response.data
          console.log(response.data)
          if(!response.data.length>0){
            setHasMore(false);
           }
            if(pageNumber == 0) setNotes([...response.data]);
            else setNotes((prev)=>([...prev,...response.data]));
            if(subject == null) setSubject(response.data[0]?.subject);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        })
    };
        fetchNotes();
     }, 500);
  }, [subjectCode,subjectName,pageNumber,query]);


    const handleScroll = () => {
        if(hasMore && window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
         setPageNumber((Prev) => Prev + 1);
       }
      }
   
      useEffect(()=>{
       window.addEventListener("scroll",handleScroll);
       return () => window.removeEventListener("scroll",handleScroll);
      },[]);


      const handleSearch = (e) => {
        clearTimeout(timerRef.current);
        setPageNumber(0);
        setQuery(e.target.value);
        setHasMore(true);
      }

  return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50" ref={bodyRef}>
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 space-y-3 sm:space-y-0">
                <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
                  <Link to={"/"}>
                  <span className="hover:text-gray-700 cursor-pointer transition-colors duration-200 whitespace-nowrap">
                    Home
                  </span>
                  </Link>
                  <span className="text-gray-300">/</span>
                  <span className="hover:text-gray-700 cursor-pointer transition-colors duration-200 whitespace-nowrap">
                    DHA Suffa University
                  </span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-900 font-medium whitespace-nowrap">{subjectName}</span>
                </nav>
                {authContext.AuthenticatedUser !== null && authContext.AuthenticatedUser.accountStatus === "Active" && authContext.AuthenticatedUser.emailVerified && authContext.AuthenticatedUser.enabled ? (
                  <button
                    className="bg-gray-900 text-white px-4 sm:px-6 py-2.5 sm:py-2.5 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm sm:text-base w-full sm:w-auto"
                    onClick={() => { setShowUploadModal(true); }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Contribute Notes</span>
                  </button>
                ) : (
                  authContext.AuthenticatedUser !== null && (authContext.AuthenticatedUser.accountStatus !== "Active" || authContext.AuthenticatedUser.emailVerified == false || authContext.AuthenticatedUser.enabled == false) &&
                  <div className="group relative" onMouseOver={()=> {setShowMessage(true)}} onMouseLeave={()=>{setShowMessage(false)}}>
                  <button 
                    className="bg-gray-400 text-white px-4 sm:px-6 py-2.5 sm:py-2.5 rounded-lg flex items-center justify-center space-x-2 hover:transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm sm:text-base w-full sm:w-auto"
                    
                 >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Contribute Notes</span>
                  </button>
                  {showMessage &&(
                  <div ref={messageRef} className="p-3 w-full block absolute group-hover:block mt-3 right-0 bg-white shadow-md rounded-lg">
                  <p className="text-black">{authContext.AuthenticatedUser.accountRemarks == "" && authContext.AuthenticatedUser.accountStatus == "Blocked" ? "Your account is blocked" :  authContext.AuthenticatedUser.accountRemarks}</p>
                 </div>
                  )}
                  </div>
                )}

              </div>
            </div>
          </div>
          {showUploadModal && <UploadNote setShowUploadModal={setShowUploadModal}/>}
          {!loading ? (
            <>
          {subject != null && 
           <>
              <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-100">
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-0 leading-tight">
                        {subject?.subjectName}
                      </h1>
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{subject?.shortDescription}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="font-semibold text-gray-900">{returnFullSemester(subject?.semester)} Semester</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-gray-600">DHA Suffa University</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <svg
                        className="w-4 h-4 text-blue-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-blue-600 font-medium">{notes.length} notes available</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                  <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-6">
                    <div className="relative flex-1 max-w-full lg:max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        onChange={(e)=>{handleSearch(e)}}
                        placeholder="Search notes..."
                        className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
                      />
                    </div>

                  </div>
                </div>
              </div>
               </>
               }
            {/**Notes Section */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8">
                {notes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {notes.map((note,i) => (
                    <Note key={i} note={note} />
                  ))}
                </div>
                ): !loading && <p className="text-center flex items-center justify-center text-xl font-bold" style={{ height: "50dvh" }}>No Notes found of {subjectName}</p>}
              </div>
             </>
             ) :<div className="h-[50vh] flex items-center"> <Loader /> </div>}
 </div>
      </>
  )
}
