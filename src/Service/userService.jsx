import axios from "axios";

export const BlockUser = async (userId,blockReason) => {
     return axios.post(`${import.meta.env.VITE_API_URL}/profile/admin/block/user/${userId}?blockReason=${blockReason}`,
        {}, { withCredentials: true })
}
export const DiscardUserReports = async(userId) => {
      return await axios.delete(`${import.meta.env.VITE_API_URL}/admin/user/${userId}/reports`,{withCredentials:true})
} 