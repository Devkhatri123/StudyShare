import axios from "axios";
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import API_BACKEND_URL from "../../../utils/API";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import { isValidSubjectCode } from "../../../utils/Validation";

export default function AddSubjectModal({ setShowAddSubjectModal, showAddSubjectModal, setSubjects, department }) {
    const [subject, setSubject] = useState({
        subjectName: "",
        shortDescription: "",
        semester: 1,
        code: ""
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (showAddSubjectModal) document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "scroll";
    }, [showAddSubjectModal]);

    const handleSubjectName = (e) => {
        if (e.target.value.length <= 30) setSubject({ ...subject, subjectName: e.target.value });
    }

    const handleDescription = (e) => {
        if (e.target.value.length <= 120) setSubject({ ...subject, shortDescription: e.target.value });
    }

    const AddSubject = async () => {
        if (validateInput()) {

            setLoading(true);
            await axios.post(`${API_BACKEND_URL}/subject/admin/addSubject`, subject, { withCredentials: true })
                .then((response) => {
                    toast.success(response.data.message);
                    setSubjects((prev) => ([...prev, response.data.NewSubject]));
                    setShowAddSubjectModal(false);
                }).catch((error) => {
                    if(error.response.data)  toast.error(error.response.data)
                    else toast.error("Something went wrong");
                }).finally(() => {
                    setLoading(false);
                })
        }
    }

    const validateInput = () => {
        if (subject.subjectName == " " || subject.subjectName.trim().length == 0) {
            toast.error("Subject name is empty");
            return false;
        }else if (subject.subjectName.trim().length > 30) {
            toast.error("Subject name should be of 30 character only");
            return false;
        }else if (subject.shortDescription == " " || subject.shortDescription.trim().length == 0) {
            toast.error("Subject description is empty");
            return false;
        }else if (subject.shortDescription.trim().length > 120) {
            toast.error("Subject description should be of 120 character only");
            return false;
        }else if (!isValidSubjectCode(subject.code.toUpperCase(),department.toUpperCase())){
          toast.error("Subject Code is not valid");
          return false;  
        } else if (isNaN(Number(subject.semester))) {
            toast.error("Semester can be only a number");
            return false;
        }else if (subject.semester <= 0 || subject.semester > 8) {
            toast.error("Semester can be between 1 and 8");
            return false;
        }
        return true;
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }} >
            <div className={`w-full max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5`}>
                <div className="header flex justify-between">
                    <h2 className="font-bold text-lg">Add New Subject</h2>
                    <X onClick={() => { setShowAddSubjectModal(false) }} className="w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Add a new subject to Computer Science department</p>
                <div className="Modal_body mt-5">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="SubjectName" className="text-sm text-[#4d5564]">Subject Name *</label>
                        <input type="text" name="" id="" placeholder="Subject Name" value={subject.subjectName} className="border border-[#ebebeb] py-1.5 pl-1.5 rounded-md" onChange={(e) => { handleSubjectName(e) }} maxLength={30} />
                        <p className="text-[14px] text-gray-400 mt-1">Name length : {subject.subjectName.length} / 30</p>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Description *</label>
                        <textarea value={subject.shortDescription} type="text" name="" id="" placeholder="Subject Description" className="border border-[#ebebeb] py-1.5 pl-1.5  rounded-md" onChange={(e) => { handleDescription(e) }} maxLength={120} />
                        <p className="text-[14px] text-gray-400 mt-1">Description length : {subject.shortDescription.length} / 120</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col my-2">
                            <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Code *</label>
                            <input type="text" value={subject.code} name="" id="" placeholder="eg.,CS101" className="border border-[#ebebeb] py-1.5 pl-1.5 rounded-md" onChange={(e) => { setSubject({ ...subject, code: e.target.value.replaceAll(" ","").toUpperCase() }) }} maxLength={7}/>
                        </div>
                        <div className="flex flex-col my-2 w-full">
                            <label htmlFor="Semester" className="text-sm text-[#4d5564]">Semester *</label>
                            <select value={subject.semester} type="text" name="" id="" placeholder="Semester" className="border border-[#ebebeb] py-1.5 pl-1.5  rounded-md" onChange={(e) => { setSubject({ ...subject, semester: Number(e.target.value) }) }}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                    </div>
                    <div className="btns flex justify-end gap-2.5">
                        <button className="border-gray-200 border py-2 px-3 rounded-md text-sm">Cancel</button>
                        {!loading ? (
                            <button className="bg-[#d64d0c] text-white py-2 px-3 rounded-md text-sm" onClick={() => { AddSubject() }}>Add Subject</button>
                        ) : <button className="bg-[#d64d0c] text-white py-2 px-3 rounded-md text-sm w-28" style={{ opacity: "0.5" }}><Loader /></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}