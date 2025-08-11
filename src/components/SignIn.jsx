import { useContext, useEffect,useState } from "react"
import { AuthContext } from "../ContextApi/AuthContext"
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen, ChevronDown } from "lucide-react"
import axios from "axios";
import Loader from "./Loader";
import API_BACKEND_URL from "../utils/API";
import { isValidEmail } from "../utils/Validation";
import ErrorMessage from "./ErrorMessage";
import { toast } from "react-toastify";
export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [user,setUser] = useState({
        email:"",
        password:"",
      });
    const AuthenticationContext = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
    if(AuthenticationContext.isAuthenticated){
        navigate("/");
    }
    },[AuthenticationContext.isAuthenticated]);

    // Login 
    const login = async() =>{
       if(!isValidEmail(user.email)){
         setError("Email is not valid");
         return;
       } else if(user.password.length == 0){
        setError("Password is empty");
        return;
       }
      if(error != "") setError("");
        setLoading(true);
        axios.defaults.withCredentials = true;
       await axios.post(`${API_BACKEND_URL}/auth/login`,user)
      .then((response)=>{
        if(Object.keys(response.data.user).length > 0){
        AuthenticationContext.setAuthenticatedUser(response.data.user);
        AuthenticationContext.setIsAuthenticated(true);
        toast.success("SignIn successful");
        }
      }).catch((error)=>{
        toast.error(error.response.data.message);
        console.log(error);
      }).finally(()=>{
        setLoading(false);
      });
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
          {/* {error != "" &&  (
           <ErrorMessage Msg={error}/>
          )} */}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Sign in to StudyShare</h2>
            <p className="text-sm text-gray-600 mt-1">Enter your credentials to access your account</p>
            
          </div>

          <div className="px-6 pb-6">
            <form className="space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
             

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@university.edu"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={user.email}
                  onChange={((e)=>{setUser({...user,email:e.target.value})})}
                />
              </div>

            {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={user.password}
                    autoComplete="none"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                 />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

               {/* Submit button */}
               {!loading ? (
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={login}
              >
               Log In
              </button>
               ):<button
                type="button"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
               disabled
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