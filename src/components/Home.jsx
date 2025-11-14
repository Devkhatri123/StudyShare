"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios";
import { Link } from "react-router-dom"
import Loader from "./Loader";
import { AuthContext } from "../ContextApi/AuthContext";
import { returnFullFormOfDepartment, returnFullSemester } from "../utils/Validation";

export default function StudyShareHomepage() {
  const timer = useRef();
  const [subjects, setSubjects] = useState([]);
  const [loading,setLoading] = useState(true);
  const [hasMore,setHasMore] = useState(true);
  const [query,setQuery] = useState("");
  const [limit,setLimit] = useState(0);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    timer.current = setTimeout(() => {
    const getSubjects = async () => {
    if(!hasMore) return;
    await axios.get(`${import.meta.env.VITE_API_URL}/subject/all?pageNumber=${limit}&pageSize=3&query=${query}`,{withCredentials:true})
    .then((response)=>{
      if(limit == 0) setSubjects([...response.data]);
      else setSubjects((prev) =>[...prev,...response.data]);
      if(!response.data.length > 0) setHasMore(false);
      }).catch((error)=>{
      console.log("Error in fetching subjects:", error);
    }).finally(()=>{
      setLoading(false);
    })
  }
      getSubjects();
},[500])
  //  return () => clearTimeout(timer.current);
   },[query,limit]);

   const handleSearch = (e) => {
      clearTimeout(timer.current);
      setQuery(e.target.value);
      setHasMore(true)
      setLimit(0)
   }


   const handleScroll = () => {
     if(hasMore && window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
      setLimit((Prev) => Prev + 1);
    }
   }

   useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll",handleScroll);
   },[]);



  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      <section className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Share Knowledge, Excel Together
          </h1>
          <p className="mb-8 sm:mb-12 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Access thousands of lecture notes. Upload your notes and help fellow students succeed.
          </p>

          {/* Feature Cards */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20">
                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              {/* <h3 className="mb-2 text-lg sm:text-xl font-semibold">10,000+ Notes</h3> */}
              <p className="text-sm text-blue-100">Comprehensive collection across all subjects</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20">
                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              {/* <h3 className="mb-2 text-lg sm:text-xl font-semibold">Universities</h3> */}
              <p className="text-sm text-blue-100">Connect with students worldwide</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20">
                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              {/* <h3 className="mb-2 text-lg sm:text-xl font-semibold">Free Access</h3> */}
              <p className="text-sm text-blue-100">Download and share without limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-50 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
            <input
              type="text"
              placeholder="Search notes by subject or university..."
              value={query}
              onChange={(e) => handleSearch(e)}
              className="w-full h-12 sm:h-14 pl-12 pr-20 sm:pr-24 text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
          </div>
        </div>
      </section>

      {/* University Section */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-900">DHA Suffa University</h2>
            <p className="text-gray-600 text-sm sm:text-base">Browse subjects and access lecture notes</p>
            <p className="mt-2 text-sm text-gray-500">{subjects.length} subjects available</p>
          </div>
           {!loading ? (
            subjects.length > 0 ? (
           <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
           {subjects.map((subject,i) => (
               <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg cursor-pointer active:scale-95 transform transition-transform">
                  <Link to={`/${subject.subjectName}/${subject.code}/notes`} className="block">
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-3 border border-gray-300 w-fit px-2 rounded-xl">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {returnFullSemester(subject.semester)} Semester
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{subject.subjectName}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{subject.shortDescription}</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">{returnFullFormOfDepartment(subject.department)}</span>
               
              </div>
              </Link>
            </div>
             ))}
        </div>
        ):<><p className="text-center w-full">No subjects found <strong>{authContext.AuthenticatedUser != null && `of ${authContext.AuthenticatedUser.semester} semester, ${returnFullFormOfDepartment(authContext.AuthenticatedUser.department)} department`}</strong></p></>
         ):(
          <Loader/>
         )}
        </div>
       </section>
    </div>
  )
}
