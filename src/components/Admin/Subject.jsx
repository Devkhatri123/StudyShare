import axios from "axios";
import { Eye, Plus, Trash } from "lucide-react";
import API_BACKEND_URL from "../../utils/API";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { returnFullFormOfDepartment } from "../../utils/Validation";
import AddSubjectModal from "../Modals/Subject/AddSubjectModal";
import Loader from "../Loader";
import { toast } from "react-toastify";
import ViewSubject from "../Modals/Subject/ViewSubject";
import EditSubject from "../Modals/Subject/EditSubject";

export default function Subject() {

    const [query, setQuery] = useState("");
    const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [subjects, setSubjects] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentSubjectIndex,setCurrentSubjectIndex] = useState(-1);
    const [viewSubjectModal,setViewSubjectModal] = useState(false);
    const [deleteLoading,setDeleteLoading] = useState(false);
    const [currentSubjectIndex2, setCurrentSubjectIndex2] = useState(-1);
    const [showEditSubjectModal,setShowEditSubjectModal] = useState(false);
    const timer = useRef();

    const authContext = useContext(AuthContext);
    useEffect(() => {
        timer.current = setTimeout(() => {
            if (!hasMore) return;
            const getCurrentSubjects = async () => {
                await axios.get(`${API_BACKEND_URL}/subject/adminDepartmentSubjects?pageNumber=${pageNumber}&pageSize=3&query=${query}&department=${authContext.AuthenticatedUser.department}`, { withCredentials: true })
                    .then((response) => {
                        if (pageNumber == 0) setSubjects([...response.data]);
                        else setSubjects((prev) => [...prev, ...response.data]);
                        if (!response.data.length > 0) setHasMore(false);
                    }).catch((error) => {
                        console.log(error);
                    })
            }
            getCurrentSubjects();
        }, 500);

    }, [query, pageNumber])

    const handleSearch = (e) => {
        clearTimeout(timer.current);
        setQuery(e.target.value);
        setHasMore(true)
        setPageNumber(0)
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
    
    const deleteSubject = async(id,i) => {
    setDeleteLoading(true);
    await axios.delete(`${API_BACKEND_URL}/subject/admin/subject/${id}`,{withCredentials:true})
    .then((response)=>{
        toast.success(response.data);
        subjects.splice(i,1)
     }).catch((error)=>{
        console.log(error.response)
     }).finally(()=>{
        setDeleteLoading(false);
        setCurrentSubjectIndex(-1);
     });
    
    
    }

    return (
        <div>
            <div className="UserInfoUpdate_Header bg-[#fffaec] p-3">
                <div className="flex gap-1.5 flex-wrap sm:flex-none justify-between items-center mb-1.5">
                    <div className="flex items-baseline">
                        <svg
                            className="w-6 h-6 sm:w-5 sm:h-5 text-[#7d2e13]"
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
                        <div className="ml-2">
                            <h1 className="text-[#7d2e13] text-2xl font-semibold line-clamp-1">Subject Management</h1>
                            <p className="text-[#c95626] line-clamp-1 text-sm">Manage subjects for {returnFullFormOfDepartment(authContext.AuthenticatedUser.department)} • {subjects.length} {subjects.length <= 1 ? "subject":"subjects"}</p>
                        </div>
                    </div>

                    <div className="header_right w-full sm:w-fit">
                        <button className="flex items-center w-full sm:w-fit justify-center bg-[#d64d0c] text-white px-2.5 py-2 rounded-md text-sm gap-2" onClick={() => { setShowAddSubjectModal(true) }}><Plus className="w-4 h-4" /> Add Subject</button>
                    </div>
                </div>

            </div>
            {showAddSubjectModal && <AddSubjectModal setShowAddSubjectModal={setShowAddSubjectModal} showAddSubjectModal={showAddSubjectModal} setSubjects={setSubjects} department={authContext.AuthenticatedUser.department} />}
            <div className="subjects_body px-5 bg-white py-7 mb-5 ">
                <div className="searchSubjects mb-3">
                    <input type="text" className=" p-1.5 w-full rounded-md border border-gray-300" name="query" id="" placeholder="Search subjects here..." onChange={(e) => { handleSearch(e) }} />
                </div>
                {subjects.length > 0 && (
                    <div className="flex flex-wrap justify-around mx-auto md:justify-start md:gap-x-2.5">
                        {subjects.map((subject, i) => {
                         return <div key={i} className="subject border border-gray-200 mb-4 flex flex-col w-1/1 bg-white rounded-xl sm:flex-[0_0_calc(100%_-_16px)] md:flex-[0_0_calc(50%_-_16px)] lg:flex-[0_0_calc(33.333%_-_16px)] shadow-sm hover:shadow-2xl transition-all duration-300">
                                <div className="subject_header flex items-center justify-between rounded-t-xl py-3 px-2 bg-[#fedfba] ">
                                    <p className="subjectCode text-[#c34510] bg-[#ffedd5] border border-[#fedfba] w-fit rounded-xl px-2 text-sm">{subject.code}</p>
                                    <p className="subjectCode text-[#c34510] bg-[#f4f4f5] border border-[#fedfba] w-fit rounded-xl px-2 text-sm">{subject.status}</p>
                                </div>
                                <div className="subjectBody px-2 pb-9 sm:px-5">
                                    <h1 className="my-2.5 font-bold text-lg leading-[1.3] line-clamp-1 lg:line-clamp-none">{subject.subjectName}</h1>
                                    <div className="flex justify-between overflow-x-scroll no-scrollbar gap-5">
                                        <div className="left">
                                            <p className="text-sm text-gray-600 mb-2">Department</p>
                                            <p className="text-sm text-gray-600 mb-2">Semester</p>
                                            <p className="text-sm text-gray-600 mb-2">Created On</p>
                                            {subject.createdByName != null && (
                                            <p className="text-sm text-gray-600 mb-2">Created by</p>
                                            )}
                                            {subject.editedByName != null && (
                                            <p className="text-sm text-gray-600 mb-2">Edited by</p>
                                            )}
                                             {subject.updatedAt != null && (
                                                <p className="text-sm text-gray-600 mb-2">Edited On</p>
                                            )}
                                        </div>
                                        <div className="right ">
                                            <p className="text-sm mb-2 font-medium line-clamp-1">{returnFullFormOfDepartment(subject.department)}</p>
                                            <p className="text-sm mb-2 font-medium">{subject.semester}</p>
                                            <p className="text-sm mb-2 font-medium">{subject.createdAt}</p>
                                            {subject.createdByName != null && (
                                            <p className="text-sm mb-2 font-medium">{subject.createdByName}</p>
                                            )}
                                            {subject.editedByName != null && (
                                            <p className="text-sm mb-2 font-medium">{subject.editedByName}</p>
                                            )}
                                            {subject.updatedAt != null && (
                                                <p className="text-sm mb-2 font-medium">{subject.updatedAt}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="btns flex-col sm:flex-row flex items-center justify-between mb-3 gap-2">
                                        
                                        {/* Show normal buttons that were not clicked. */}
                                        {  currentSubjectIndex !== i && (
                                        <>
                                        <button className="w-full sm:w-[95%] border border-gray-300 flex justify-center text-sm items-center gap-1.5 py-1 rounded-md" onClick={()=>{setViewSubjectModal(true);setCurrentSubjectIndex2(i);document.body.style.overflow="hidden"}}><Eye className="w-4" />View Detail</button>
                                        <button className="bg-[#ef4444] text-white px-2 py-1 rounded-md w-full sm:w-fit justify-center" onClick={()=>{deleteSubject(subject.subjectId,i);setCurrentSubjectIndex(i)}}><Trash className="w-4 mx-auto" /></button>
                                        </>
                                        )}
                                        {/* SHow loader on clicked button */}
                                        {deleteLoading && currentSubjectIndex == i && (
                                        <>
                                        <button className="w-full sm:w-[95%] border border-gray-300 flex justify-center text-sm items-center gap-1.5 py-1 rounded-md cursor-not-allowed"><Eye className="w-4" />View Detail</button>
                                        <button className="bg-[#ef4444] text-white px-2 py-1 rounded-md w-full sm:w-10" style={{opacity:"0.5"}}><Loader/></button>
                                       </>
                                       )}
                                        </div>
                                        {viewSubjectModal && currentSubjectIndex2 == i && <ViewSubject setViewSubjectModal={setViewSubjectModal} subject={subject} setCurrentSubjectIndex2={setCurrentSubjectIndex2}/>}
                                        {currentSubjectIndex2 == i && showEditSubjectModal && <EditSubject subject={subject} setShowEditSubjectModal={setShowEditSubjectModal} index={i} subjects={subjects}/>}
                                        <button className="w-full bg-[#d64d0c] text-white px-2.5 py-2 rounded-md text-sm" onClick={()=>{setShowEditSubjectModal(true);setCurrentSubjectIndex2(i)}}>Edit Subject</button>
                                </div>
                            </div>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}