import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext';
import axios from 'axios';
import API_BACKEND_URL from '../utils/API';
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDropDown,setShowDropDown] = useState(false);
    const authContext = useContext(AuthContext);
 
    const signOut = () => {
      axios.post(`${API_BACKEND_URL}/auth/logout`,{},{withCredentials:true})
      .then((response)=>{
        window.location.reload();
      }).catch((error)=>{
        console.log(error);
      })
    }

    return(
     <header className="border-b bg-white px-4 py-3 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
             <Link to={"/"}>
            <div className="flex items-center gap-2">
             
              <div className="bg-blue-600 p-2 rounded-lg">
               <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
                  </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Study Share</span>
           
            </div>
            </Link>
          </div>

          {/* Desktop Search & Auth */}
          <div className="hidden lg:flex items-center gap-4">
          
           {authContext.AuthenticatedUser == null ? (
            <>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors">
             <Link to={"/signIn"}>
               Sign In
                </Link>
              </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors">
              <Link to={"/register"}>
                  Register
                  </Link>
            </button>
            </>
           ):<>
           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm cursor-pointer" onClick={()=>setShowDropDown(!showDropDown)}>
            <span className="text-xs sm:text-sm font-semibold text-white" >{authContext.AuthenticatedUser.fullname.substring(0,1)}</span>
            
           </div>
           {showDropDown && (
           <div className="absolute right-3 top-16 py-2.5 px-6 dropdown shadow-lg bg-white  rounded-lg">
            <li className='list-none cursor-pointer'><Link to={"/profile"} state={{userEmail:authContext.AuthenticatedUser.id}}>Profile</Link></li>
            {!authContext.AuthenticatedUser.emailVerified && <li className='list-none cursor-pointer'><Link to={"/verify"} state={{email:authContext.AuthenticatedUser.universityEmail}}>Verify Email</Link></li>}
            {(authContext.AuthenticatedUser.roles.includes("ADMIN") || authContext.AuthenticatedUser.roles.includes("MANAGER")) && <li className='list-none cursor-pointer'><Link to={"/admin/home"}>Admin</Link></li>}
            <li className='list-none cursor-pointer' onClick={()=>{signOut()}}>SignOut</li>
           </div>
    )}
           </>
           }
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white mt-3 pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              

              {/* Mobile Navigation */}
              {authContext.AuthenticatedUser != null && (
             <nav className="flex flex-col space-y-3">
            <li className='list-none cursor-pointer'><Link to={"/profile"} state={{userEmail:authContext.AuthenticatedUser.id}}>Profile</Link></li>
            {!authContext.AuthenticatedUser.emailVerified && <li className='list-none cursor-pointer'><Link to={"/verify"} state={{email:authContext.AuthenticatedUser.universityEmail}}>Verify Email</Link></li>}
            {(authContext.AuthenticatedUser.roles.includes("ADMIN") || authContext.AuthenticatedUser.roles.includes("MANAGER")) && <li className='list-none cursor-pointer'><Link to={"/admin/home"}>Admin</Link></li>}
            <li className='list-none cursor-pointer' onClick={()=>{signOut()}}>SignOut</li>
              </nav>
              )}
              {authContext.AuthenticatedUser == null && (
             <div className="flex flex-col space-y-2 pt-2">
                <button className="text-gray-600 hover:text-gray-900 py-2 text-left transition-colors">
                  <Link to={"/signIn"}>
                   Sign In
                </Link>
                  </button>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors">
                  <Link to={"/register"}>
                  Register
                  </Link>
                </button>
              </div>
              )}
            </div>
          </div>
        )}
      </header>
    )
}