
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
      className="w-full h-52"
      />
        
        {/* Fallback when image fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 hidden items-center justify-center" 
        
        >
          {/* <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-blue-700 font-medium text-sm">{note.category}</span>
          </div> */}
        </div>

        {/* Rating Badge */}
        {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-700">{note.rating}</span>
        </div> */}

        {/* Category Badge */}
        {/* <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {note.category}
        </div> */}
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

        {/* Stats Row */}
        {/* <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{note.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{note.downloads}</span>
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-500 transition-colors group">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-xs sm:text-sm">{note.likes}</span>
            </button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors p-1 hover:bg-blue-50 rounded-full">
              <Share className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg text-xs sm:text-sm">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>View</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm font-medium">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Download</span>
            </button>
          </div>
        </div> */}
      </div>
      </Link>
    </div>
  )
}
export default Note;



// // Notes Grid Component to display multiple notes
// const NotesGrid = ({ notes = [] }) => {
//   // Sample notes data if none provided
//   const sampleNotes = [
//     {
//       id: 1,
//       title: "Object-Oriented Programming Concepts",
//       description: "Classes, objects, inheritance, polymorphism, and encapsulation",
//       author: { name: "Sarah Johnson", initials: "SJ" },
//       date: "2024-03-12",
//       likes: 76,
//       views: 234,
//       downloads: 45,
//       rating: 4.8,
//       category: "Programming",
//     },
//     {
//       id: 2,
//       title: "Data Structures and Algorithms",
//       description: "Arrays, linked lists, stacks, queues, trees, and sorting algorithms",
//       author: { name: "Mike Chen", initials: "MC" },
//       date: "2024-03-10",
//       likes: 92,
//       views: 312,
//       downloads: 67,
//       rating: 4.9,
//       category: "Algorithms",
//     },
//     {
//       id: 3,
//       title: "Database Design Principles",
//       description: "Normalization, relationships, indexing, and query optimization",
//       author: { name: "Emily Davis", initials: "ED" },
//       date: "2024-03-08",
//       likes: 58,
//       views: 189,
//       downloads: 34,
//       rating: 4.6,
//       category: "Database",
//     },
//   ]

//   const notesToDisplay = notes.length > 0 ? notes : sampleNotes

//   return (
//     <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {notesToDisplay.map((note) => (
//           <Note key={note.id} note={note} />
//         ))}
//       </div>

//       {/* Load More Button */}
//       <div className="text-center mt-8">
//         <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm hover:shadow-md">
//           Load More Notes
//         </button>
//       </div>
//     </div>
//   )
// }

// export default NotesGrid
