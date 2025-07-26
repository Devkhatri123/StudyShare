import { CircleX, Clock, Cross, Delete, Edit, Settings, Timer, User, Verified, Watch } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [isDisbaled,setIsDisabled] = useState(true);
  const userNotes = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      subject: "Computer Science",
      description:
        "Comprehensive notes covering arrays, linked lists, trees, and sorting algorithms with practical examples and code implementations.",
      uploadDate: "2024-01-15",
      views: 245,
      downloads: 89,
      visibility: "public",
      status: "approved",
      tags: ["algorithms", "data-structures", "programming"],
      reviewDate: "2024-01-16",
      reviewNote: "Excellent content with clear explanations and examples.",
    },
    {
      id: 2,
      title: "Calculus II - Integration Techniques",
      subject: "Mathematics",
      description:
        "Detailed notes on integration by parts, substitution, and partial fractions with step-by-step solutions.",
      uploadDate: "2024-01-10",
      views: 156,
      downloads: 67,
      visibility: "public",
      status: "approved",
      tags: ["calculus", "integration", "mathematics"],
      reviewDate: "2024-01-11",
      reviewNote: "Well-structured mathematical content.",
    },
    {
      id: 3,
      title: "Organic Chemistry Lab Reports",
      subject: "Chemistry",
      description:
        "Complete lab reports and procedures for organic chemistry experiments including synthesis and analysis.",
      uploadDate: "2024-01-05",
      views: 0,
      downloads: 0,
      visibility: "public",
      status: "pending",
      tags: ["chemistry", "lab", "organic"],
      reviewNote: "Under review by our content moderation team.",
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      subject: "Computer Science",
      description: "Introduction to ML concepts, supervised and unsupervised learning, with Python implementations.",
      uploadDate: "2023-12-20",
      views: 312,
      downloads: 145,
      visibility: "public",
      status: "approved",
      tags: ["machine-learning", "python", "ai"],
      reviewDate: "2023-12-21",
      reviewNote: "High-quality technical content.",
    },
    {
      id: 5,
      title: "Physics Quantum Mechanics Notes",
      subject: "Physics",
      description: "Advanced quantum mechanics concepts and problem-solving techniques.",
      uploadDate: "2024-01-08",
      views: 0,
      downloads: 0,
      visibility: "public",
      status: "declined",
      tags: ["physics", "quantum", "mechanics"],
      reviewDate: "2024-01-09",
      reviewNote: "Content needs more detailed explanations and proper citations. Please revise and resubmit.",
    },
    {
      id: 6,
      title: "Database Design Principles",
      subject: "Computer Science",
      description: "Comprehensive guide to database normalization, ER diagrams, and SQL optimization.",
      uploadDate: "2024-01-18",
      views: 0,
      downloads: 0,
      visibility: "public",
      status: "pending",
      tags: ["database", "sql", "design"],
      reviewNote: "Currently being reviewed for technical accuracy.",
    },
  ]
  return (
    <div className="bg-gray-50" style={{ fontFamily: "Geist" }}>
      <nav className="bg-white border-b border-gray-200 px-8 py-2.5 ">

        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="left flex items-center">

            <div className="bg-blue-600 max-w-fit p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>

            </div>
            <h1 className="text-[1.3em] hidden sm:block  font-bold ml-3">My Profile</h1>
          </div>
          <div className="right flex items-center gap-1 cursor-pointer rounded-md hover:bg-gray-100 py-1.5 px-3 transition-colors duration-300">
            <Settings className="w-4" /> <button className="" > Setting</button>
          </div>
        </div>
      </nav>
      <div className="body max-w-6xl mx-auto px-5 py-3">
        <div className="info bg-white shadow-sm rounded-lg border border-gray-200 py-3.5 px-4">
          <div className="info_header flex-col sm:flex-row flex justify-between items-center">
            <div className="info_header_left flex items-center gap-3.5">
              <div className="rounded-full bg-blue-100 p-3.5">
                <User className="text-blue-600 w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold truncate">John Doe</h1>
                <p className="">Dha Suffa University</p>
              </div>
            </div>
            <div className="right bg-gray-900 justify-center w-full gap-1.5 mt-4 sm:w-fit sm:mt-0 px-4 py-2 rounded-md flex items-center cursor-pointer">
              <Edit className="text-white w-4 h-4" />
              <button className=" text-white">Edit Profile</button>
            </div>
          </div>
          <div className="info_inputs flex flex-col mt-8 gap-2.5 sm:flex-row">
            <div className="leftInputs w-full sm:w-[50%]">
              <div className="fullnameInput flex flex-col mb-4">
                <label htmlFor="Fullname">Fullname</label>
                <input type="text" name="fullname" className="border border-gray-200 px-3 py-2 rounded-lg" id="" value={"John Doe"} disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}}  />
              </div>

              <div className="emailInput flex flex-col mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" name="email" id="" value={"ccsd23100@dsu.edu.pk"} disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}} />
              </div>

              <div className="GenderInput flex flex-col mb-4">
                <label htmlFor="Gender">Gender</label>
                <select name="gender" id="" className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}}>
                  <option value="Male">Male</option>
                  <option value="Male">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>
            <div className="rightInputs w-full sm:w-[50%]">
              <div className="DepartmentSelect flex flex-col mb-4">
                <label htmlFor="Department">Department</label>
                <select name="Department" id="" className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}}>
                  <option value="CS">CS</option>
                  <option value="CE">CE</option>
                </select>
              </div>
              <div className="Semester flex flex-col mb-4">
                <label htmlFor="Semester">Semester</label>
                <select name="Semester" id="" className="border border-gray-200 px-3 py-2 rounded-lg" disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
               <div className="Phone flex flex-col mb-4">
                <label htmlFor="Phone">Phone</label>
                <input type="text" className="border border-gray-200 px-3 py-2 rounded-lg" name="Phone" id="" value={"1234567"} disabled style={{background:`${isDisbaled ? "rgb(249 250 251 /1)" : ""}`}}/>
              </div>
            </div>
          </div>
          
        </div>
        <div className="myNotes mt-6 bg-white shadow-md  rounded-lg border border-gray-200 py-3.5 px-4">
           <div className="header">
            <h1 className="text-xl font-bold">My Notes</h1>
            <p className="text-gray-500">6 notes uploaded</p>
           </div>
           <div className="notes_Filter flex flex-col gap-2.5 sm:flex-row mt-4 mb-5">
            <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2">All Notes (6)</button>
            <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2">Approved (3)</button>
            <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2">Pending (2)</button>
            <button className="bg-gray-200 rounded-lg text-gray-700 py-2 px-3.5 cursor-pointer mr-2">Declined (1)</button>
            <input type="text" name="" id="" placeholder="Search notes" className="border border-gray-200 rounded-md w-[44%] px-2.5"/>
           </div>
           <hr className="text-gray-400" />

          <div className="notesContainer grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {userNotes.map((note,i)=>{
           return <div key={i} className="border rounded-xl border-green-200 p-4" style={{background:`${note.status === "approved" ? "#f0fdf4":note.status == "declined" ? "#fef2f2":note.status === "pending"? "#fefce8":""}`}}>
            <div className="header gap-3 sm:flex-row flex justify-between items-center">
              <h1 className="font-bold text-xl line-clamp-2">{note.title}</h1>
              <div className="flex items-center">
                <Edit className="text-gray-600 w-5 cursor-pointer mr-2"/>
                <Delete className="text-gray-600 w-5 cursor-pointer"/>
              </div>
            </div>
            <p className="mt-2 text-blue-600">{note.subject}</p>
            <p className="mt-4 text-gray-600 text-ellipsis overflow-hidden line-clamp-2">{note.description}</p>
            <div className="border rounded-md flex items-center gap-5 p-2 mt-5" 
            style={{borderColor:`${note.status === "approved" ? "#b9f8cf":note.status == "declined" ? "oklch(88.5% 0.062 18.334)":note.status === "pending"? "#fff085":""}`}}
            >
             {note.status === "approved" ? <Verified className="text-green-400"/> : note.status == "pending"
             ? <Clock className="text-yellow-600"/> : <CircleX className="text-red-600"/>
             }
              <div>
                <p className="font-medium text-sm"
                style={{color:`${note.status === "approved" ? "oklch(62.7% 0.194 149.214)":note.status == "declined" ? "oklch(57.7% 0.245 27.325)":note.status === "pending"? "oklch(68.1% 0.162 75.834)":""}`}}
                >{note.status}</p>
                {note.status == "approved" || note.status == "declined" ? (
                <p className="text-gray-500 text-sm line-clamp-1">{note.status} on {note.reviewDate}</p>
                ):<p className="text-gray-500 text-sm line-clamp-2">Pending Review</p>}
              </div>
            </div>
            <div className="remark bg-gray-50 mt-4 p-3">
              <p className="text-sm text-gray-700 line-clamp-2">{note.reviewNote}</p>
            </div>
          </div>
          })}
          </div>
          </div>
          
      </div>
    </div>
  )
}