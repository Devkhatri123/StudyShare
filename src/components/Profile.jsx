import { CircleX, Clock, Cross, Delete, Edit, Loader, Save, Settings, Timer, User, Verified, Watch, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import API_BACKEND_URL from "../utils/API";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [isDisbaled, setIsDisabled] = useState(true);
  const authContext = useContext(AuthContext);
  const [myNotes, setMyNotes] = useState([]);
  const [noteStatus,setNoteStatus] = useState({status:"All",temp:"All"});
  const [loading,setLoading] = useState(true);
  const [tempAuthenticatedUser, setAuthenticatedUser] = useState({});
  const [pageNumber,setPageNumber] = useState(0);
  const [notesCount,setnotesCount] = useState({
    approved:0,
    pending:0,
    declined:0
  })

  useEffect(() => {
    if (authContext.AuthenticatedUser) {
       setAuthenticatedUser(authContext.AuthenticatedUser);
      
    } else {
      toast.info("Please signIn to access this page.")
    }
  }, []);

  useEffect(()=>{
     getMyNotes(noteStatus.temp);
  },[tempAuthenticatedUser,pageNumber])

   const getMyNotes = async(type) => {
    await axios.get(`${API_BACKEND_URL}/notes/myNotes?userId=${tempAuthenticatedUser?.id}&status=${noteStatus.status}&pageNumber=${pageNumber}&limit=4`, { withCredentials: true })
        .then((response) => {
          if(response.data.length > 0){
          if(noteStatus.temp === noteStatus.status){
          setMyNotes((prev) => [...prev,...response.data]);
          }else if(noteStatus.status !== noteStatus.temp) {
            setMyNotes([...response.data]);
            setNoteStatus((prev) => ({...prev,
            temp:prev.status,
      }));
          }
        }
        }).catch((error) => {
          console.log(error);
        }).finally(()=>{
          setLoading(false);
        })
   }

  const updateInfo = async () => {
    await axios.put(`${API_BACKEND_URL}/auth/${tempAuthenticatedUser.id}`, tempAuthenticatedUser, { withCredentials: true })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setIsDisabled(true);
      }).catch((error) => {
        console.log(error);
      })
  }


  useEffect(()=>{
 
   // Get Count of Approved notes
     const approvedNotes = myNotes.filter((note)=>{ 
     return note.status === "Approved";
   });
   setnotesCount((Prev) => ({...Prev,approved:approvedNotes.length}));

   // Get Count of Pending notes
   const pendingNotes = myNotes.filter((note)=>{ 
     return note.status === "Pending"
   });
   setnotesCount((Prev) => ({...Prev,pending:pendingNotes.length}));
      // Get Count of Declined notes
   const declinedNotes = myNotes.filter((note)=>{ 
     return note.status === "Declined"
   });
   setnotesCount((Prev) => ({...Prev,declined:declinedNotes.length}));



  },[myNotes]);


  const getApprovedNotes = (type) => {
    if(type !== noteStatus.status){
      setPageNumber(0);
       setNoteStatus((prev) => ({...prev,
        temp:prev.status,
        status:type
      }));
      }
     
     // getMyNotes(type)
  }

  const handleScroll = () => {
  if(window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
      setPageNumber((Prev) => Prev + 1);
     // getMyNotes(undefined);
    }
   }

   useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll",handleScroll);
    },[]);

  return (
    authContext.AuthenticatedUser ? (
      <div className="bg-gray-50" style={{ fontFamily: "Geist" }}>
        <nav className="bg-white border-b border-gray-200 px-8 py-2.5 ">

          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="left flex items-center">

              <div className="bg-blue-600 max-w-fit p-2.5 rounded-lg">
                <svg
                  className="w-6 h-6 sm:w-6 sm:h-6 text-white"
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
              <h1 className="text-[1.3em] hidden sm:block  font-bold ml-3">My Profile</h1>
            </div>

          </div>
        </nav>
        <div className="body max-w-6xl mx-auto px-5 py-3">
          <div className="info bg-white shadow-sm rounded-lg border border-gray-200 py-3.5 px-4">
            <div className="info_header flex-col sm:flex-row flex justify-between items-center">
              <div className="info_header_left flex items-center gap-3.5">
                <div className="rounded-full bg-blue-100 p-3.5">
                  <User className="text-blue-600 w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold truncate">{authContext.AuthenticatedUser.name}</h1>
                  <p className="">Dha Suffa University</p>
                </div>
              </div>
              {isDisbaled ? (
                <div className="right_disabled bg-gray-900 justify-center w-full gap-1.5 mt-4 sm:w-fit sm:mt-0 px-4 py-2 rounded-md flex items-center cursor-pointer" onClick={() => setIsDisabled(false)}>
                  <Edit className="text-white w-4 h-4" />
                  <button className=" text-white">Edit Profile</button>
                </div>
              ) :
                <div className="right_enabled flex gap-2.5 mt-5 flex-col sm:mt-0 sm:flex-row w-full sm:w-fit">
                  <div className="flex text-white p-2.5 rounded-md justify-center cursor-pointer" style={{ background: "#16a34a" }}>
                    <Save className="w-4" />
                    <button className="ml-1" onClick={() => { updateInfo() }}>Save</button>
                  </div>
                  <div className="flex items-center text-white p-2.5 rounded-md justify-center cursor-pointer" style={{ background: "#6b7280" }} onClick={() => setIsDisabled(true)}>
                    <X className="w-4" />
                    <button className="ml-2">Cancel</button>
                  </div>
                </div>
              }
            </div>
            <div className="info_inputs flex flex-col mt-8 gap-2.5 sm:flex-row">
              <div className="leftInputs w-full sm:w-[50%]">
                <div className="fullnameInput flex flex-col mb-4">
                  <label htmlFor="Fullname">Fullname</label>
                  {isDisbaled ? (
                    <input type="text" name="fullname" className="border border-gray-200 px-3 py-2 rounded-lg" id="" value={tempAuthenticatedUser.name} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />
                  ) : <>
                    <input type="text" name="fullname" className="border border-gray-200 px-3 py-2 rounded-lg" id="" value={tempAuthenticatedUser?.name} onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, name: e.target.value }) }} />
                  </>}
                </div>

                <div className="emailInput flex flex-col mb-4">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" name="email" id="" value={tempAuthenticatedUser.universityEmail} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />

                </div>

                <div className="GenderInput flex flex-col mb-4">
                  <label htmlFor="Gender">Gender</label>
                  {isDisbaled ? (
                    <select name="gender" id="" className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }}>
                      <option value="Male">Male</option>
                      <option value="Male">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) :
                    <>
                      <select name="gender" id="" className="border border-gray-200 px-3 py-2 rounded-lg" onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, gender: e.target.value }) }}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </>}
                </div>

              </div>
              <div className="rightInputs w-full sm:w-[50%]">
                <div className="DepartmentSelect flex flex-col mb-4">
                  <label htmlFor="Department">Department</label>
                  {isDisbaled ? (
                    <select name="Department" id="" disabled className="border border-gray-200 px-3 py-2 rounded-lg" style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }}>
                      <option value={tempAuthenticatedUser.department}>{tempAuthenticatedUser.department}</option>
                      <option value={tempAuthenticatedUser.department === "CS" ? "CE" : "CS"}>{tempAuthenticatedUser.department === "CS" ? "CE" : "CS"}</option>
                    </select>
                  ) :
                    <>
                      <select name="Department" id="" className="border border-gray-200 px-3 py-2 rounded-lg" onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, department: e.target.value }) }}>
                        <option value="CS">{tempAuthenticatedUser.department}</option>
                        <option value={tempAuthenticatedUser.department === "CS" ? "CE" : "CS"}>{tempAuthenticatedUser.department === "CS" ? "CE" : "CS"}</option>
                      </select>
                    </>}
                </div>
                <div className="Semester flex flex-col mb-4">
                  <label htmlFor="Semester">Semester</label>
                  {isDisbaled ? (
                    <select name="Semester" id="" value={tempAuthenticatedUser.semester} className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  ) :
                    <>
                      <select name="Semester" id="" value={tempAuthenticatedUser.semester} className="border border-gray-200 px-3 py-2 rounded-lg" onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, semester: e.target.value }) }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </>
                  }
                </div>
                <div className="Phone flex flex-col mb-4">
                  <label htmlFor="Phone">Phone</label>
                  {isDisbaled ? (
                    <input type="text" className="border border-gray-200 px-3 py-2 rounded-lg" name="Phone" id="" value={tempAuthenticatedUser.phone} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />
                  ) : <>
                    <input type="text" className="border border-gray-200 px-3 py-2 rounded-lg" name="Phone" id="" value={tempAuthenticatedUser.phone} onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, phone: e.target.value }) }} />
                  </>}
                </div>
              </div>
            </div>

          </div>
          <div className="myNotes mt-6 bg-white shadow-md  rounded-lg border border-gray-200 py-3.5 px-4">
            <div className="header">
              <h1 className="text-xl font-bold">My Notes</h1>
              <p className="text-gray-500">6 notes uploaded</p>
            </div>
            <div className="notes_Filter flex flex-col md:flex-row gap-2.5 mt-4 mb-5">
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={()=>{getApprovedNotes("All")}}>All Notes ({myNotes.length})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={()=>{getApprovedNotes("Approved")}}>Approved ({notesCount.approved})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={()=>{getApprovedNotes("Pending")}}>Pending ({notesCount.pending})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={()=>{getApprovedNotes("Declined")}}>Declined ({notesCount.declined})</button>
              <input type="text" name="" id="" placeholder="Search notes" className="border border-gray-200 rounded-md w-[44%] px-2.5" />
            </div>
            <hr className="text-gray-400" />
            {!loading ? (
            myNotes.length > 0 ? (
              <div className="notesContainer grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {myNotes.map((note, i) => {
                  return <div key={i} className="border rounded-xl border-green-200 p-4" style={{
                    background: `${note.status === "Approved" ? "#f0fdf4" : note.status == "Declined" ? "#fef2f2" : note.status === "Pending" ? "#fefce8" : ""}`,
                    borderColor: `${note.status === "Approved" ? "#b9f8cf" : note.status == "Declined" ? "oklch(88.5% 0.062 18.334)" : note.status === "Pending" ? "#fff085" : ""}`
                  }}>
                    <div className="header gap-3 sm:flex-row flex justify-between items-center">
                      <h1 className="font-bold text-xl line-clamp-2">{note.title}</h1>
                      <div className="flex items-center">
                        <Edit className="text-gray-600 w-5 cursor-pointer mr-2" />
                        <Delete className="text-gray-600 w-5 cursor-pointer" />
                      </div>
                    </div>
                    <p className="mt-2 text-blue-600">{note.subject.department}</p>
                    <p className="mt-4 text-gray-600 text-ellipsis overflow-hidden line-clamp-2">{note.description}</p>
                    <div className="border rounded-md flex items-center gap-5 p-2 mt-5"
                      style={{ borderColor: `${note.status === "Approved" ? "#b9f8cf" : note.status == "Declined" ? "oklch(88.5% 0.062 18.334)" : note.status === "Pending" ? "#fff085" : ""}` }}
                    >
                      {note.status === "Approved" ? <Verified className="text-green-400" /> : note.status == "Pending"
                        ? <Clock className="text-yellow-600" /> : <CircleX className="text-red-600" />
                      }
                      <div>
                        <p className="font-medium text-sm"
                          style={{ color: `${note.status === "Approved" ? "oklch(62.7% 0.194 149.214)" : note.status == "Declined" ? "oklch(57.7% 0.245 27.325)" : note.status === "Pending" ? "oklch(68.1% 0.162 75.834)" : ""}` }}
                        >{note.status}</p>
                        {note.status == "Approved" || note.status == "Declined" ? (
                          <p className="text-gray-500 text-sm line-clamp-1">{note.status}</p>
                        ) : <p className="text-gray-500 text-sm line-clamp-2">Pending Review</p>}
                      </div>
                    </div>
                    <div className="remark bg-gray-50 mt-4 p-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{note.remarks}</p>
                    </div>
                  </div>
                })}
              </div>
            ) : <p>No Notes Found</p>
          ):<Loader/>}
          </div>

        </div>
      </div>
    ) :
      <div className="flex items-center justify-center h-[100vh]">
        <p className="font-bold text-xl text-center truncate">You are not allowed to access this page. Please signin to access to page</p>
      </div>
  )
}