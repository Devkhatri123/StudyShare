import { AlertTriangle, Book, FileText, Menu, User2, UserCheck } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import PendingNotesApproval from "./PendingNotesApproval";
import UserInfoUpdate from "./UserInfoUpdate";
import Reports from "./Reports";
import UserManagement from "./UserManagement";
import { AuthContext } from "../../ContextApi/AuthContext";
import axios from "axios";
import API_BACKEND_URL from "../../utils/API";
import { AdminContext } from "../../ContextApi/AdminContext";
import Subject from "./Subject";
import NotesReport from "./NotesReports";

export default function AdminHome() {
  const [currentComponent, setCurrentComponent] = useState(<PendingNotesApproval />);
  const [currentTabName, setcurrentTabName] = useState("Notes");
  const adminContext = useContext(AdminContext);
  const authContext = useContext(AuthContext);
  const [Error, setError] = useState(null);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      if (authContext.AuthenticatedUser.roles.includes("ADMIN")) {
        if (!Object.entries(adminContext.count).length > 0) {
          axios.get(`${API_BACKEND_URL}/admin/count`, { withCredentials: true })
            .then((response) => {
              adminContext.setCount(response.data)
            }).catch((error) => {
              if (error.status == 403) {
                setError("You are not allowed to view admin page. May be your account is disabled or blocked.");
              }
              console.log(error);
            });
        }
      }else setError("You don't have permission to see this page.");
    } else setError("You are not allowed to view admin page. You are not loggedin")
  }, [adminContext.count, authContext]);

  function returnComponent(currenTab) {
    if (currenTab === "Notes") {
      setCurrentComponent(<PendingNotesApproval />)
      setcurrentTabName("Notes")
    }
    else if (currenTab === "Updates") {
      setCurrentComponent(<UserInfoUpdate />);
      setcurrentTabName("Updates");
    }
    else if (currenTab === "Reports") {
      setCurrentComponent(<Reports />);
      setcurrentTabName("Reports");
    } else if (currenTab === "Users") {
      setCurrentComponent(<UserManagement />)
      setcurrentTabName("Users");
    } else if (currenTab === "Subjects") {
      setCurrentComponent(<Subject />)
      setcurrentTabName("Subjects")
    }else if (currenTab === "Notes_report"){
      setCurrentComponent(<NotesReport/>)
      setcurrentTabName("Notes_report");
    }
  }
  return (
    Error == null ? (
      <div>
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="header flex items-center justify-between p-2.5 sm:px-5 py-5 max-w-6xl mx-auto">
            <div className="left">
              <h1 className="font-bold sm:text-xl">Admin Panel</h1>
            </div>
            {/* <div className="right sm:rounded-md sm:border py-2 px-3 border-gray-200 hover:cursor-pointer">
                    <Menu className="w-4"/>
                </div> */}
          </div>
        </header>
        <div className="bg-[#f1f4f6] px-4 h-[100vh]">
          <div className="body max-w-dvh mx-0 sm:max-w-2xl md:max-w-3xl  lg:max-w-5xl sm:mx-auto pt-10">
            <div className="stats grid-cols-1 grid sm:grid-cols-2 gap-4">
              <div className="pendingNotes flex bg-[#f4f7fe] shadow-sm rounded-md p-3.5">
                <div className="bg-[#3174f0] rounded-lg px-2 py-2 h-10 shadow-md">
                  <FileText className="text-white" />
                </div>
                <div className="numbers ml-2 leading-4">
                  <h1 className="mb-0 font-normal text-[#5e566c]">PENDING NOTES</h1>
                  <p className="font-bold text-xl">{adminContext.count?.pendingNotes}</p>
                </div>
              </div>
              <div className="UserUpdateInfo flex shadow-sm rounded-md p-3.5">
                <div className="rounded-lg px-2 py-2 h-10 bg-[#19ad50] shadow-md">
                  <UserCheck className="text-white" />
                </div>
                <div className="numbers ml-2 leading-4">
                  <h1 className="mb-0 font-normal text-[#5e566c]">USER UPDATES</h1>
                  <p className="font-bold text-xl">{adminContext.count?.pendingUpdates}</p>
                </div>
              </div>
              <div className="ReportedUser flex shadow-sm rounded-md p-3.5">
                <div className="rounded-lg px-2 py-2 h-10 bg-[#ea3c3c] shadow-md">
                  <AlertTriangle className="text-white" />
                </div>
                <div className="numbers ml-2 leading-4">
                  <h1 className="mb-0 font-normal text-[#5e566c]">REPORTED USER</h1>
                  <p className="font-bold text-xl">{adminContext.count?.reportedUser}</p>
                </div>
              </div>
            </div>
            <div className="tabs_header mt-5 flex gap-4 bg-white shadow-md p-1 rounded-lg mb-5 overflow-x-scroll no-scrollbar sm:overflow-hidden items-center text-sm md:gap-0">
              <div className="Notes hover:cursor-pointer flex gap-2 bg-black text-white rounded-md py-2 px-3 items-center" style={{ background: `${currentTabName === "Notes" ? "black" : "none"}`, color: `${currentTabName === "Notes" ? "white" : "black"}` }} onClick={() => returnComponent("Notes")}>
                <FileText className="w-5" />
                <p>Notes</p>
              </div>
              <div className="UserUpdate flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer items-center" onClick={() => returnComponent("Updates")} style={{ background: `${currentTabName === "Updates" ? "black" : ""}`, color: `${currentTabName === "Updates" ? "white" : "black"}` }}>
                <UserCheck className="w-6 h-6 sm:w-5 sm:h-5" />
                <p>Updates</p>
              </div>
              <div className="reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer items-center" onClick={() => returnComponent("Reports")} style={{ background: `${currentTabName === "Reports" ? "black" : ""}`, color: `${currentTabName === "Reports" ? "white" : "black"}` }}>
                <AlertTriangle className="w-6 h-6 sm:w-5 sm:h-5" />
                <p>Reports</p>
              </div>
              <div className="users flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer items-center" onClick={() => returnComponent("Users")} style={{ background: `${currentTabName === "Users" ? "black" : ""}`, color: `${currentTabName === "Users" ? "white" : "black"}` }}>
                <User2 className="w-6 h-6 sm:w-5 sm:h-5" />
                <p>Users</p>
              </div>
              <div className="Subject flex gap-2 items-center py-2 px-3 rounded-md hover:cursor-pointer" onClick={() => returnComponent("Subjects")} style={{ background: `${currentTabName === "Subjects" ? "black" : ""}`, color: `${currentTabName === "Subjects" ? "white" : "black"}` }}>
                <svg
                  className="w-6 h-6 sm:w-5 sm:h-5 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: `${currentTabName === "Subjects" ? "white" : "black"}` }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p>Subject</p>
              </div>
              <div className="Notes_reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer items-center" onClick={() => returnComponent("Notes_report")} style={{ background: `${currentTabName === "Notes_report" ? "black" : ""}`, color: `${currentTabName === "Notes_report" ? "white" : "black"}` }}>
                <FileText className="w-6 h-6 sm:w-5 sm:h-5" />
                <p>Reports</p>
              </div>
            </div>
            <div className="main shadow-xl">
              {currentComponent}
            </div>
          </div>
        </div>
      </div>
    ) : <div className="h-[100vh] flex items-center justify-center"><p className="max-w-96 text-center font-bold">{Error}</p></div>
  )
}