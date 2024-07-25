import React, {useState, useEffect} from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminDefaultLayout from '../../layout/AdminDefaultLayout';
import { useAuthContext } from '../../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTableContext } from '../../context/TableContext'
import useCreate from '../../hooks/useCreate'
import Loader from '../../common/Loader'
import ImageUpload from '../../components/Image-uploader/ImageUpload'

const AdminCreateUser = () => {
  const {createUser} = useCreate()
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
    const inputClassName ="p-2 h-10 mt-2 mb-4 rounded-md bg-transparent border border-1 border-warning shadow-lg dark:border-slate-200" 
    const labelClass = "text-black/100 dark:text-warning"
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
        if(cli.cliEmail === "") return setEmailErrMsg(true)
        else if(cli.cliPhone === "") return setPhoneErrMsg(true)
        else if(cli.cliFirstName === "") return setFnErrMsg(true)
        else if(cli.cliLastName === "") return setLnErrMsg(true)
        else if(cli.cliLang === "") return setLangErrMsg(true)
        else if(cli.cliPass === "") return setPassErrMsg(true)
        else if(cli.cliPass !== cli.cliConfPass) return setCliErrMsg(`The Password and confirm Password dont match`)
        await createUser({ title: cli.cliTitle, email: cli.cliEmail, phone: cli.cliPhone, firstname: cli.cliFirstName, lastname: cli.cliLastName, lang: cli.cliLang, password: cli.cliPass, country: cli.cliCountry, address: cli.cliAddress, city: cli.cliCity, zip: cli.cliZip, coupon: cli.cliCoupon, isVerifiedUser: cli.isVerifiedUser, roleId: cli.role})
        .then((res)=>{
            if(res?.status===201) { 
                auth.setOpenSignUp(false)
                auth.setOpenSignIn(true)
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        //for debugging purposes
        //auth.setShowModal(false)
    //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
    };
  // showAdminUserCreateModal, setShowAdminUserCreateModal,
  // showAdminPayCreateModal, setShowAdminPayCreateModal, 
  // showAdminOrderCreateModal, setShowAdminOrderCreateModal
  return (
    <>
      <AdminDefaultLayout>
        <Breadcrumb pageName="Create User" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit} className="flex justify-center shadow-xl rounded-md ">
            {auth.loading ? <Loader/> : (
                <div className="flex flex-col lg:w-[800px] flex-wrap mt-5 p-4">
                    {auth?.authMsg &&
                        <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
                            {auth?.authMsg}
                        </p>
                    }
                    <h1 className="text-black/100 dark:text-white font-bold text-center text-lg shadow-xl p-4 mt-10 mb-5">
                        Register a user
                    </h1>
                    <p> Already have an account 
                        <button className="text-warning dark:text-white p-2 ml-2 shadow-lg rounded-lg" onClick={() => {
                            auth.setOpenSignIn(true)
                            auth.setOpenSignUp(false)
                        }}>
                            Login here
                        </button> 
                    </p>
                    {auth?.msg && <p className={"bg-red-600 text-white dark:text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >{auth?.msg}</p>}
                    {auth?.errMsg && <p className={"bg-red-600 text-white dark:text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >{auth?.errMsg}</p>}
                    {/* <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
                      <div className="mt-3 flex flex-col">
                          <ImageUpload/>
                      </div>
                    </div> */}
                    <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass}>Email</label>
                          <input type="email" onChange={handleChange} className={inputClassName} name="cliEmail" />
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
                          {opts.map(({option}, key) => (
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
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Password</label>
                          <input type="password" onChange={handleChange} className={inputClassName} name="cliPass" />
                          {passErrMsg && cli?.cliPass === "" ? <p className={InputErrClass} >Password cannot be empty</p> : ""}
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Confirm Password</label>
                          <input type="password" onChange={handleChange} className={inputClassName} name="cliConfPass" />
                      </div>
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
                            <input type="number" onChange={handleChange} className={inputClassName} name="cliCoupon" />
                        </div>
                    </div>
                    <div className="mt-3 mb-10">
                        <button className="w-full shadow-xl bg-warning rounded-md h-14 text-white dark:text-white">
                            Submit
                        </button>
                    </div>
                </div>
            )}
          </form>
        </div>
      </AdminDefaultLayout>
    </>
  );
};

export default AdminCreateUser;