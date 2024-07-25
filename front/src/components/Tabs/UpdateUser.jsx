import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useTableContext } from '../../context/TableContext'
import SignIn from '../../pages/Authentication/SignIn'
import useCreate from '../../hooks/useCreate'
import Loader from '../../common/Loader'

const CheckOut = () => {
    const { updateUser } = useCreate()
    const {orderId} = useParams()
    const navigate = useNavigate();
    //const [cart, setCart] = useState(null)
    const [cliErrMsg, setCliErrMsg] = useState(null)
    //open input error msg
    const [emailErrMsg, setEmailErrMsg] = useState(false)
    const [passErrMsg, setPassErrMsg] = useState(false)
    const [phoneErrMsg, setPhoneErrMsg] = useState(false)
    const [fnErrMsg, setFnErrMsg] = useState(false)
    const [lnErrMsg, setLnErrMsg] = useState(false)
    const [langErrMsg, setLangErrMsg] = useState(false)
    const auth = useAuthContext()
    const table = useTableContext()
    const [cli, setCli] = useState({
        cliTitle: null,
        cliEmail: null,
        cliPhone: null,
        cliFirstName: null,
        cliLastName: null,
        cliLang: null,
        cliPass: null,
        cliConfPass: null,
        //for the billing details
        cliCountry: null,
        cliAddress: null,
        cliCity: null,
        cliZip:null,
        cliCoupon:null,
        cliProfilePicture: [],
        isVerifiedUser: null,
        role: null

    })
    useEffect(()=>{
        //if(table.order.pkgtitle === "" || table.order.pkgprice === "") return navigate("/")
        setTimeout(() => {
            auth.setErrMsg()
            auth.setMsg()
            auth.setAuthMsg()
        }, 10000);
    },[auth.errMsg])
    const inputClassName ="p-2 h-10 mt-2 mb-4 rounded-md bg-transparent border border-1 border-warning shadow-lg dark:border-slate-200" 
    const labelClass = "text-black/100"
    const InputErrClass = "text-xs p-1 shadow-xl text-red-400"
    const optClass = "p-2 w-full h-10 mt-2 mb-4 rounded-md bg-transparent border border-1 border-warning shadow-lg dark:border-slate-200"
    const opts = [
        {option: "select"},
        {option: "Kiswahili"},
        {option: "English"}
    ]
    //handlers
    //handle input changes
    const handleChange = (e)=>{
        const {name, value, files} = e.target
        setCli(prevState => ({
        ...prevState,
        [name]: name === 'cliProfilePicture' ? files[0] : value,
        }))
    }
    //handle submit to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('title', cli.cliTitle)
        data.append('email', cli.cliEmail)
        data.append('phone', cli.cliPhone)
        data.append('firstname', cli.cliFirstName)
        data.append('lastname', cli.cliLastName)
        data.append('lang', cli.cliLang)
        data.append('country', cli.cliCountry)
        data.append('address', cli.cliAddress)
        data.append('city', cli.cliCity)
        data.append('zip', cli.cliZip)
        data.append('coupon', cli.cliCoupon)
        data.append('isVerifiedUser', cli.isVerifiedUser)
        data.append('roleId', cli.role)
        await updateUser(data)
        .then((res)=>{
            if(res?.status===201) { 
                auth.setShowUpdateModal(false)
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        //for debugging purposes
        //auth.setShowModal(false)
    //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
    };

  return (
    <>
        <div className="mt-5 -mt-5 p-4 sm:w-full bg-white opacity-[85%] rounded-lg dark:border-strokedark dark:bg-boxdark">  
            {auth.showUpdateModal &&
                <form onSubmit={handleSubmit} className="flex justify-center shadow-xl rounded-md ">
                    {auth.userUpdateLoading ? <Loader/> : (
                        <div className="flex flex-col lg:w-[800px] flex-wrap mt-5 p-4">
                            {auth?.userUpdateErrMsg &&
                                <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
                                    {auth?.userUpdateErrMsg}
                                </p>
                            }
                            {/* auth.setUserUpdateErrMsg(err?.response?.data?.message); */}
                            <h1 className="text-black/100 font-bold text-center text-xl shadow-xl p-4 mt-5 mb-5">
                                <span className="bg-warning p-2 text-white rounded-lg shadow-xl">Kisiki Capital</span> 
                            </h1>
                            <h1 className="text-black/100 font-bold text-center text-lg shadow-xl p-4 mt-10 mb-5">
                                Update Your Info
                            </h1>
                            {auth?.userUpdateErrMsg &&
                                <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
                                    {auth?.userUpdateErrMsg}
                                </p>
                            }
                            <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
                            <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Phone</label>
                                    <input type="file" onChange={handleChange} className={inputClassName} name="cliProfilePicture" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass}>Email</label>
                                    <input type="email" value={auth?.user?.user_email} onChange={handleChange} className={inputClassName} name="cliEmail" />
                                    {/* hidden inputs */}
                                    <input type="hidden" value={auth?.user?.isVerified_user} onChange={handleChange} className={inputClassName} name="isVerifiedUser" />
                                    <input type="hidden" onChange={handleChange} className={inputClassName} name="role" value={auth?.user?.user_role?.role_name} />
                                    <input type="hidden" onChange={handleChange} className={inputClassName} name="cliTitle" value={auth?.user?.title} />
                                    {/* end hidden inputs */}
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Phone</label>
                                    <input type="number" value={auth?.user?.user_phone} onChange={handleChange} className={inputClassName} name="cliPhone" />
                                </div>
                            
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >First Name</label>
                                    <input type="text" value={auth?.user?.user_firstname} onChange={handleChange} className={inputClassName} name="cliFirstName" />
                                    
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Last Name</label>
                                    <input type="text" value={auth?.user?.user_lastname} onChange={handleChange} className={inputClassName} name="cliLastName" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Language</label>
                                    <select defaultValue={auth?.user?.user_lang} onChange={handleChange} className={inputClassName} name="cliLang">
                                    {opts.map(({ option}) => (
                                        <option
                                            className={optClass}
                                            
                                        >
                                            {option}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Password</label>
                                    <input type="password" onChange={handleChange} className={inputClassName} name="cliPass" />
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
                                    <input type="text" value={auth?.user?.user_country} onChange={handleChange} className={inputClassName} name="cliCountry" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Street Address</label>
                                    <input type="text" value={auth?.user?.user_address} onChange={handleChange} className={inputClassName}name="cliAddress" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Town/City</label>
                                    <input type="text" value={auth?.user?.user_city} onChange={handleChange} className={inputClassName} name="cliCity" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >Postal/zip</label>
                                    <input type="number" value={auth?.user?.user_zip} onChange={handleChange} className={inputClassName} name="cliZip" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className={labelClass} >If you have a coupon code</label>
                                    <input type="number" value={auth?.user?.user_coupon} onChange={handleChange} className={inputClassName} name="cliCoupon" />
                                </div>
                            </div>
                            <div className="mt-3 mb-10 flex justify-center">
                                <button className="w-50 shadow-xl bg-warning rounded-md h-14 text-white dark:text-white">
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                    
                </form>
            }
            {auth.openSignIn && <SignIn />}
        </div>
    </>
  )
}

export default CheckOut