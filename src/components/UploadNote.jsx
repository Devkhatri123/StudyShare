import { Upload, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ToggleContext } from "../utils/Toggle";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BACKEND_URL from "../utils/API";
import Loader from "./Loader";
import { AuthContext } from "../ContextApi/AuthContext";
export default function UploadNote({ noteToUpdate, setShowDeleteModal }) {
    const thumbnailInputRef = useRef();
    const notePdfRef = useRef();
    const { subjectName, subjectCode } = useParams();
    const [isDragging, setIsDragging] = useState(false);
    const [isNoteDragging, setIsNoteDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const [noteData, setnoteData] = useState(
        {
            id:"",
            title: "",
            description: "",
            subjectcode: "",
            imgThumbNail: null,
            notePdfData: null,
            thumbnailFilename: "",
            pdfNoteFilename: ""
        }
    );

    useEffect(() => {
        if (noteToUpdate != null && Object.entries(noteToUpdate).length > 0) {
            setnoteData((prev) => ({ ...prev, id: noteToUpdate.id }));
            setnoteData((prev) => ({ ...prev, title: noteToUpdate.title }));
            setnoteData((prev) => ({ ...prev, description: noteToUpdate.description }));
            setnoteData((prev) => ({ ...prev, subjectcode: noteToUpdate.subject.code }));
            setnoteData((prev) => ({ ...prev, thumbnailFilename: noteToUpdate.thumbnailFilename }));
            setnoteData((prev) => ({ ...prev, pdfNoteFilename: noteToUpdate.pdfNoteFilename }));

            const convertBase64ToImgBlob = (base64) => {
                const bytes = atob(base64);
                const length = bytes.length;
                const uint8array = new Uint8Array(length);
                for (let i = 0; i < length; i++) {
                    uint8array[i] = bytes.charCodeAt(i);
                }
                return new Blob([uint8array], { type: "image/png" })
            }
            const blob = convertBase64ToImgBlob(noteToUpdate.imgThumbNail);
            setnoteData((prev) => ({ ...prev, imgThumbNail: blob }));

            const convertBase64ToPdfBlob = (base64) => {
                const bytes = atob(base64);
                const length = bytes.length;
                const uint8array = new Uint8Array(length);
                for (let i = 0; i < length; i++) {
                    uint8array[i] = bytes.charCodeAt(i);
                }
                return new Blob([uint8array], { type: "applicaton/pdf" })
            }
            const blob2 = convertBase64ToPdfBlob(noteToUpdate.notePdfData);
            setnoteData((prev) => ({ ...prev, notePdfData: blob2 }));

         }
    }, [noteToUpdate]);

    useEffect(() => {
         if (noteToUpdate == null) {
          setnoteData((prev) => ({...prev,subjectcode:subjectCode}));
         }
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        }
    }, []);


    const handleDrag = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDrageLeave = (e) => {
        setIsDragging(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (!e.dataTransfer.files[0].type.startsWith("image/")) {
            toast.error("Only png/jpg/jpeg images are allowed for thumbnail");
            return;
        }
        const droppedThumbnail = e.dataTransfer.files[0];
        setnoteData((prev)=>({ ...prev, imgThumbNail: droppedThumbnail }));
        setnoteData((prev)=>({ ...prev, thumbnailFilename: droppedThumbnail.name }))
    }

    const pickThumbnail = (e) => {
        if (!e.target.files[0].type.startsWith("image/")) {
            toast.error("Only png/jpg/jpeg images are allowed for thumbnail");
            return;
        }
        setnoteData((prev)=>({ ...prev, imgThumbNail: e.target.files[0] }));
        setnoteData((prev)=>({ ...prev, thumbnailFilename: e.target.files[0].name }))
    }

    // Pdf Upload Drag And Drop
    const handleNotePdfDragEnter = (e) => {
        e.preventDefault();
        setIsNoteDragging(true);
    }

    const handleNotePdfLeave = (e) => {
        e.preventDefault()
        setIsNoteDragging(false);
    }

    const handlePDFDrop = (e) => {
        e.preventDefault();
        setIsNoteDragging(false);
        if (e.dataTransfer.files[0].type === "application/pdf") {
            setnoteData((prev) => ({ ...prev, notePdfData: e.target.files[0] }));
            setnoteData((prev) => ({ ...prev, pdfNoteFilename: e.target.files[0].name }));
        } else {
            toast.error("Only pdf file is allowed for notes");
        }
    }


    const pickNotePdf = (e) => {
        if (e.target.files[0].type === "application/pdf") {
            setnoteData((prev) => ({ ...prev, notePdfData: e.target.files[0] }));
            setnoteData((prev) => ({ ...prev, pdfNoteFilename: e.target.files[0].name }));
        } else {
            toast.error("Only pdf file is allowed for notes");
        }
    }

    const uploadNote = async () => {
        if (authContext.isAuthenticated == false) {
            toast.error("You are not logged in");
            return;
        }

        if (noteData.title.length == 0) {
            toast.error("Title is empty");
            return;
        } if (noteData.description.length == 0) {
            toast.error("Description is empty");
            return;
        }
        const formData = new FormData();
        formData.append("thumbnail", noteData.imgThumbNail);
        formData.append("notes", noteData.notePdfData);
        formData.append("note", new Blob([JSON.stringify({
            id:noteData.id,
            title: noteData.title,
            description: noteData.description,
            subjectCode: noteData.subjectcode,
            thumbnailFilename:noteData.thumbnailFilename,
            pdfNoteFilename:noteData.pdfNoteFilename
        })], { type: "application/json" }));
        setLoading(true);
        await axios.post(`${API_BACKEND_URL}/notes/uploadNote`, formData, {
            withCredentials: true
        })
            .then((response) => {
                toast.success(response.data.message);
               // window.location.reload();
            }).catch((error) => {
                console.log(error)
                if (error.response.data.message) toast.error(error.response.data.message);
                else toast.error(error.message);
            }).finally(() => {
                setLoading(false);
            })
    }


    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="h-full overflow-scroll absolute w-[100%] top-0 z-[9999] modal bg-white rounded-lg   mx-auto shadow-2xl md:max-w-[46rem] md:h-[65%] left-0 right-0 md:translate-y-[25%] lg:max-w-4xl lg:max-h-[700px] xl:max-w-5xl">
                <div className="modal_header shadow-sm w-full border-b-[1px] " style={{ borderBottom: "1px solid #f8f9fa" }}>
                    <div className="flex justify-between px-4 py-5">
                        <h1 className="text-md">Upload Study Notes</h1>
                        <X onClick={() => { setShowDeleteModal(false); }} />
                    </div>
                </div>
                <div className="modal_body">
                    <p className="px-5 py-2">Notes details</p>
                    <div className="title px-5 py-3">
                        <p className="mb-1">Title *</p>
                        <input type="text" className="w-full px-3 py-2 text-base rounded-md  border-gray-300" style={{ border: "0.2px solid gray", outline: "none" }} name="title" placeholder="Enter note title"
                            value={noteData.title}
                            onChange={(e) => { setnoteData({ ...noteData, title: e.target.value }) }}
                        />
                    </div>
                    <div className="Subject mt-1 px-5 py-2">
                        <p className="mb-1">Description *</p>
                        <textarea value={noteData.description} onChange={(e) => { setnoteData({ ...noteData, description: e.target.value }) }} className="w-full px-3 py-2 text-base rounded-md border-gray-300" name="description" id="" style={{ border: "0.2px solid gray", outline: "none" }} placeholder="Describe your notes..."></textarea>
                    </div>

                    {/*Thumbnail Upload */}
                    <div className="upload_thumbnail mt-3 px-5 py-3">
                        <div htmlFor="upload_thumbnail">Upload Thumbnail *</div>
                        <div className="upload_Area_Thumbnail mt-2 border-2 border-gray-300 border-dashed w-full rounded-lg" style={{ border: `${isDragging ? "1px solid green" : ""}` }} onDragEnter={(e) => { handleDrag(e) }} onDragLeave={(e) => { handleDrageLeave(e) }} onDragOver={(e) => { handleDrag(e) }} onDrop={(e) => { handleDrop(e) }} accept="image/*">
                            <div className="flex justify-center flex-col items-center py-5 rounded-md" onClick={() => thumbnailInputRef.current.click()}>
                                <Upload />
                                <p className="mt-3">Drop files here or click to browse</p>
                                <p className="text-sm mb-2" style={{ color: "gray" }}>Note: Only Png/Jpg/Jpeg Files are allowed</p>
                                <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md py-1.5 px-2.5 text-sm font-medium">Chose File</button>
                                <input ref={thumbnailInputRef} onChange={(e) => pickThumbnail(e)} type="file" className="hidden" />
                            </div>
                        </div>
                        {noteData.imgThumbNail != null &&
                            <div className="flex justify-between mt-4 rounded-sm p-3.5 shadow-md" style={{ border: "0.2px gray" }}>
                                <div className="flex gap-3">
                                    <img src={URL.createObjectURL(noteData.imgThumbNail)} style={{ height: "30px", width: "30px" }} />
                                    <p className="truncate">{noteData.thumbnailFilename}</p>
                                </div>
                                <X />
                            </div>
                        }
                    </div>


                    {/* pdfUpload */}
                    <div className="upload_Note mt-3 px-5 py-3">
                        <div htmlFor="upload_Note">Upload Notes *</div>
                        <div className="upload_Area_note mt-2 border-2 border-gray-300 border-dashed w-full rounded-lg" onClick={() => notePdfRef.current.click()} style={{ border: `${isNoteDragging ? "1px solid green" : "2px solid gray"}`, borderStyle: `${isNoteDragging ? "solid" : "dashed"}` }} onDragEnter={(e) => { handleNotePdfDragEnter(e) }} onDragOver={(e) => { handleNotePdfDragEnter(e) }} onDragLeave={(e) => { handleNotePdfLeave(e) }} onDrop={(e) => { handlePDFDrop(e) }}>
                            <div className="flex justify-center flex-col items-center py-5 rounded-md">
                                <Upload />
                                <p className="mt-3">Drop files here or click to browse</p>
                                <p className="text-sm mb-2" style={{ color: "gray" }}>Note: Only Pdf File are allowed</p>
                                <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md py-1.5 px-2.5 text-sm font-medium">Chose File</button>
                                <input onChange={(e) => pickNotePdf(e)} ref={notePdfRef} type="file" className="hidden" />
                            </div>
                        </div>
                        {noteData.notePdfData != null &&
                            <div className="flex justify-between mt-4 rounded-sm p-3.5 shadow-md" style={{ border: "0.2px gray" }}>
                                <div className="flex gap-1 items-center">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <p>{noteData.pdfNoteFilename}</p>
                                </div>
                                <X />
                            </div>
                        }
                    </div>



                    <div className="upload_footer py-4" style={{ borderTop: "1px solid gray" }}>
                        <div className="flex justify-end mr-2.5">
                            <button className="mr-3 bg-gray-100 text-black px-2.5 rounded-md">cancel</button>
                            {!loading ? (
                                <button className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md" onClick={() => uploadNote()}><Upload className="text-sm mr-1 w-[15px]" />Upload Note</button>
                            ) : <button className="flex bg-gray-900 text-white px-2 p-1.5 rounded-md" disabled><Loader /></button>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}