import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
import Blocked from "../components/Blocked";

const ProtectedRoute = () => {
    const useAuth = useContext(AuthContext);
    const navigate = useNavigate();
    return useAuth.AuthenticatedUser.accountStatus !== "Blocked" ? <Outlet/> : <Navigate to="/blocked"/>
}
export default ProtectedRoute;