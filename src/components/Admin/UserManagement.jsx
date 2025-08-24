import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { Blocks, Search, StopCircle, User2, UserCheck } from "lucide-react";
import axios from "axios";
import API_BACKEND_URL from "../../utils/API";
import { AuthContext } from "../../ContextApi/AuthContext";
import { toast } from "react-toastify";
import BlockModal from "./BlockModal";
import { BlockUser, DiscardUserReports } from "../../Service/userService";
import { Link } from "react-router-dom";

export default function UserManagement() {
    const authContext = useContext(AuthContext);
    const [Profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(null);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);
    const [activateUserLoading,setActivateUserLoading] = useState(false);
    const timerRef = useRef();
    const profileBodyRef = useRef();
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            const fetchProfiles = async () => {
                //   if (!hasMore) return;
                setLoading(true);
                await axios.get(`${API_BACKEND_URL}/profile/all?pageNumber=${pageNumber}&limit=2&query=${query}`, { withCredentials: true })
                    .then((response) => {
                        if (!response.data.length > 0) {
                            setProfiles([]);
                            setHasMore(false);
                        }
                        setProfiles([...response.data]);
                    }).catch((error) => {
                        console.log(error);
                    }).finally(() => {
                        setLoading(false);
                    })
            }
            fetchProfiles();
        }, 600);
    }, [pageNumber, query]);


    const handleSearch = (e) => {
        clearTimeout(timerRef.current);
        setHasMore(true);
        setPageNumber(0);
        setQuery(e.target.value);
    }

    const unBlockUser = async (userId, index) => {
        setLoading2(true);
        await axios.post(`${API_BACKEND_URL}/profile/admin/unblock/user/${userId}`, {}, { withCredentials: true })
            .then((response) => {
                if(Profiles[index].emailVerified == false){
                 Profiles[index].accountStatus = "Disabled";
                }else Profiles[index].accountStatus = "Active";
                
                toast.success(response.data)
                // window.location.reload();
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading2(false);
            })
    }
    const promoteUserToAdmin = async (index, userId) => {
        setCurrentProfile(index);
        setLoading3(true);
        await axios.post(`${API_BACKEND_URL}/manager/promoteUserToAdmin/${userId}`, {}, { withCredentials: true })
            .then((response) => {
                Profiles[index].roles.push("ADMIN");
                toast.success("success!!!");
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading3(false);
                setCurrentProfile(null);
            })
    }

    const blockUser = async (id) => {
        setLoading4(true);
        await BlockUser(id)
            .then(async (response) => {
                if (response.status == 200) {
                    
                    await DiscardUserReports(id);
                    Profiles[currentProfile].accountStatus = "Blocked";
                    toast.success("User blocked successfully");
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading4(false);
                setCurrentProfile(null);
            })
    }

    const removeAdminRole = async (userId, i) => {
        await axios.post(`${API_BACKEND_URL}/manager/removeAdminRole/${userId}`, {}, { withCredentials: true })
            .then((response) => {
                const idx = Profiles[i].roles.indexOf("ADMIN");
                Profiles[i].roles.splice(idx, 1);
            }).catch((error) => {
                console.log(error);
            }).finally(()=>{
                setLoading5(false);
            })
    }

    // Activating user's disabled account
    const activateUser = async(profileId,i) => {
    await axios.post(`${API_BACKEND_URL}/profile/admin/activate/user/${profileId}`,{},{withCredentials:true})
     .then((response)=>{
        toast.success(response.data)
     }).catch((error)=>{
        console.log(error);
     }).finally(()=>{
        setActivateUserLoading(false);
     })
    }
    return (
        <div>
            <div className="UserInfoUpdate_Header bg-[#fef1f2] rounded-t-md p-3">
                <div className="flex gap-1.5 items-center mb-1.5">
                    <UserCheck className="text-[#5e248b]" />
                    <h1 className="text-[#5e248b] text-2xl font-semibold truncate">User Management</h1>
                </div>
                <p className="text-[#5e248b] line-clamp-2">Search, filter, and manage platform users</p>
            </div>
            <div className="body bg-white p-5 mb-2 rounded-b-md">
                <div className="flex items-center mb-3">
                    <Search className="absolute w-4 text-gray-600 outline-0 ml-2" />
                    <input type="text" className="border border-gray-300 w-full py-1.5 px-7 rounded-lg" name="" id="" placeholder="Search users by name or email" onChange={(e) => { handleSearch(e) }} />
                </div>

                {Profiles.length > 0 && (
                    <div className="h-[150px] overflow-y-scroll" ref={profileBodyRef}>
                        {Profiles.map((profile, i) => {
                            return <div key={i} className="update mb-2.5 bg-[#fef1f2] gap-3 sm:gap-0 flex items-center flex-col sm:flex-row justify-between border border-gray-200 rounded-lg px-2 py-3 hover:shadow-xl">
                                <div className="left w-full sm:w-fit flex">
                                    <Link to={"/profile"} state={{userEmail:profile.id}}>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                                        <span className="text-xs sm:text-sm font-semibold text-white">{profile.fullname.substring(0, 1)}</span>
                                    </div>
                                    </Link>
                                    <div className="ml-2">
                                        <h1 className="font-bold text-[#7f1d1d]">{profile.fullname}</h1>
                                        <div className="truncate">
                                            <p className="text-sm truncate text-[#7f1d1d]">{profile.universityEmail}</p>
                                            {/* <p className="text-xs text-white bg-[#ef4444] w-fit px-2 rounded-lg text-center">{report.reportCount} Reports</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="right w-full flex-col sm:w-fit sm:flex-row flex items-center gap-2">
                                    <div className="flex w-full justify-center sm:w-fit items-center border border-gray-200 rounded-2xl px-2 bg-black text-white" >
                                        <p className="text-[13px]">{profile.accountStatus}</p>
                                    </div>

                                    {profile.accountStatus == "Disabled" && (
                                        !activateUserLoading && currentProfile != i ? (
                                          <div className="flex w-full text-white bg-black justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-4" onClick={() => { activateUser(profile.id,i); setCurrentProfile(i); setActivateUserLoading(true) }}>
                                            <button className="text-sm">Activate user</button>
                                        </div>
                                        ):
                                        <div className="flex text-white bg-black justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-2 px-4 w-24" style={{opacity:"0.5"}}>
                                            <button className="text-sm"><Loader/></button>
                                        </div>
                                    )}

                                    {profile.accountStatus !== "Blocked" ? (
                                        <div className="flex w-full text-white bg-[#ef4444] justify-center sm:w-fit items-center border border-gray-200 rounded-lg py-1 px-4" onClick={() => { setShowBlockModal(true); setCurrentProfile(i) }}>
                                            <StopCircle className="w-4 mr-2" />
                                            <button className="text-sm">Block</button>
                                        </div>

                                    ) :
                                        !loading2 ? (
                                            <div className="flex w-full text-black bg-transparent justify-center sm:w-fit items-center border border-gray-400 rounded-lg py-2 px-2" onClick={(() => unBlockUser(profile.id, i))}>
                                                <UserCheck className="w-4 mr-0.5" />
                                                <button className="text-sm">Unblock</button>
                                            </div>
                                        ) :
                                            <div className="flex w-full text-black bg-gray-300 justify-center sm:w-fit items-center border border-gray-400 rounded-lg py-2 px-4" >
                                                <Loader />
                                            </div>
                                    }
                                    {showBlockModal && currentProfile != null && currentProfile == i && <BlockModal user={profile} blockUser={blockUser} setShowBlockModal={setShowBlockModal} loading={loading4} />}
                                    
                                    {authContext.AuthenticatedUser.roles.includes("MANAGER") && (

                                        !profile.roles.includes("ADMIN") ? (
                                           currentProfile == null || currentProfile !== i || !loading3 ?
                                                <div className="reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer border border-gray-400" onClick={() => { promoteUserToAdmin(i, profile.id) }}>
                                                    <p>Promote to admin</p>
                                                </div>
                                                : <div className="reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer border bg-gray-400 border-gray-400" >
                                                    <Loader />
                                                </div>
                                        ) :
                                            currentProfile == null || currentProfile !== i || !loading5 ? (
                                                <div className="reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer border border-gray-400" onClick={() => { removeAdminRole(profile.id, i); setCurrentProfile(i); setLoading5(true) }}>
                                                    <p>Demote to User</p>
                                                </div>
                                            ) :
                                                <div className="reports flex gap-2 py-2 px-3 rounded-md hover:cursor-pointer border bg-gray-200 border-gray-400" >
                                                    <Loader />
                                                </div>
                                    )}

                                </div>
                            </div>
                        })}
                    </div>
                )}

                {loading && <Loader />}
            </div>
        </div>
    )
}