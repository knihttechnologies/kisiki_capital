import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import SignIn from '../pages/Authentication/SignIn'
import useCreate from '../hooks/useCreate'
import Loader from '../common/Loader'
import GooglePay from '../api/GooglePay'
import { jwtDecode } from 'jwt-decode'
import PaymentsModal from '../components/Modal/PaymentsModal'
import NowPaymentsModal from '../components/Modal/NowPaymentsModal'
const globalButtonClass = "mt-4 rounded-md shadow-xl text-white bg-black/100 border border-none p-2"
const PesaPalBtn = () => {
    const auth = useAuthContext()
    return (
        <button onClick={()=> {auth.setShowPayModal(true)}} className={globalButtonClass}> Pay with pesa-pal</button>
    )
}
const NowPaymentsBtn = () => {
    const auth = useAuthContext()
    return (
        <button onClick={()=> {auth.setShowNowPayModal(true)}} className={globalButtonClass}> Pay With Crypto</button>
    )
}

const CheckOut = () => {
    const navigate = useNavigate();
    const { updateUser } = useCreate()
    const localUser = localStorage.getItem('person')
    if(!localUser || localUser === "") return navigate('/')
    const userdecoded = jwtDecode(localUser)
    const user = userdecoded?.objectToSend
    const [emailErrMsg, setEmailErrMsg] = useState(false)
    const [passErrMsg, setPassErrMsg] = useState(false)
    const [phoneErrMsg, setPhoneErrMsg] = useState(false)
    const [fnErrMsg, setFnErrMsg] = useState(false)
    const [lnErrMsg, setLnErrMsg] = useState(false)
    const [langErrMsg, setLangErrMsg] = useState(false)
    const auth = useAuthContext()
    const [cli, setCli] = useState({
        cliTitle: "Client",
        cliEmail: "",
        cliPhone: "",
        cliFirstName: "",
        cliLastName: "",
        cliLang: "",
        cliPass: "",
        cliConfPass: "",
        //for the billing details
        cliCountry: "",
        cliAddress: "",
        cliCity: "",
        cliZip: 0,
        cliCoupon: 0,
        isVerifiedUser: "Yes",
        role: "User"

    })
    useEffect(()=>{
        //if(table.order.pkgtitle === "" || table.order.pkgprice === "") return navigate("/")
        setTimeout(() => {
            auth.setErrMsg()
            auth.setMsg()
            auth.setAuthMsg()
        }, 10000);
    },[auth.errMsg]) 
    const inputClassName ="p-2 h-8 mt-2 mb-2 rounded-md bg-transparent border border-none shadow-lg dark:border-slate-200" 
    const labelClass = "text-black/100 dark:text-warning shadow-xl mt-2 mb-2"
    const InputErrClass = "text-xs p-1 shadow-xl text-red-400"
    const optClass = "p-2 w-full h-10 mt-2 mb-4 rounded-md bg-transparent dark:text-white border border-1 border-warning shadow-lg dark:border-slate-200"
    const opts = [
        {option: "select"},
        {option: "Kiswahili"},
        {option: "English"}
    ] 
    //handlers
    //handle input changes
    const handleChange = (e)=>{
        const name = e?.target?.name
        const value = e?.target?.value
        setCli(prev=>({
            ...prev,
            [name]: value
        }))
    }
    //handle submit to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(cli.cliEmail === "") return setEmailErrMsg(true)
        // if(cli.cliPhone === "") return setPhoneErrMsg(true)
        // if(cli.cliFirstName === "") return setFnErrMsg(true)
        // if(cli.cliLastName === "") return setLnErrMsg(true)
        // if(cli.cliLang === "") return setLangErrMsg(true)
        //else if(cli.cliPass === "") return setPassErrMsg(true)
        //else if(cli.cliPass !== cli.cliConfPass) return setCliErrMsg(`The Password and confirm Password dont match`)
        const res = await updateUser({ title: cli.cliTitle, email: user?.user?.user_email, phone: cli.cliPhone, firstname: cli.cliFirstName, lastname: cli.cliLastName, lang: cli.cliLang, password: user?.user?.user_password, country: cli.cliCountry, address: cli.cliAddress, city: cli.cliCity, zip: cli.cliZip, coupon: cli.cliCoupon, isVerifiedUser: cli.isVerifiedUser, roleId: cli.role})
        // .then((res)=>{
        //     if(res?.status===201) { 
        //         auth.setOpenSignUp(false)
        //         auth.setOpenGooglePayBtn(true)
        //         //auth.setOpenSignIn(true)
        //     }
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
        //for debugging purposes
        //auth.setShowModal(false)
        if(res?.status===200) {
            auth.setOpenSignUp(false)
            //for google pay
            auth.setOpenGooglePayBtn(true)
            //for pesapal button
            auth.setPesapalBtn(true);
            auth.setNowPaymentsBtn(true)
            //auth.setOpenSignIn(true)
        }
    //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
    };

  return (
    <>
        <div className="mt-30 p-4 sm:w-full bg-white opacity-[85%] rounded-lg dark:border-strokedark dark:bg-boxdark">  
            {auth.openSignUp &&
                <div>
                    {auth.loading ? <Loader/> : (
                        <form onSubmit={handleSubmit} className="flex justify-center shadow-xl rounded-md ">
                            
                                <div className="flex flex-col lg:w-[800px] flex-wrap mt-5 p-4">
                                    {auth?.authMsg &&
                                        <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
                                            {auth?.authMsg}
                                        </p>
                                    }
                                    <h1 className="text-black/100 dark:text-white font-bold text-center text-xl shadow-xl p-4 mt-20 mb-5">
                                        Complete <span className="bg-warning p-2 text-white rounded-lg shadow-xl">Registration</span> 
                                    </h1>
                                    {/* <h1 className="text-black/100 dark:text-white font-bold text-center text-lg shadow-xl p-4 mt-10 mb-5">
                                        Register now and get started with your trading journey
                                    </h1> */}
                                    {/* <p> Already have an account 
                                        <button className="text-warning dark:text-white p-2 ml-2 shadow-lg rounded-lg" onClick={() => {
                                            auth.setOpenSignIn(true)
                                            auth.setOpenSignUp(false)
                                        }}>
                                            Login here
                                        </button> 
                                    </p> */}
                                    {auth?.msg && <p className={"bg-red-600 text-white dark:text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >{auth?.msg}</p>}
                                    {auth?.errMsg && <p className={"bg-red-600 text-white dark:text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >{auth?.errMsg}</p>}
                                    <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
                                        <div className="mt-3 flex flex-col">
                                            {/* <ImageUpload/> */}
                                            <label className={labelClass}>Email</label>
                                            <input type="email" readOnly value={user?.user?.user_email} className={inputClassName} name="cliEmail" />
                                            {emailErrMsg && cli?.cliEmail === "" ? <p className={InputErrClass}>Email cannot be empty</p> : ""}
                                            {/* hidden inputs */}
                                            <input type="hidden" onChange={handleChange} className={inputClassName} name="isVerifiedUser" value="Yes" />
                                            <input type="hidden" onChange={handleChange} className={inputClassName} name="role" value="Yes" />
                                            <input type="hidden" onChange={handleChange} className={inputClassName} name="cliTitle" value="Client" />
                                            {/* end hidden inputs */}
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Phone</label>
                                            <input type="number" onChange={handleChange} className={inputClassName} name="cliPhone" />
                                            {phoneErrMsg && cli?.cliPhone === "" ? <p className={InputErrClass}>Phone cannot be empty</p> : ""}
                                        </div>
                                    
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >First Name</label>
                                            <input type="text" onChange={handleChange} className={inputClassName} name="cliFirstName" />
                                            {fnErrMsg && cli?.cliFirstName === "" ? <p className={InputErrClass} >First name cannot be empty</p> : ""}
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Last Name</label>
                                            <input type="text" onChange={handleChange} className={inputClassName} name="cliLastName" />
                                            {lnErrMsg && cli?.cliLastName === "" ? <p className={InputErrClass} >Last name cannot be empty</p> : ""}
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Language</label>
                                            <select onChange={handleChange} className={inputClassName} name="cliLang">
                                                {opts.map(({ option}, key) => (
                                                    <option
                                                        className={optClass}
                                                        key={key}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            {langErrMsg && cli?.cliLang === "" ? <p className={InputErrClass} >Language cannot be empty</p> : ""}
                                        </div>
                                        {/* <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Password</label>
                                            <input type="password" onChange={handleChange} className={inputClassName} name="cliPass" />
                                            {passErrMsg && cli?.cliPass === "" ? <p className={InputErrClass} >Password cannot be empty</p> : ""}
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Confirm Password</label>
                                            <input type="password" onChange={handleChange} className={inputClassName} name="cliConfPass" />
                                        </div> */}
                                    </div>
                                    <div className="border border-1 border-warning mt-10 rounded-md"></div>
                                    <h1 className="text-black/100 mt-2 text-center font-bold text-lg underline dark:text-white">Billing info used for payment</h1>
                                    <div className="border border-1 border-warning mt-2 mb-5 rounded-md"></div>
                                    
                                    <div className="flex flex-row flex-wrap gap-4">
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Country/Region</label>
                                            <input type="text" onChange={handleChange} className={inputClassName} name="cliCountry" />
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Street Address</label>
                                            <input type="text" onChange={handleChange} className={inputClassName}name="cliAddress" />
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Town/City</label>
                                            <input type="text" onChange={handleChange} className={inputClassName} name="cliCity" />
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >Postal/zip</label>
                                            <input type="number" onChange={handleChange} className={inputClassName} name="cliZip" />
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <label className={labelClass} >If you have a coupon code</label>
                                            <input type="text" onChange={handleChange} className={inputClassName} name="cliCoupon" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full shadow-xl mt-3 mb-10 bg-warning rounded-md h-14 text-white dark:text-white">
                                        Submit
                                    </button>
                                </div>
                        </form>
                    )}
                </div>
            }
            {auth.openGooglePayBtn && <GooglePay />}
            <div className="flex flex-col flex-wrap p-5 ">
                {auth.pesapalBtn && <PesaPalBtn />}
                {auth.nowPaymentsBtn && <NowPaymentsBtn />}
            </div>
            {auth.nowPayModal && <NowPaymentsModal />}
            {auth.showPayModal && <PaymentsModal />}
            {auth.openSignInModal && <SignIn />}
        </div>
    </>
  )
}

export default CheckOut