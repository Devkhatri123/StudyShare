import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";

export default function ViewNoteReports({ noteId, setShowModal, reportedNote }) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    const reportBody_Ref = useRef();
    useEffect(() => {
        if (!hasMore) return;
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/report/note/${noteId}?pageNumber=${pageNumber}&limit=3`, { withCredentials: true })
            .then((response) => {
                if (response.data.length > 0) setReports((prev) => ([...prev, ...response.data]));
                else setHasMore(false);
            }).catch((error) => {
                setError(true);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });

    }, [pageNumber]);

    const handleModalScroll = (e) => {

        if (hasMore && reportBody_Ref.current.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight) {
            setPageNumber((prev) => prev + 1);

        }
    }

    useEffect(() => {
        reportBody_Ref.current.addEventListener("scroll", handleModalScroll);
        return () => {
            if (reportBody_Ref.current != null) {
                reportBody_Ref.current.removeEventListener("scroll", handleModalScroll);
            }
        }
    }, []);
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="UserDetailModal h-full sm:h-fit w-full max-w-[512px] fixed sm:top-[50%] sm:translate-y-[-50%] bg-white rounded-md px-3 py-5">
                {!loading ? (
                    !error ? (
                        <>
                            <div className="header flex justify-between">
                                <div className="flex items-baseline">
                                    <h2 className="font-medium  sm:text-lg">User Details:  </h2>
                                    <h2>&nbsp; {reportedNote.noteName}</h2>
                                </div>
                                <X onClick={() => { setShowModal(false); document.body.style.overflow = "scroll" }} />
                            </div>
                            <div className="body mt-3">
                                {/* <div className="flex items-baseline">
                                <p className="text-sm font-bold">Email:&nbsp;</p>
                                <p>{user.universityEmail}</p>
                            </div>
                            <div className="mt-1 flex items-baseline">
                                <p className="text-sm font-bold ">Status:&nbsp;</p>
                                <p>{user.accountStatus}</p>
                            </div> */}
                                <div className="mt-1 flex items-baseline">
                                    <p className="text-sm font-bold">Reports:</p>
                                </div>
                                <div className="reports_Body h-[200px] overflow-y-scroll my-2" ref={reportBody_Ref}>
                                    {reports.map((report, i) => {
                                        return <div key={i} className="report mb-2 bg-[#fef1f2] p-1.5 rounded-md">
                                            <div className="flex items-baseline mt-1.5">
                                                <p className="text-sm">Reason:&nbsp;{report.reason}</p>
                                                {/* <p className="text-[14px]">{report.reason}</p> */}
                                            </div>
                                            <div className="flex items-baseline mt-1.5 gap-1.5">
                                                <p className="text-sm">Additional Details:&nbsp;</p>
                                                <p className="text-[13px] break-words">{report.additionalDetails}</p>
                                                {/* <p className="text-[14px]">{report.additionalDetails}</p> */}
                                            </div>
                                            <div className="flex items-baseline mt-1.5">
                                                <p className="text-sm">ReportedBy:&nbsp;{report.reportedByName}</p>
                                                {/* <p className="text-[14px] ">&nbsp;{report.reportedByUserName}</p> */}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                    ) : <p>Something went wrong. Try again</p>
                ) : <Loader />}
            </div>
        </div>
    )
}