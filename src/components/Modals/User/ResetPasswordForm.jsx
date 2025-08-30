import { useState } from "react";
import { isValidEmail } from "../../../utils/Validation";
import { BookOpen } from "lucide-react";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import axios from "axios";
import API_BACKEND_URL from "../../../utils/API";

export default function ResetPasswordForm(){
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);

         // Generate reset Link
        const generateResetLink = async() => {
          if(isValidEmail(email)){
         // toast.error("Write only email to reset you password");
          setLoading(true);
          await axios.post(`${API_BACKEND_URL}/auth/resetPasswordToken/${email}`)
          .then((response)=>{
            toast.success(response.data)
            console.log(response);
          }).catch((error)=>{
            toast.error(error.response.data);
            console.log(error);
          }).finally(()=>{
            setLoading(false);
          });
          }
        }


    return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            {/* Header */}
            <div className="flex items-center justify-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">StudyShare</span>
            </div>
    
            {/* Main heading */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Generate Reset Link</h1>
            </div>
    
            {/* Form Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Enter your email</h2>
                {/* <p className="text-sm text-gray-600 mt-1">Enter your new password</p> */}
                
              </div>
    
              <div className="px-6 pb-6">
                <form className="space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
                 {/* Email */}
                  <div className="space-y-2">
                    <input
                      id="email"
                      type={"email"}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={email}
                      onChange={((e)=>{setEmail(e.target.value)})}
                    />
                  </div>
    
                {/* Submit button */}
                   {!loading ? (
                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={()=>{generateResetLink()}}
                  >
                    Reset Password
                  </button>
                   ):<button
                    type="button"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    disabled
                    style={{opacity:"0.3"}}
                 >
                   <Loader/>
                  </button>}
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}