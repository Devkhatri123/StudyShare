import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./ContextApi/AuthContext";
import Blocked from "./components/Blocked";

const ProtectedRoute = () => {
    const Auth = useContext(AuthContext);

    return (
  //  Auth.AuthenticatedUser == null ? <Navigate to={"/signIn"}/> :
    Auth.AuthenticatedUser?.accountStatus !== "Blocked" ? <Outlet/> : <Navigate to="/blocked"/>
    )
}
export default ProtectedRoute;