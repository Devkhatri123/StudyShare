
import { Star, Download, Eye, Heart, Share, Calendar, User } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

 const Note = ({ note }) => {


  return (
    <div className="w-1/1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 max-w-sm mx-auto"
    style={{maxWidth:"-webkit-fill-available"}}
    >
      <Link to={`/note/${note.id}`}>
      {/* Hero Section */}
      <div className="relative h-48 sm:h-52 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden"
      >
     <img src={`data:image/jpeg;base64,${note.thumbnail}`}
      className="w-full h-52 " style={{objectFit:"cover"}}
      />
        
        {/* Fallback when image fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 hidden items-center justify-center" 
        
        >
         
        </div>

        </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base line-clamp-2 leading-relaxed">{note.description}</p>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
            {note.author?.avatar ? (
              <img
                src={note.author.avatar || "/placeholder.svg"}
                alt={note.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-white">{note.createdBy.name.substring(0,1)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{note.createdBy.name}</p>
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span>{note.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
export default Note;



