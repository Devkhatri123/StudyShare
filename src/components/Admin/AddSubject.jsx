import { Plus } from "lucide-react";

export default function AddSubject() {
    return (
        <div>
            <div className="UserInfoUpdate_Header bg-[#fffaec] p-3">
                <div className="flex gap-1.5 flex-wrap sm:flex-none justify-between items-center mb-1.5">
                    <div className="flex items-baseline">
                    <svg
                    className="w-6 h-6 sm:w-5 sm:h-5 text-[#7d2e13]"
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
                  <div className="ml-2">
                    <h1 className="text-[#7d2e13] text-2xl font-semibold truncate">Subject Management</h1>
                  <p className="text-[#c95626] line-clamp-2">Review and take action on user reports</p>
                 </div>
                </div>
                
                <div className="header_right w-full sm:w-fit">
                 <button className="flex items-center w-full sm:w-fit justify-center bg-[#d64d0c] text-white px-2.5 py-2 rounded-md text-sm gap-2"><Plus className="w-4 h-4"/> Add Subject</button>
               </div>
               </div>
               
            </div>
            <div className="subjects_body bg-white py-7 mb-5 ">
                <div className="flex px-3 md:px-0 flex-wrap justify-around mx-auto md:justify-start md:px-2.5 md:gap-x-2.5">
                <div className="subject border border-gray-200 mb-4  flex flex-col w-1/1 bg-white rounded-xl sm:flex-[0_0_calc(100%_-_16px)] md:flex-[0_0_calc(50%_-_16px)] lg:flex-[0_0_calc(33.333%_-_16px)] shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="subject_header flex items-center justify-between rounded-t-xl py-3 px-2 bg-[#fedfba]">
                        <p className="subjectCode text-[#c34510] bg-[#ffedd5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">CS201</p>
                       <p className="subjectCode text-[#c34510] bg-[#f4f4f5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">Approved</p>
                    </div>
                    <div className="subjectBody px-5">
                        <h1 className="my-2.5 font-bold text-lg">Data Structures and Algorithms</h1>
                        <div className="flex justify-between pb-8">
                            <div className="left">
                                <p className="text-sm text-gray-600 mb-2">Department</p>
                                <p className="text-sm text-gray-600 mb-2">Semester</p>
                                <p className="text-sm text-gray-600 mb-2">CreatedOn</p>
                            </div>
                             <div className="right">
                                <p className="text-sm mb-2 font-medium">Computer Science</p>
                                <p className="text-sm mb-2 font-medium">2nd</p>
                                <p className="text-sm mb-2 font-medium">1/10/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subject border border-gray-200 mb-4 flex flex-col w-1/1 bg-white rounded-xl sm:flex-[0_0_calc(100%_-_16px)] md:flex-[0_0_calc(50%_-_16px)] lg:flex-[0_0_calc(33.333%_-_16px)] shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="subject_header flex items-center justify-between rounded-t-xl py-3 px-2 bg-[#fedfba]">
                        <p className="subjectCode text-[#c34510] bg-[#ffedd5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">CS201</p>
                       <p className="subjectCode text-[#c34510] bg-[#f4f4f5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">Approved</p>
                    </div>
                    <div className="subjectBody px-5">
                        <h1 className="my-2.5 font-bold text-lg">Data Structures and Algorithms</h1>
                        <div className="flex justify-between pb-8">
                            <div className="left">
                                <p className="text-sm text-gray-600 mb-2">Department</p>
                                <p className="text-sm text-gray-600 mb-2">Semester</p>
                                <p className="text-sm text-gray-600 mb-2">CreatedOn</p>
                            </div>
                             <div className="right">
                                <p className="text-sm mb-2 font-medium">Computer Science</p>
                                <p className="text-sm mb-2 font-medium">2nd</p>
                                <p className="text-sm mb-2 font-medium">1/10/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subject border border-gray-200 mb-4 flex flex-col w-1/1 bg-white rounded-xl sm:flex-[0_0_calc(100%_-_16px)] md:flex-[0_0_calc(50%_-_16px)] lg:flex-[0_0_calc(33.333%_-_16px)] shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="subject_header flex items-center justify-between rounded-t-xl py-3 px-2 bg-[#fedfba]">
                        <p className="subjectCode text-[#c34510] bg-[#ffedd5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">CS201</p>
                       <p className="subjectCode text-[#c34510] bg-[#f4f4f5] border border-[#fedfba] w-fit rounded-lg px-2 text-sm">Approved</p>
                    </div>
                    <div className="subjectBody px-5">
                        <h1 className="my-2.5 font-bold text-lg">Data Structures and Algorithms</h1>
                        <div className="flex justify-between pb-8">
                            <div className="left">
                                <p className="text-sm text-gray-600 mb-2">Department</p>
                                <p className="text-sm text-gray-600 mb-2">Semester</p>
                                <p className="text-sm text-gray-600 mb-2">CreatedOn</p>
                            </div>
                             <div className="right">
                                <p className="text-sm mb-2 font-medium">Computer Science</p>
                                <p className="text-sm mb-2 font-medium">2nd</p>
                                <p className="text-sm mb-2 font-medium">1/10/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}