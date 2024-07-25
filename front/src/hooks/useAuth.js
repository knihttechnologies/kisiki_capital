import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";
import { useAuthContext } from "../context/AuthContext";
const useAuth = () => {
    const auth = useAuthContext()
    //console.log(auth.user)
    useDebugValue(auth.user, auth => auth?.user_Id ? "Logged In" : "Logged Out")
    return useContext(AuthContext)
}

export default useAuth