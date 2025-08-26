import { FileText, X } from "lucide-react";
import PDFViewer from "../../PDFViewer";
import { useEffect, useState } from "react";
import Note from "../../Note";

export default function PreviewNote({currentNote,setShowPreviewModal,setCurretNoteIndex}){
   const [pdfUrl,setPdfUrl] = useState('');

   useEffect(()=>{
    document.body.style.overflowY = "hidden";
    return () =>  document.body.style.overflowY = "scroll";
   },[])

   useEffect(()=>{
    const convertBase64ToBlob = (base64)=>{
     const bytes = atob(base64);
     const length = bytes.length;
     const uint8array = new Uint8Array(length);
     for(let i = 0; i < length; i++){
      uint8array[i] = bytes.charCodeAt(i);
     }
     return new Blob([uint8array],{type: 'application/pdf'})
    }
    const blob = convertBase64ToBlob(currentNote.notes);
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
   },[currentNote])

    return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000",background:"rgba(0, 0, 0, 0.5)"}}>
     <div className="Modal w-full h-full md:h-fit fixed sm:top-[50%] sm:translate-y-[-50%] bg-white md:max-w-3xl rounded-md p-2.5 lg:max-w-5xl">
        <div className="header flex justify-between px-2">
            <div className="left flex items-center">
                <FileText/>
                <h1 className="ml-2 text-xl font-medium">{currentNote.title}</h1>
            </div>
            <div className="right">
                <X onClick={()=>{setShowPreviewModal(false);setCurretNoteIndex(null)}}/>
            </div>
        </div>
        <div className="description mt-3 mx-2.5">
            <p className=" text-sm text-gray-500" style={{lineBreak:"anywhere"}}>{currentNote.description}</p>
        </div>
        <div className="pdfViewer mt-5">
            <PDFViewer pdfURL={pdfUrl} style={{height:"400px"}}/>
        </div>
     </div>
     </div>
   )
}