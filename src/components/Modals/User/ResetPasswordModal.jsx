import { useState } from "react";
import Loader from "../../Loader";
import { BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPasswordModal(){
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("reset_token");
    const email = queryParams.get("email");

    const [passwords,setPasswords] = useState({
        password:"",
        confirmPassword:""
    });
    const [loading,setLoading] = useState(false);
    
    // Reset password
   const resetPassword = async() => {
    if(passwords.password.trim().length == 0 || passwords.confirmPassword.trim().length == 0){
        toast.error("Both passwords input must be non empty ");
        return;
    }else if (passwords.password != passwords.confirmPassword){
        toast.error("Password doesn't match ");
        return;
    }
     setLoading(true);
     await axios.put(`${import.meta.env.VITE_API_URL}/auth/resetPassword?token=${token}&email=${email}`,passwords)
     .then((response)=>{
        toast.success("Password reset successfully");
        navigate("/signIn")
    }).catch((error)=>{
        toast.error(error.response.data);
    }).finally(()=>{
        setLoading(false);
    })
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
          <h1 className="text-2xl font-bold text-gray-900">Set new password</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Enter your new password</h2>
            {/* <p className="text-sm text-gray-600 mt-1">Enter your new password</p> */}
            
          </div>

          <div className="px-6 pb-6">
            <form className="space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
             {/* Password */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type={"password"}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={passwords.password}
                  onChange={((e)=>{setPasswords({...passwords,password:e.target.value})})}
                />
              </div>

            {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                 Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="password2"
                    type={"password"}
                    placeholder="Enter password again"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={passwords.confirmPassword}
                    autoComplete="none"
                    onChange={((e)=>{setPasswords({...passwords,confirmPassword:e.target.value})})}
                 />
                 
                </div>
              </div>

               {/* Submit button */}
               {!loading ? (
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={resetPassword}
              >
               Change Password
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