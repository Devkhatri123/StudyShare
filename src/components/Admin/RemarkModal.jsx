import { useContext, useEffect, useState } from "react"
import { Upload, X } from "lucide-react";
import axios from "axios";
import API_BACKEND_URL from "../../utils/API";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { AdminContext } from "../../ContextApi/AdminContext";

export default function RemarkModal({ currentNote, setCurretNoteIndex, setRemarkModal, setApprovalPendingNotes, ApprovalPendingNotes }) {
    const [loading, setLoading] = useState(false);
    const adminContext = useContext(AdminContext);
    const [remarkRequest, setremarkRequest] = useState({
        id: currentNote.id,
        message: ''
    });
    useEffect(() => {
        if (currentNote) {
            setremarkRequest({ ...remarkRequest, id: currentNote.id });
            document.body.style.overflow = "hidden";
            //  document.body.style.pointerEvents = "none"
        }
        return () => {
            document.body.style.overflow = "scroll";
            //  document.body.style.pointerEvents = "auto"
        }
    }, [currentNote]);

    const sendRemark = async () => {
        if (remarkRequest.message.length == 0) {
            toast.error("Add some message");
            return;
        }
        setLoading(true);
        await axios.post(`${API_BACKEND_URL}/notes/admin/sendRemarkForNote`, remarkRequest, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    toast.success(response.data.message);
                    const filteredNotes = ApprovalPendingNotes.filter((note) => {
                        return note.id != currentNote.id;
                    });
                    setApprovalPendingNotes([...filteredNotes]);
                    setCurretNoteIndex(null)
                    setRemarkModal(false);
                    adminContext.setCount({});
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="h-full no-scrollbar sm:h-fit absolute w-[100%] top-0 z-[9999] modal bg-white rounded-lg sm:top-[50%] sm:translate-y-[-50%]  mx-auto shadow-2xl md:max-w-[46rem] left-0 right-0  lg:max-w-4xl xl:max-w-5xl ">
                <div className="modal_header shadow-sm w-full border-b-[1px] " style={{ borderBottom: "1px solid #f8f9fa" }}>
                    <div className="flex justify-between px-4 py-5">
                        <h1 className="text-xl font-bold">Send Remark - {currentNote.title}</h1>
                        <X onClick={() => { setCurretNoteIndex(null); setRemarkModal(false) }} />
                    </div>
                </div>
                <div className="modal_body">
                    <div className="title px-5 py-3">
                        <p className="mb-1">Title *</p>
                        <input type="text" disabled value={currentNote.title} className="w-full px-3 py-2 text-base rounded-md  border-gray-300" style={{ border: "0.2px solid gray", outline: "none" }} name="title" placeholder="Enter note title"
                        />
                    </div>
                    <div className="Subject mt-1 px-5 py-2">
                        <p className="mb-1">Description *</p>
                        <textarea onChange={(e) => { setremarkRequest({ ...remarkRequest, message: e.target.value }) }} value={remarkRequest.message} className="w-full px-3 py-2 text-base rounded-md  border-gray-300" style={{ border: "0.2px solid gray", outline: "none" }} placeholder="Write Remark..." maxLength={512}></textarea>
                    </div>

                    <div className="upload_footer py-4" style={{ borderTop: "1px solid gray" }}>
                        <div className="flex justify-end mr-2.5">
                            <button className="mr-3 bg-gray-100 text-black px-2.5 rounded-md">cancel</button>
                            {!loading ? (
                                <button onClick={(e) => { sendRemark() }} className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md"><Upload className="text-sm mr-1 w-[15px]" />Send</button>
                            ) : <button className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md"><Loader /></button>}
                        </div>
                    </div>
           </div>
            </div>
        </div>
    )
}