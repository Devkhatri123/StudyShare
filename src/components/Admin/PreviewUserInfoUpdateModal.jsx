import { X } from "lucide-react";

export default function PreviewUserInfoUpdateModal({setPreviewUserInfoUpdate,selectedUpdate}){
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
            <div className="previewInfoUpdateModal w-full max-w-96 fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
              <div className="header flex justify-between">
                <h2 className="font-bold text-lg">Preview Info</h2>
                <X onClick={()=>{setPreviewUserInfoUpdate(false)}}/>
              </div>
              <p className="text-sm text-gray-400">How the profile will look after changes</p>
             <div className="Modal_body overflow-x-scroll">
                <div className="flex justify-between border-gray-200 border-b mt-1.5">
                    <p className="text-sm">Attributes</p>
                     <p className="text-sm">New</p>
                </div>
                <div className="flex justify-between">
                    <div className="old_info text-md">
                    <p>Name</p>
                    <p>Semester</p>
                    <p>Gender</p>
                    <p>Dept</p>
                    <p>Phone</p>
                </div>
                
                <div className="new_info text-end text-md text-green-500">
                    <p>{selectedUpdate.name}</p>
                    <p>{selectedUpdate.semester}</p>
                    <p>{selectedUpdate.gender}</p>
                    <p>{selectedUpdate.department}</p>
                    <p>{selectedUpdate.phone}</p>
                </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                    <button className="bg-gray-900 text-white px-2 p-1.5 rounded-md text-sm">Accept</button>
                    <button className="bg-gray-100 text-black px-2.5 rounded-md text-sm">Reject</button>
                </div>
             </div>
            </div>
        </div>
    )
}