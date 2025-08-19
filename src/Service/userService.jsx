import axios from "axios";
import API_BACKEND_URL from "../utils/API";

export const BlockUser = async (userId) => {
     return axios.post(`${API_BACKEND_URL}/profile/admin/block/user/${userId}`,
        {}, { withCredentials: true })
}
export const DiscardUserReports = async(userId) => {
      return await axios.delete(`${API_BACKEND_URL}/admin/user/${userId}/reports`,{withCredentials:true})
} 