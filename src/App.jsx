
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/home'
import Notes from './components/Notes'
import Register from './components/Register';
import ViewNote from './components/ViewNote'
import ProtectedRoute from "./utils/ProtectedRoute";
import SignIn from './components/SignIn';
import { useContext, useEffect } from 'react';
import { AuthContext } from './ContextApi/AuthContext';
import { useError } from './ContextApi/ErrorContext';
import axios from 'axios';
function App() {
  const useAuth = useContext(AuthContext);
  const {handleError} = useError();
  useEffect(() => {
    const getUser = async () => {
     //  axios.defaults.withCredentials=true;
      await axios.get("http://localhost:8080/v1/auth/loggedInUser",
        {withCredentials:true}
      )
        .then((response) => {
          console.log(response);
          useAuth.setIsAuthenticated(response.data.isLoggedIn);
          useAuth.setAuthenticatedUser(response.data.user)
          //user
        }).catch((error) => {
          console.log(error)
          
          handleError(error.response);
        }).finally(() => {
        })
    }
    getUser();
  }, []);

return (
    <>
      <Routes>
         
          <Route element={<ProtectedRoute />}>
          
           
          </Route>
          <Route path="/" element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path="/:subjectName/:subjectCode/notes" element={<Notes />} />
          <Route path="/:noteID/note" element={<ViewNote />} />
        </Routes>
     </>
  )
}

export default App
