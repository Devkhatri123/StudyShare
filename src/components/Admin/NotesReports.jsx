import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import API_BACKEND_URL from "../../utils/API";
import { BlocksIcon, StopCircle } from "lucide-react";
import ViewNoteReports from "../Modals/Notes/ViewNoteReports";
import { toast } from "react-toastify";
import NoteRemoveReasonModal from "../Modals/Notes/NoteRemoveReasonModal";

export default function NotesReport() {
    const [loading, setLoading] = useState(false);
    const [reportedNotes, setReportedNotes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [clickedReportIndex, setClickedReportIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [discardLoading,setDiscardLoading] = useState(false);
    const [removalReason,setRemovalReason] = useState('');
    const [showNoteRemovalReasonModal,setShowNoteRemovalReasonModal] = useState(false);
    const [removeNoteLoading,setRemoveNoteLoading] = useState(false);

    useEffect(() => {
        if (!hasMore) return;
        const getReportedNotes = async () => {
            await axios.get(`${API_BACKEND_URL}/report/note/all?pageNumber=${pageNumber}&limit=${3}`, { withCredentials: true })
                .then((response) => {
                    setReportedNotes((prev) => [...prev, ...response.data]);
                    if (!response.data.length > 0) setHasMore(false);
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false);
                })
        }
        getReportedNotes();
    }, [pageNumber]);

    const handleScroll = () => {
        if (hasMore && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPageNumber((Prev) => Prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Discard Note reports
    const discardNoteReports = async(noteID) => {
     setDiscardLoading(true);
     await axios.delete(`${API_BACKEND_URL}/admin/report/note/${noteID}`,{withCredentials:true})
     .then((response)=>{
        reportedNotes.splice(clickedReportIndex,1);
        toast.success(response.data);
     }).catch((error)=>{
        toast.error(error.response.data);
        console.log(error);
     }).finally(()=>{
       setDiscardLoading(false);
     })
    }

    // Remove Note
    const removeNote = async(noteId) => {
     setRemoveNoteLoading(true);
     await axios.post(`${API_BACKEND_URL}/admin/remove/note/${noteId}?noteRemovalReason=${removalReason}`,{},{withCredentials:true})
     .then((response)=>{
        reportedNotes.splice(clickedReportIndex,1);
        toast.success(response.data);
        setShowNoteRemovalReasonModal(false);
     }).catch((error)=>{
        console.log(error);
     }).finally(()=>{
        setRemoveNoteLoading(false);
     })
    }
    return (
        <div>
            <div className="noteReports_header bg-[#fffaec] p-3">
                <div className="flex gap-1.5 flex-wrap sm:flex-none justify-between items-center mb-1.5">
                    <div className="flex items-baseline">
                        <div className="ml-2">
                            <h1 className="text-[#7d2e13] text-2xl font-semibold line-clamp-1">Notes Report</h1>
                            <p className="text-[#c95626] line-clamp-1 text-sm">Manage Reports for Notes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body bg-white p-5 mb-2">
                {reportedNotes.length > 0 ? (
                    reportedNotes.map((reportedNote, i) => {
                        return <div key={i} className="update mb-2.5 bg-[#fef1f2] gap-3 sm:gap-0 flex items-center flex-col sm:flex-row justify-between border border-gray-200 rounded-lg px-2 py-3 hover:shadow-xl">
                            <div className="left w-full sm:w-fit flex">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-xs sm:text-sm font-semibold text-white">{reportedNote.noteName.substring(0, 1)}</span>
                                </div>
                                <div className="ml-2">
                                    <h1 className="font-bold text-[#7f1d1d]">{reportedNote.noteName}</h1>
                                    <div className="truncate">
                                        <p className="text-sm truncate text-[#7f1d1d]">{reportedNote.subjectName}</p>
                                        <p className="text-xs text-white bg-[#ef4444] w-fit px-2 rounded-lg text-center">{reportedNote.reportCount} Reports</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right w-full flex-col sm:w-fit sm:flex-row flex items-center gap-2">
                                <div className="flex w-full justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={(e) => { setClickedReportIndex(i); setShowModal(true); document.body.style.overflow = "hidden" }}>

                                    <StopCircle className="w-4 mr-2" />
                                    <button className="text-sm">View Reports</button>
                                </div>
                                <div className="flex w-full text-white bg-[#ef4444] justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={() => { setShowNoteRemovalReasonModal(true); setClickedReportIndex(i); }}>
                                    <BlocksIcon className="w-4 mr-2" />
                                    <button className="text-sm">Remove Note</button>
                                </div>
                                {discardLoading && clickedReportIndex == i ? (
                                     <div className="flex text-white bg-black justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3 w-32">
                                      <Loader/>
                                </div>
                                ):<div className="flex w-full text-white bg-black justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={() => { setClickedReportIndex(i);setDiscardLoading(true);discardNoteReports(reportedNote.noteID) }}>
                                    <button className="text-sm">Discard Reports</button>
                                </div>
                                }
                                
                            </div>
                             {showModal && clickedReportIndex != null && clickedReportIndex == i && <ViewNoteReports setShowModal={setShowModal} noteId={reportedNote.noteID} reportedNote={reportedNote} />}
                             {showNoteRemovalReasonModal && clickedReportIndex != null && clickedReportIndex == i && <NoteRemoveReasonModal removeNote={removeNote} removalReason={removalReason} setRemovalReason={setRemovalReason} setShowModal={setShowNoteRemovalReasonModal} loading={removeNoteLoading} noteId={reportedNote.noteID}/>}
                        </div>
                    })
                ) : <p>No Reports Found</p>}
                {loading && <Loader />}
            </div>
        </div>
    )
}