import { Check, CircleX, Clock, Cross, Delete, Edit, Info, Save, Settings, Timer, User, Verified, Watch, X } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import API_BACKEND_URL from "../utils/API";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DeleteNoteModal from "./DeleteNoteModal";
import { Link, useLocation } from "react-router-dom";
import UploadNote from "./UploadNote";
import Loader from "./Loader";
import { isValidEmail } from "../utils/Validation";
import ChangeEmail from "./ChangeEmail";

export default function Profile() {
  const [isDisbaled, setIsDisabled] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNoteIndex, setcurrentNoteIndex] = useState(null);
  const authContext = useContext(AuthContext);
  const [myNotes, setMyNotes] = useState([]);
  const [noteStatus, setNoteStatus] = useState({ status: "All", temp: "All" });
  const [loading, setLoading] = useState(true);
  const [tempAuthenticatedUser, setAuthenticatedUser] = useState(null);
  const [tempAuthenticatedUserLoading,setTempAuthenticatedUserLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAccountRemarkMessage, setShowAccountRemarkMessage] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const timer = useRef();
  const [changeEmailLoading,setChangeEmailLoading] = useState(false);
  const [showChangeEmailModal,setShowChangeEmailModal] = useState(false);
  const [notesCount, setnotesCount] = useState({
    Approved: 0,
    Pending: 0,
    Declined: 0
  });
  const [accountStatus, setAccountStatus] = useState({});
  const location = useLocation();

  useEffect(()=>{
    if(authContext.AuthenticatedUser != null){
    const getProfile = async() => {
      await axios.get(`${API_BACKEND_URL}/profile/${location.state.userEmail}`,{withCredentials:true})
      .then((response)=>{
       console.log(response)
        setAuthenticatedUser(response.data.profile);
      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        setTempAuthenticatedUserLoading(false);
      })
    }
    getProfile();
  }
  },[])


  useEffect(() => {
    getAccountStatus();
  }, [noteStatus]);

  useEffect(() => {
    if (tempAuthenticatedUser != null) getMyNotes();
  }, [tempAuthenticatedUser, pageNumber, hasMore])

  const getMyNotes = async () => {
    timer.current = setTimeout(async () => {
      if (!hasMore) return;
      await axios.get(`${API_BACKEND_URL}/notes/myNotes?userId=${tempAuthenticatedUser.id}&status=${noteStatus.status}&pageNumber=${pageNumber}&limit=4`, { withCredentials: true })
        .then((response) => {
          if (!response.data.myNotes.length > 0) setHasMore(false);
          setCount(response.data.count)
          if (noteStatus.temp === noteStatus.status) {
            setMyNotes((prev) => [...prev, ...response.data.myNotes]);
          } else if (noteStatus.status !== noteStatus.temp) {
            setMyNotes([...response.data.myNotes]);
            setNoteStatus((prev) => ({
              ...prev,
              temp: prev.status,
            }));
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        });
    }, 600);
  }

  const updateInfo = async () => {
    if(!isValidEmail(tempAuthenticatedUser.universityEmail)){
      toast.error("Email is not valid");
      return;
    }
    setSaveLoading(true);
    if(showChangeEmailModal) setChangeEmailLoading(true);
    await axios.put(`${API_BACKEND_URL}/profile/${tempAuthenticatedUser.id}`, tempAuthenticatedUser, { withCredentials: true })
      .then((response) => {
        toast.success(response.data);
        setAccountStatus({ status: "Pending", remark: "Update Request Pending Review" })
        setIsDisabled(true);
      }).catch((error) => {
        toast.error(error.response.data)
        console.log(error);
      }).finally(() => {
        setSaveLoading(false);
        setChangeEmailLoading(false);
      })
  }

  useEffect(() => {

    // Get Count of Approved notes
    const approvedNotes = myNotes.filter((note) => {
      return note.status === "Approved";
    });
    setnotesCount((Prev) => ({ ...Prev, approved: approvedNotes.length }));

    // Get Count of Pending notes
    const pendingNotes = myNotes.filter((note) => {
      return note.status === "Pending"
    });
    setnotesCount((Prev) => ({ ...Prev, pending: pendingNotes.length }));
    // Get Count of Declined notes
    const declinedNotes = myNotes.filter((note) => {
      return note.status === "Declined"
    });
    setnotesCount((Prev) => ({ ...Prev, declined: declinedNotes.length }));
  }, [myNotes]);


  const getCategoryNotes = (type) => {
    if (type !== noteStatus.status) {
      setPageNumber(0);
      setNoteStatus((prev) => ({
        ...prev,
        temp: prev.status,
        status: type
      }));
      setHasMore(true);
     }
  }

  const handleScroll = () => {
    if (hasMore && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPageNumber((Prev) => Prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setCount = (count) => {
    if (!count.Approved) setnotesCount((prev) => ({ ...prev, Approved: 0 }));
    else if (count.Approved) setnotesCount((prev) => ({ ...prev, Approved: count.Approved }));
    if (!count.Declined) setnotesCount((prev) => ({ ...prev, Declined: 0 }));
    else if (count.Declined) setnotesCount((prev) => ({ ...prev, Declined: count.Declined }));
    if (!count.Pending) setnotesCount((prev) => ({ ...prev, Pending: 0 }));
    else setnotesCount((prev) => ({ ...prev, Pending: count.Pending }));
  }

  const getAccountStatus = () => {
    if(tempAuthenticatedUser != null && tempAuthenticatedUser.id === authContext.AuthenticatedUser.id){
    axios.get(`${API_BACKEND_URL}/profile/UserInfoUpdateRequestStatus/${tempAuthenticatedUser.id}`, { withCredentials: true })
      .then((response) => {
        if (response.data.status == "Declined") {
          setAccountStatus({ status: "Declined", remark:"Reason: "+response.data.remark });
        } else if (response.data.status == "Approved") setAccountStatus({ status: "Approved", remark: "Your Update Request was Approved,changes has been applied" });
        else setAccountStatus(response.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    if(tempAuthenticatedUser != null && tempAuthenticatedUser.id === authContext.AuthenticatedUser.id){
    if (accountStatus.status === "Approved" || accountStatus.status === "Declined") {
      axios.delete(`${API_BACKEND_URL}/profile/UpdateInfoInfo/${tempAuthenticatedUser.id}`, { withCredentials: true })
        .then((response) => {
        //  setAccountStatus({});
        }).catch((error) => {
          console.log(error);
        });
    }
  }
  }, [tempAuthenticatedUser, accountStatus]);


  const editNote = (id, idx) => {
    axios.get(`${API_BACKEND_URL}/notes/note/${id}`)
      .then((response) => {
        setNoteToUpdate(response.data);
        setcurrentNoteIndex(idx);
        setShowUploadModal(true);
      }).catch((error) => {
        console.log(error);
      })
  }


  
  return (
    authContext.AuthenticatedUser != null ? (
      !tempAuthenticatedUserLoading ? (
      tempAuthenticatedUser != null ? (
     (tempAuthenticatedUser.accountStatus !== "Blocked" && tempAuthenticatedUser.id === authContext.AuthenticatedUser.id) || (authContext.AuthenticatedUser.roles.includes("ADMIN") || (authContext.AuthenticatedUser.roles.includes("MANAGER"))) ? (
      <div className="bg-gray-50" style={{ fontFamily: "Geist" }}>
        <nav className="bg-white border-b border-gray-200 px-8 py-2.5 ">

          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="left flex items-center">
              <Link to={"/"}>
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
              </Link>
              <h1 className="text-[1.3em] hidden sm:block  font-bold ml-3">My Profile</h1>
            </div>

          </div>
        </nav>
        <div className="body max-w-6xl mx-auto px-2 sm:px-5 py-3">

          {/* Showing the status of update info request */}
          {Object.entries(accountStatus).length > 0 && (
            <div className="status mb-3 gap-2 flex px-3 rounded-md py-2.5" style={{ background: `${accountStatus.status == "Declined" ? "#fef2f2" : `${accountStatus.status == "Approved" ? "#f0fdf4" : "#fefce8"}`}` }}>
              {accountStatus.status == "Declined" ? <X className="w-4" /> : accountStatus.status == "Approved" ? <Check className="w-4" /> : <Info className="w-4" />}
              <p>{accountStatus.remark}</p>
            </div>
          )}
          <div className="info bg-white shadow-sm rounded-lg border border-gray-200 py-3.5 px-4">
            <div className="info_header flex-col sm:flex-row flex justify-between items-center">
              <div className="info_header_left flex-col text-center sm:flex-row sm:text-left flex items-center gap-3.5">
                <div className="rounded-full bg-blue-100 p-3.5">
                  <User className="text-blue-600 w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold truncate">{tempAuthenticatedUser.fullname}</h1>
                  <p className="">Dha Suffa University</p>
                </div>
              </div>
              {tempAuthenticatedUser.id === authContext.AuthenticatedUser.id && (
              <div className="flex-col mt-5 w-full sm:w-fit sm:flex-row sm:mt-0 flex items-center">
              {!Object.entries(accountStatus).length > 0 && !tempAuthenticatedUser.emailVerified && (
              <>
              {showChangeEmailModal && <ChangeEmail setAuthenticatedUser={setAuthenticatedUser} tempAuthenticatedUser={tempAuthenticatedUser} updateEmail={updateInfo} setShowModal={setShowChangeEmailModal} loading={changeEmailLoading}/>}
              <button className="mr-2 w-full sm:w-fit bg-gray-50 border border-gray-200 py-2 px-2 rounded-md" onClick={(e)=>{setShowChangeEmailModal(true);}}>Change Email</button>
              </>
              )}
              
              {accountStatus == null || accountStatus.status !== "Pending" && (
                tempAuthenticatedUser?.accountStatus == "Active" && tempAuthenticatedUser.emailVerified == true && tempAuthenticatedUser.enabled == true ? (
                  isDisbaled ? (
                    <div className="right_disabled bg-gray-900 justify-center w-full gap-1.5 mt-4 sm:w-fit sm:mt-0 px-4 py-2 rounded-md flex items-center cursor-pointer" onClick={() => setIsDisabled(false)}>
                      <Edit className="text-white w-4 h-4" />
                      <button className=" text-white">Edit Profile</button>
                    </div>

                  ) :
                    <div className="right_enabled flex gap-2.5 mt-5 flex-col sm:mt-0 sm:flex-row w-full sm:w-fit">
                      {!saveLoading ? (
                        <div className="flex text-white p-2.5 rounded-md justify-center cursor-pointer" onClick={() => { updateInfo() }} style={{ background: "#16a34a" }}>
                          <>
                            <Save className="w-4" />
                            <button className="ml-1" >Save</button>
                          </>
                        </div>
                      ) : <div className="flex text-white p-2.5 rounded-md justify-center cursor-pointer"><button className="ml-1" disabled><Loader /></button></div>}
                      <div className="flex items-center text-white p-2.5 rounded-md justify-center cursor-pointer" style={{ background: "#6b7280" }} onClick={() => setIsDisabled(true)}>
                        <X className="w-4" />
                        <button className="ml-2">Cancel</button>
                      </div>
                    </div>

                ) : <div className="right_disabled group relative bg-gray-300 justify-center w-full gap-1.5 mt-4 sm:w-fit sm:mt-0 px-4 py-2 rounded-md flex items-center cursor-pointer" onMouseOver={() => { setShowAccountRemarkMessage(true) }} onMouseLeave={() => { setShowAccountRemarkMessage(false) }}>
                  <Edit className="text-white w-4 h-4" />
                  <button className=" text-white">Edit Profile</button>
                  {showAccountRemarkMessage && (
                    <div className="p-3 max-w-32 block absolute group-hover:block mt-5 top-7 right-0 bg-white shadow-md rounded-lg">
                      <p className="text-black">{tempAuthenticatedUser.accountRemarks}</p>
                    </div>
                  )}
                </div>
              )}
              <div>
              </div>
              </div>
              )}
            </div>
            <div className="info_inputs flex flex-col mt-8 gap-2.5 sm:flex-row">
              <div className="leftInputs w-full sm:w-[50%]">
                <div className="fullnameInput flex flex-col mb-4">
                  <label htmlFor="Fullname">Fullname</label>
                  {isDisbaled ? (
                    <input type="text" name="fullname" className="border border-gray-200 px-3 py-2 rounded-lg" id="" value={tempAuthenticatedUser.fullname} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />
                  ) : <>
                    <input type="text" name="fullname" className="border border-gray-200 px-3 py-2 rounded-lg" id="" value={tempAuthenticatedUser?.fullname} onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, fullname: e.target.value }) }} />
                  </>}
                </div>

                <div className="emailInput flex flex-col mb-4">
                  <label htmlFor="email">Email</label>
                  {isDisbaled ? (
                  <input type="email" className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" name="email" id="" value={tempAuthenticatedUser.universityEmail} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />
                  ):  <input type="email" className="border border-gray-200 px-3 py-2 rounded-lg" name="email" id="" value={tempAuthenticatedUser.universityEmail} onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, universityEmail: e.target.value }) }}/>}
                </div>

                <div className="GenderInput flex flex-col mb-4">
                  <label htmlFor="Gender">Gender</label>
                  {isDisbaled ? (
                    <select name="gender" id="" className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }}>
                      <option value={tempAuthenticatedUser.gender}>{tempAuthenticatedUser.gender}</option>
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
                    <input type="text" className="border border-gray-200 px-3 py-2 rounded-lg" name="Phone" id="" value={tempAuthenticatedUser.contact} disabled style={{ background: `${isDisbaled ? "rgb(249 250 251 /1)" : ""}` }} />
                  ) : <>
                    <input type="text" className="border border-gray-200 px-3 py-2 rounded-lg" name="Phone" id="" value={tempAuthenticatedUser.contact} onChange={(e) => { setAuthenticatedUser({ ...tempAuthenticatedUser, contact: e.target.value }) }} />
                  </>}
                </div>
              </div>
            </div>

          </div>
          <div className="myNotes mt-6 bg-white shadow-md  rounded-lg border border-gray-200 py-3.5 px-4">
            <div className="header">
              <h1 className="text-xl font-bold">My Notes</h1>
              <p className="text-gray-500">{notesCount.Approved + notesCount.Pending + notesCount.Declined} notes uploaded</p>
            </div>
            <div className="notes_Filter flex flex-col md:flex-row gap-2.5 mt-4 mb-5">
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={() => { getCategoryNotes("All") }}>All Notes ({notesCount.Approved + notesCount.Pending + notesCount.Declined})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={() => { getCategoryNotes("Approved") }}>Approved ({notesCount.Approved})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={() => { getCategoryNotes("Pending") }}>Pending ({notesCount.Pending})</button>
              <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2" onClick={() => { getCategoryNotes("Declined") }}>Declined ({notesCount.Declined})</button>
              
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
                        {authContext.AuthenticatedUser.id === tempAuthenticatedUser.id && (
                        note.status !== "Pending" && authContext.AuthenticatedUser.accountStatus !== "Blocked" && (
                          <div className="flex items-center">
                            <Edit className="text-gray-600 w-5 cursor-pointer mr-2" onClick={() => editNote(note.id, i)} />
                            <Delete className="text-gray-600 w-5 cursor-pointer" onClick={() => { setShowDeleteModal(true); setcurrentNoteIndex(i) }} />
                          </div>
                        )
                       )}
                        {showDeleteModal && currentNoteIndex == i && <DeleteNoteModal setShowDeleteModal={setShowDeleteModal} setcurrentNoteIndex={setcurrentNoteIndex} noteID={note.id} Notes={myNotes} setNotes={setMyNotes} />}
                        {showUploadModal && noteToUpdate != null && currentNoteIndex == i && <UploadNote noteToUpdate={noteToUpdate} setShowUploadModal={setShowUploadModal} />}
                     
                        </div>
                      <p className="mt-2 text-blue-600">{note.subject.department}</p>
                      <p className="mt-4 text-gray-600 text-ellipsis overflow-hidden line-clamp-2" style={{ lineBreak: "anywhere" }}>{note.description}</p>
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
            ) : <Loader />}
          </div>

        </div>
      </div>
      ):<div className="flex items-center justify-center h-[100vh] flex-col">
        <p className="font-bold text-xl text-center truncate">Account is blocked, you are not allowed to view this page</p>
        
      </div>
      ):
        <div className="flex items-center justify-center h-[100vh]">
        <p className="font-bold text-xl text-center truncate">Something went wrong. User not found</p>
      </div>
      ):
        <div className="flex items-center justify-center h-[100vh]">
        <Loader/>
      </div>
    ) :
      <div className="flex items-center justify-center h-[100vh]">
        <p className="font-bold text-xl text-center truncate">Please signin to access to page</p>
      </div>
  )
}