
import { Star, Download, Eye, Heart, Share, Calendar, User, Blocks, Flag } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportModal from "./ReportModal";
import { convertBase64ToBlob } from "../utils/Validation";

const Note = ({ note }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');

  return (
    <div className="w-1/1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 max-w-sm mx-auto"
      style={{ maxWidth: "-webkit-fill-available" }}
    >
      <Link to={`/note/${note.id}`}>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 border-b to-indigo-100 overflow-hidden 
        bg-center bg-cover bg-no-repeat h-52 w-full"
        // style={{backgroundImage:`url(${URL.createObjectURL(convertBase64ToBlob(note.thumbnail,"image/jpeg"))})`,}}
        >
          <img src={`data:image/jpeg;base64,${note.thumbnail}`}
            className="w-full h-52 " style={{ objectFit: "cover" }}
          />

        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 pb-0">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {note.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base line-clamp-2 leading-relaxed" style={{lineBreak:"anywhere"}}>{note.description}</p>
          </div>

          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xs sm:text-sm font-semibold text-white">{note.createdBy.username.substring(0, 1)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{note.createdBy.username}</p>
              <div className="flex items-center text-xs sm:text-sm text-gray-500">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span>{note.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="note_bottom flex-col gap-1.5 sm:1 sm:flex-row flex items-center justify-center mb-2">
        <div className="flex w-full text-white bg-[#ef4444] justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3" onClick={() => { setReportType("user"); setShowReportModal(true) }}>
          <User className="w-4 mr-2" />
          <button className="text-sm">Report User</button>
        </div>
        {showReportModal && reportType == "user" && <ReportModal setShowModal={setShowReportModal} reportType={reportType} createdBy={note.createdBy} reportedNote={null} />}
        <div className="flex w-full  justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-3 text-black" onClick={() => { setReportType("note"); setShowReportModal(true) }}>
          <Flag className="w-4 mr-2" />
          <button className="text-sm">Report Note</button>
        </div>
        {showReportModal && reportType == "note" && <ReportModal setShowModal={setShowReportModal} reportType={reportType} createdBy={null} reportedNote={note} />}
      </div>
    </div>
  )
}
export default Note;



