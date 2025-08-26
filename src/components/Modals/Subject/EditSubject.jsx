import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import Loader from "../../Loader";
import axios from "axios";
import API_BACKEND_URL from "../../../utils/API";
import { toast } from "react-toastify";
import { isValidSubjectCode } from "../../../utils/Validation";

export default function EditSubject({subject,setShowEditSubjectModal,index,subjects}){
    const [subjectToEdit,setSubjectToEdit] = useState(null);
    const [loading,setLoading] = useState(false);
    let subjectname = useRef();
    useEffect(()=>{
     if(Object.entries(subject).length > 0){
        setSubjectToEdit(subject);
        subjectname.current = subject.subjectName; 
     }else setShowEditSubjectModal(false);
    },[]);
    const Edit = async() => {
        if(validateInput()){
     setLoading(true);
     await axios.put(`${API_BACKEND_URL}/admin/updateSubject`,subjectToEdit,{withCredentials:true})
     .then((response)=>{
        toast.success(response.data);
        setShowEditSubjectModal(false);
        subjects[index] = subjectToEdit;
     }).catch((error)=>{
        if(error.status == 404){
         toast.error("Existing subject not found");
         return;
        }
        toast.error(error.response.data)
     }).finally(()=>{
        setLoading(false);
     })
    }
    }

    const handleSubjectName = (e) => {
     if(e.target.value.length <= 30) setSubjectToEdit({...subjectToEdit,subjectName:e.target.value});
    }

    const handleDescription = (e) => {
     if(e.target.value.length <= 120) setSubjectToEdit({...subjectToEdit,shortDescription:e.target.value});
    }

    const validateInput = () => {
        if (subjectToEdit.subjectName == " " || subjectToEdit.subjectName.trim().length == 0) {
            toast.error("Subject name is empty");
            return false;
        }else if (subjectToEdit.subjectName.trim().length > 30) {
            toast.error("Subject name should be of 30 character only");
            return false;
        }else if (subjectToEdit.shortDescription == " " || subjectToEdit.shortDescription.trim().length == 0) {
            toast.error("Subject description is empty");
            return false;
        }else if (subjectToEdit.shortDescription.trim().length > 120) {
            toast.error("Subject description should be of 120 character only");
            return false;
        }else if(!isValidSubjectCode(subjectToEdit.code,subjectToEdit.department)){
            toast.error("Subject Code is not valid");
            return false;  
        }else if (isNaN(Number(subjectToEdit.semester))) {
            toast.error("Semester can be only a number");
            return false;
        }else if (subjectToEdit.semester <= 0 || subjectToEdit.semester > 8) {
            toast.error("Semester can be between 1 and 8");
            return false;
        }
        return true;
    }
    
    return subjectToEdit != null && (
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}} >
                    <div className={`w-full h-full sm:h-fit max-w-[650px] sm:max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5`}>
                      <div className="header flex justify-between">
                        <h2 className="font-bold text-lg"> Edit Subject - {subjectname.current}</h2>
                        <X onClick={()=>{setShowEditSubjectModal(false)}} className="w-5 text-gray-400"/>
                      </div>
                      <p className="text-sm text-gray-400">Add a new subject to Computer Science department</p>
                     <div className="Modal_body mt-5">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="SubjectName" className="text-sm text-[#4d5564]">Subject Name *</label>
                            <input type="text" name="" id="" placeholder="Subject Name" value={subjectToEdit.subjectName} className="border border-[#ebebeb] py-1.5 pl-1.5 rounded-md" onChange={(e)=>{handleSubjectName(e)}} maxLength={30}/>
                            <p className="text-[14px] text-gray-400 mt-1">Name length : {subjectToEdit.subjectName.length} / 30</p>
                        </div>
                         <div className="flex flex-col my-2">
                            <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Description *</label>
                            <textarea value={subjectToEdit.shortDescription} type="text" name="" id="" placeholder="Subject Description" className="border border-[#ebebeb] py-1.5 pl-1.5  rounded-md" onChange={(e)=>{handleDescription(e)}} maxLength={120}/>
                            <p className="text-[14px] text-gray-400 mt-1">Description length : {subjectToEdit.shortDescription.length} / 120</p>
                        </div>
                        <div className="flex gap-0 flex-col sm:flex-row sm:gap-3">
                         <div className="flex flex-col my-2">
                            <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Code *</label>
                            <input type="text" value={subjectToEdit.code} name="" id="" placeholder="eg.,CS101" className="border border-[#ebebeb] py-1.5 pl-1.5 rounded-md" onChange={(e)=>{setSubjectToEdit({...subjectToEdit,code:e.target.value.replaceAll(" ","").toUpperCase()})}} maxLength={7}/>
                        </div>
                        <div className="flex flex-col my-2 w-full">
                            <label htmlFor="Semester" className="text-sm text-[#4d5564]">Semester *</label>
                            <select value={subjectToEdit.semester} type="text" name="" id="" placeholder="Semester" className="border border-[#ebebeb] py-1.5 pl-1.5  rounded-md" onChange={(e)=>{setSubjectToEdit({...subjectToEdit,semester:Number(e.target.value)})}}>
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
                        <div className="btns flex justify-end gap-2.5 flex-col sm:flex-row">
                            <button className="border-gray-200 border py-2 px-3 rounded-md text-sm">Cancel</button>
                            {!loading ? (
                            <button className="bg-[#d64d0c] text-white py-2 px-3 rounded-md text-sm" onClick={()=>{Edit()}}>Edit Subject</button>
                            ):<button className="bg-[#d64d0c] text-white py-2 px-3 rounded-md text-sm w-full sm:w-20" style={{opacity:"0.5"}}><Loader/></button>}
                            </div>
                      </div>
                    </div>
                </div>
    )
}