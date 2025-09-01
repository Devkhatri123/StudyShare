import { useContext, useEffect, useState } from "react"
import { Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { AdminContext } from "../../ContextApi/AdminContext";

export default function RemarkModal({ currentNote, setCurretNoteIndex, setRemarkModal, setApprovalPendingNotes, ApprovalPendingNotes }) {
    const [loading, setLoading] = useState(false);
    const adminContext = useContext(AdminContext);
    const [remarkRequest, setremarkRequest] = useState({
        id: "",
        message: ""
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
        if(validateInputs()){
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/notes/admin/sendRemarkForNote`, remarkRequest, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    toast.success(response.data);
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
                if(error.response.status == 404){
                toast.error("Note may already have been approved or declined");
                return;
                }
                toast.error("Error in declining note");
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    const validateInputs = () => {
        if(remarkRequest.message.trim().length == 0){
            toast.error("Description is empty");
            return false;
        }else if(remarkRequest.message.trim().length > 300){
           toast.error("Remark message should be of 300 characters");
           return false;   
        }
        else if (remarkRequest.id.trim().length == 0){
            toast.error("something is wrong. Try again by closing and opening the modal again.");
            return false;
        }
        return true;
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="h-full no-scrollbar sm:h-fit absolute w-[100%] top-0 z-[9999] modal bg-white rounded-lg sm:top-[50%] sm:translate-y-[-50%]  mx-auto shadow-2xl md:max-w-[46rem] left-0 right-0  lg:max-w-3xl xl:max-w-4xl ">
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
                        <p>Message length : {remarkRequest.message.length} / 300</p>
                    </div>

                    <div className="upload_footer py-4" style={{ borderTop: "1px solid gray" }}>
                        <div className="flex justify-end mx-3 sm:mr-2.5 flex-col gap-2.5 sm:flex-row sm:gap-0">
                            <button className="border-black sm:mr-3 bg-gray-100  text-black py-1 px-2.5 rounded-md">cancel</button>
                            {!loading ? (
                                <button onClick={(e) => { sendRemark() }} className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md"><Upload className="text-sm mr-1 w-[15px]" />Send</button>
                            ) : <button className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md w-full sm:w-[70px]" style={{opacity:"0.5"}}><Loader /></button>}
                        </div>
                    </div>
           </div>
            </div>
        </div>
    )
}