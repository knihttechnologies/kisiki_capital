import { createContext, useContext, useState } from "react"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // state for the token 
    const [adminAuth, setAdminAuth] = useState({});
    //state for
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    //state for the password input visibility
    const [showPass, setShowPass] = useState(false);
    //state to append login data to send to database 
    const [logindata, setLoginData] = useState({ email: " ", pass: " "})
    //state for the timer
    const [redirectTimer, setRedirectTimer] = useState(0);

	

    return (
        <AuthContext.Provider 
             value={{ 
                adminAuth, setAdminAuth, persist, setPersist, showPass, setShowPass,
                logindata, setLoginData, redirectTimer, setRedirectTimer
                 }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)
export default AuthContext;