import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { useError } from "../ContextApi/ErrorContext";
import { AuthContext } from "../ContextApi/AuthContext";

const ProtectedRoute = () => {
    const useAuth = useContext(AuthContext);
    
    return useAuth.isAuthenticated ? <Outlet/> : <Navigate to={"/signIn"}/> || <Navigate to={"/register"}/>
}
export default ProtectedRoute;