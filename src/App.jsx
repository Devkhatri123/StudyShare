
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/home'
import Notes from './components/Notes'
import Register from './components/Register';
import ViewNote from './components/ViewNote'
import ProtectedRoute from "./utils/ProtectedRoute";
import SignIn from './components/SignIn';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './ContextApi/AuthContext';
import axios from 'axios';
import EmailVerificationCode from './components/EmailVerificationCode';
import Profile from './components/Profile';
import { toast } from 'react-toastify';
import Loader from './components/Loader';
import AdminHome from './components/Admin/AdminHome';
import Blocked from './components/Blocked';
import { AdminProvider } from './ContextApi/AdminContext';
import ResetPasswordModal from './components/Modals/User/ResetPasswordModal';
import ResetPasswordForm from './components/Modals/User/ResetPasswordForm';
function App() {
  const useAuth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(useAuth.AuthenticatedUser == null){
    const getUser = async () => {
      await axios.get("http://localhost:8080/v1/auth/loggedInUser",
        { withCredentials: true }
      )
        .then((response) => {
          console.log(response.data)
          useAuth.setIsAuthenticated(response.data.isLoggedIn);
          useAuth.setAuthenticatedUser(response.data.user)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false);
        })
    }
    getUser();
  }
  }, [useAuth.AuthenticatedUser]);

  return (
    <>
      {!loading ? (
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/:subjectName/:subjectCode/notes" element={<Notes />}/>
          <Route path="/profile" element={<Profile />}/>
        

          <Route path='/admin/home' element={
            <AdminProvider>
              <AdminHome />
            </AdminProvider>
          } />
          <Route path="/note/:noteID" element={<ViewNote />} />

          {/* Account Routes */}
          <Route path="/verify" element={<EmailVerificationCode />} />
          <Route path="/changePassword" element={<ResetPasswordModal />}/>
          <Route path="/resetPasswordForm" element={<ResetPasswordForm />}/>
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path="/blocked" element={<Blocked />} />
        </Routes>
      ) : <Loader />}
    </>
  )
}

export default App
