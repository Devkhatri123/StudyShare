import { X } from "lucide-react"

export default function ViewSubject({subject,setViewSubjectModal,setCurrentSubjectIndex2}){


   return (
     <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}} >
                <div className={`w-full h-full sm:h-fit max-w-[450px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5`}>
                  <div className="header flex justify-between">
                    <h2 className="font-bold text-xl leading-5.5 sm:leading-normal mb-2 sm:mb-0">{subject.subjectName}</h2>
                    <X onClick={()=>{setViewSubjectModal(false);setCurrentSubjectIndex2(-1);document.body.style.overflow="scroll"}} className="w-5 text-gray-400"/>
                  </div>
                  <p className="text-sm text-gray-400">Subject details</p>
                 <div className="Modal_body mt-5">
                     <div className="flex flex-col my-2">
                        <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Description</label>
                        <p className="text-[14px] text-black mt-1 line-clamp-3">{subject.shortDescription}</p>
                    </div>
                    <div className="flex flex-col leading-4 sm:flex-row sm:gap-10 sm:leading-7">
                     <div className="flex flex-col my-2">
                        <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Subject Code</label>
                         <p className="font-bold">{subject.code}</p>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="Semester" className="text-sm text-[#4d5564]">Semester</label>
                         <p className="font-bold">{subject.semester}</p>
                    </div>
                     <div className="flex flex-col my-2">
                        <label htmlFor="department" className="text-sm text-[#4d5564]">Department</label>
                         <p className="font-bold">{subject.department}</p>
                    </div>
                    </div>
                    <div className="flex flex-col leading-4 sm:flex-row sm:gap-10 sm:leading-7">
                     <div className="flex flex-col my-2">
                        <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Created by</label>
                         <p className="font-medium text-sm">{subject.createdByName}</p>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="Semester" className="text-sm text-[#4d5564]">Created on</label>
                         <p className="font-medium text-sm">{subject.createdAt}</p>
                    </div>
                    </div>
                    {subject.editedByName != null && (
                     <div className="flex flex-col leading-4 sm:flex-row sm:gap-10 sm:leading-7">
                     <div className="flex flex-col my-2">
                        <label htmlFor="SubjectCode" className="text-sm text-[#4d5564]">Edited by</label>
                         <p className="font-medium text-sm" >{subject.editedByName}</p>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="Semester" className="text-sm text-[#4d5564]">Edited on</label>
                         <p className="font-medium text-sm">{subject.updatedAt}</p>
                    </div>
                    </div>
                    )}
                  </div>
                </div>
            </div>
   )
}