import axios from "axios";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";
import API_BACKEND_URL from "../../utils/API";

export default function UserDetailModal({ user, setShowModal }) {
    const [reports,setReports] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
     axios.get(`${API_BACKEND_URL}/report/admin/user/${user.id}/reports`,{withCredentials:true})
     .then((response)=>{
        setReports([...response.data]);
        console.log(response);
     }).catch((error)=>{
        console.log(error);
     }).finally(()=>{
        setLoading(false);
     })
    },[]);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="UserDetailModal w-full max-w-96 fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
                <div className="header flex justify-between">
                    <div className="flex items-baseline">
                        <h2 className="font-medium  sm:text-lg">User Details:  </h2>
                        <h2>&nbsp; @{user.fullname}</h2>
                    </div>
                    <X onClick={() => { setShowModal(false); }} />
                </div>
                <div className="body mt-3">
                    <div className="flex items-baseline">
                        <p className="text-sm font-bold">Email:&nbsp;</p>
                        <p>{user.universityEmail}</p>
                    </div>
                    <div className="mt-1 flex items-baseline">
                        <p className="text-sm font-bold ">Status:&nbsp;</p>
                        <p>{user.accountStatus}</p>
                    </div>
                    <div className="mt-1 flex items-baseline">
                        <p className="text-sm font-bold">Reports:</p>
                    </div>
                    <div className="reports_Body h-[200px] overflow-scroll my-2">
                       {reports.map((report,i)=>{
                       return <div key={i} className="report mb-2 bg-[#fef1f2] p-1.5 rounded-md">
                            <div className="flex items-baseline mt-1.5">
                                <p className="text-sm">Reason:&nbsp;{report.reason}</p>
                                {/* <p className="text-[14px]">{report.reason}</p> */}
                            </div>
                               <div className="flex items-baseline mt-1.5">
                                <p className="text-sm">Additional Details:&nbsp;{report.additionalDetails}</p>
                                {/* <p className="text-[14px]">{report.additionalDetails}</p> */}
                            </div>
                             <div className="flex items-baseline mt-1.5">
                                <p className="text-sm">ReportedBy:&nbsp;{report.reportedByUserName}</p>
                                {/* <p className="text-[14px] ">&nbsp;{report.reportedByUserName}</p> */}
                            </div>
                        </div>
                       })}
                    </div>
                </div>
            </div>
        </div>
    )
}