import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";

const ViewNote = () => {
    return (
        <div className="viewNote" style={{fontFamily:"Arial, Helvetica, sans-serif"}}>
            <Navbar />
            <div className="body max-w-7xl mx-auto p-5" style={{background:"#f9fafb"}}>
                <div className="back_Option w-fit flex p-3 hover:bg-blue-200 rounded-md transition-all duration-300 cursor-pointer">
                    <ArrowLeft/>
                    <p className="ml-2.5 overflow-ellipsis overflow-hidden">Back to Computer Programming</p>
                </div>
                <div className="course_header bg-white shadow-sm mt-3 rounded-md p-6">
                  <h1 className="mb-1 text-[21px] font-semibold overflow-ellipsis overflow-hidden">Introduction to C++ Programming</h1>
                  <p className="mb-2 text-base text-gray-600 overflow-ellipsis overflow-hidden">Comprehensive guide covering basic syntax, variables, data types, and control structures in C++</p>
                  <div className="user_profile flex items-center gap-2 mt-5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs sm:text-sm font-semibold text-white">D</span>  
                    </div>
                    <p>Dev khatri</p>
                  </div>
                </div>
                <div className="note_pdf bg-white">

                </div>
            </div>
        </div>
    )
}
export default ViewNote;