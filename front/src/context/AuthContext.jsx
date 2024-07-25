import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { makeRequest } from "../api/makeRequest";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
     //open the sign up and sign in
     const [openSignIn, setOpenSignIn] = useState(false)
     const [openSignInModal, setOpenSignInModal] = useState(false)
     const [openGooglePayBtn, setOpenGooglePayBtn] = useState(false)
     const [openSignUp, setOpenSignUp] = useState(true)
    //Auth Tabs
    const [openAuthTab, setOpenAuthTab] =  useState(1);
    //fetch user data
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    //fetch chat data
    const [chats, setChats] = useState(null);
    const [chat, setChat] = useState(null);
    //fetch payments
    const [payments, setPayments] = useState(null);
    //fetch rules data
    const [rules, setRules] = useState(null)
    //fetch orders data
    const [orders, setOrders] = useState(null)
    //fetch single user order
    const [userOrder, setUserOrder] = useState(null)
    //for login details
    const [userAuth, setUserAuth] = useState({
        email: " ",
        password: " ",
    });
    const [token, setToken] = useState(null);
    //states for loading
    const [loading, setLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [userUpdateLoading, setUserUpdateLoading] = useState(false);
    const [userOrderLoading, setUserOrderLoading] = useState(true);
    const [userPaymentLoading, setUserPaymentLoading] = useState(true);
    const [paymentsLoading, setPaymentsLoading] = useState(true);
    //state for success and info messages
    const [msg, setMsg] = useState("");
    const [authMsg, setAuthMsg] = useState("");
    const [userUpdateMsg, setUserUpdateMsg] = useState("");
    const [paymentsMsg, setPaymentsMsg] = useState("");
    //state for error messages
    const [errMsg, setErrMsg] = useState("");
    const [authErrMsg, setAuthErrMsg] = useState("");
    const [userUpdateErrMsg, setUserUpdateErrMsg] = useState("");
    const [orderErrMsg, setOrderErrMsg] = useState("");
    const [paymentErrMsg, setPaymenrErrMsg] = useState("");
    const [errPaymentsMsg, setErrPaymentsMsg] = useState("");
    //state for persist 
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false );
    //state for the password input visibility
    const [showPass, setShowPass] = useState(false);
    const [role, setRole] = useState("User");
    // for the access token
    const [userSession, setUserSession] = useState({});
    // state for the token 
    const [userSignup, setUserSignup] = useState({title: " ", firstname: " ", lastname: " ", country: " ", email: " ", password: " ", cpassword: " ", checking: false, isVerifiedUser: "No", role: "User"});
    //state to append login data to send to database 
    const [logindata, setLoginData] = useState({ email: " ", pass: " "})
    //state for the timer
    const [redirectTimer, setRedirectTimer] = useState(0);
    //show modals
    const [showModal, setShowModal] = useState(false);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(0);
    const [showGetStartedModal, setShowGetStartedModal] = useState(0);
    const [showOnePhaseModal, setShowOnePhaseModal] = useState(0);
    const [showCollectionModal, setShowCollectionModal] = useState(0);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(false);
    const [nowPayModal, setShowNowPayModal] = useState(false);
    const [pesapalBtn, setPesapalBtn] = useState(false)
    const [nowPaymentsBtn, setNowPaymentsBtn] = useState(false)
    //For the admin creation modals
    const [showAdminUserCreateModal, setShowAdminUserCreateModal] = useState(false);
    const [showAdminPayCreateModal, setShowAdminPayCreateModal] = useState(false);
    const [showAdminOrderCreateModal, setShowAdminOrderCreateModal] = useState(false);
    //state for the created user 
    const [userCreated, setUserCreated] = useState(null);
    const [loadingUserCreated, setLoadingUserCreated] = useState(false);
    const [userErrorCreated, setUserErrorCreated] = useState(null);
    //for the user data to be displayed on dashboard
    const [userCreatedData, setUserCreateData] = useState({}); 
    const [createdUserDataLoading, setCreatedUserDataLoading] = useState(false);
    const [createdUserDataError, setCreatedUserDataError] = useState(null);
    //for the use fetch data
    const [dataFetched, setDataFetched] = useState({});
    const [loadingFetched, setLoadingfetched] = useState({}); 
    const [fetchedError, setFetchedError] = useState({});
    //login function
    const loginAction = async (userEmail, userPass) => {
        try {
            setLoading(true);
           await axios.get("/api/auth/authenticate").then(res => {
                const role = res?.data?.user?.user_role?.role_name
                if(res?.data?.valid){
                    auth.setUser(res?.data?.user)
                    if(role == "User") return navigate("/dashboard");
                    if(role == "Superadmin") return navigate("/admindash")
                }else{
                    setAuthMsg("Not authorized")
                    return navigate('/')
                }
            }).catch(err => {
                setAuthErrMsg("There was an error in authentication", err)
            })
            const response = await axios.post("/api/auth/login", { userEmail, userPass })
            if(!response) return setErrMsg("Something went wrong in the try block")
            console.log(response)
            if (response.status === 201) {
                const userData = jwtDecode(response?.data?.accessToken)
                const role = userData.userSession?.user_role?.role_name
                // console.log(userData?.userSession)
                // setUser(userData?.userSession);
                // setToken(response?.data?.accessToken);
                setMsg(`Welcome`)
                navigate('/checkout')
                //localStorage.setItem("person", JSON.stringify(response?.data?.accessToken));
                // if(role == "User") return navigate("/dashboard");
                // if(role == "Superadmin") return navigate("/admindash")
                // if(role !== "Superadmin" || role !== "User") return setErrMsg("you are not a registered user");
            }else if (response.status === 400) return setErrMsg("Bad request")
            else return
        } catch (err) {
            //console.log(err)
            setErrMsg(err.response.data.message)
        }finally {
            // we finally end the loading session
            return setLoading(false);
        }
    };
    //Package Registration
    const registerPkg = async () => {

    }
    //logOut function
    const logOut = (e) => {
      //e.preventDefault()
      setUser(null);
      setToken("");
      setMsg("You have been logged out")
      setPersist(false)
      localStorage.removeItem("person");
      localStorage.removeItem("order");
      navigate("/");
    };

    return (
        <AuthContext.Provider 
            value={{
                openSignInModal, setOpenSignInModal,
                openSignIn, setOpenSignIn,
                openSignUp, setOpenSignUp,
                openGooglePayBtn, setOpenGooglePayBtn,
                openAuthTab, setOpenAuthTab,
                pesapalBtn, setPesapalBtn,
                nowPaymentsBtn, setNowPaymentsBtn,
                nowPayModal, setShowNowPayModal,
                chats, setChats, chat, setChat, users, setUsers,
                setPaymentsLoading, setPayments, paymentsMsg, setPaymentsMsg, setErrPaymentsMsg,
                showCollectionModal, setShowCollectionModal, showGetStartedModal, setShowGetStartedModal,
                showOnePhaseModal, setShowOnePhaseModal, paymentsLoading, payments, errPaymentsMsg,
                token, setToken, user, setUser, loginAction, logOut,
                showRulesModal, setShowRulesModal, orders, setOrders,
                loading, setLoading, ordersLoading, setOrdersLoading, userUpdateLoading, setUserUpdateLoading,
                usersLoading, setUsersLoading, userSignup, setUserSignup, 
                userAuth, setUserAuth, rules, setRules,
                userOrder, setUserOrder, persist, setPersist,
                userOrderLoading, setUserOrderLoading,
                orderErrMsg, setOrderErrMsg, showPass, setShowPass, 
                logindata, setLoginData, paymentErrMsg, setPaymenrErrMsg,
                redirectTimer, setRedirectTimer, 
                userPaymentLoading, setUserPaymentLoading,
                msg, setMsg, errMsg, setErrMsg, authMsg, setAuthMsg, authErrMsg, setAuthErrMsg,
                userUpdateMsg, setUserUpdateMsg, userUpdateErrMsg, setUserUpdateErrMsg,
                showModal, setShowModal, 
                showUpdateModal, setShowUpdateModal,
                showPayModal, setShowPayModal,
                userCreated, setUserCreated, 
                loadingUserCreated, setLoadingUserCreated, 
                userErrorCreated, setUserErrorCreated,
                //for the user session and dash data display 
                userCreatedData, setUserCreateData, 
                userSession, setUserSession,
                createdUserDataLoading, setCreatedUserDataLoading, 
                createdUserDataError, setCreatedUserDataError,
                //for the use fetch data
                dataFetched, setDataFetched,
                loadingFetched, setLoadingfetched,
                fetchedError, setFetchedError,
                role, setRole, showCheckOutModal, setShowCheckOutModal,
                showAdminUserCreateModal, setShowAdminUserCreateModal, showAdminPayCreateModal, 
                setShowAdminPayCreateModal, showAdminOrderCreateModal, setShowAdminOrderCreateModal
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => {return useContext(AuthContext)}
export default AuthContext;