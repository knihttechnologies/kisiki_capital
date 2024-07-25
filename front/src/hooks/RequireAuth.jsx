import { useEffect } from "react";
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
//import { useAuthContext } from "../context/AuthContext";
import { userFetch } from "./useFetch";
import axios from "axios";

const RequireAuth = ({ allowedRoles }) => {
    const auth = useAuthContext()
    const location = useLocation()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    axios.get("/api/auth/authenticate")
    .then(res => {
        if(res?.data?.valid){
            return auth.setUser(res?.data?.user)
        }else{
            auth.setMsg("You are not logged in")
            return navigate('/')
        }
    }).catch(err => {
        auth.setMsg("There was an error in authentication", err)
    })
    
    // const urls = {
    //     userurl: "/api/user/allusers"
    // }
    // const {user, usersLoading, errMsg} = userFetch(urls?.userurl)
    // const loggedInUser = JSON.parse(localStorage.getItem("person")) || false;
    // if(!loggedInUser) return <Navigate to="/auth" state={{ from: location }} replace />
    // const foundUser = jwtDecode(loggedInUser);
    // console.log(foundUser)
    const role = auth.user?.user_role?.role_name
    return (
        allowedRoles.includes(role) && auth?.user?.user_id
            ? <Outlet/>
            : auth?.user?.user_id //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/dashboard" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;