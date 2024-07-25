import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import SignIn from '../pages/Authentication/SignIn'
import useCreate from '../hooks/useCreate'
import Loader from '../common/Loader'
import GooglePay from '../api/GooglePay'
import { jwtDecode } from 'jwt-decode'
import PaymentsModal from '../components/Modal/PaymentsModal'

const PesaPalPay = () => {
  const navigate = useNavigate();
  const { updateUser } = useCreate()
  const localUser = localStorage.getItem('person')
  const localUserOrder = localStorage.getItem('order')
  if(!localUser || localUser === "") return navigate('/')
  const userdecoded = jwtDecode(localUser)
  const orderdecoded = jwtDecode(localUserOrder)
  const order = orderdecoded?.signObject?.userRes
  const user = userdecoded?.objectToSend
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
      cliCountryCode: "",
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
  const labelClass = "text-black/100 dark:text-warning"
  const InputErrClass = "text-xs p-1 shadow-xl text-red-400"
  const optClass = "p-2 w-full h-10 mt-2 mb-4 rounded-md bg-transparent dark:text-white border border-1 border-warning shadow-lg dark:border-slate-200"
  const opts = [
      {option: "select"},
      {option: "Kiswahili"},
      {option: "English"}
  ]
  const countryOpts = [
      {option: "select"},
      {option: "KE"},
      {option: "TZ"},
      {option: "UG"},
      {option: "RWA"},
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
      const res = await axios.post('/api/payments/pesapalpay', {
        id: user?.order?.order_id,
        currency: user?.order?.trading_currency,
        amount: user?.order?.package_price,
        desc: user?.order?.package_title,
        callbackurl: "https://kisikicapital.com/finally",
        //notificationid: ,
        // values for the billing address
        email: user?.user?.user_email,
        phonenumber: order.user_title,
        countrycode: order?.user_phone,
        firstname: order?.user_firstname,
        lastname: order?.user_lastname,
        lineOne: "",
        lineTwo: "",
        city: order?.user_city,
        state: order?.user_country,
        postalcode: order?.user_address,
        zipcode: order?.user_zip,
      })
      // const res = await axios.post('/api/payments/pesapalpay',{ title: cli.cliTitle, email: user?.user?.user_email, phone: cli.cliPhone, firstname: cli.cliFirstName, lastname: cli.cliLastName, lang: cli.cliLang, password: user?.user?.user_password, country: cli.cliCountry, address: cli.cliAddress, city: cli.cliCity, zip: cli.cliZip, coupon: cli.cliCoupon, isVerifiedUser: cli.isVerifiedUser, roleId: cli.role})
      if(res?.status===200) {
          auth.setOpenSignUp(false)
          //for google pay
          auth.setOpenGooglePayBtn(true)
          //for pesapal button
          setPesapalBtn(true);
          //auth.setOpenSignIn(true)
      }
  //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
  };

  return (
    <div className="mt-20 p-4 sm:w-full bg-white opacity-[85%] rounded-lg dark:border-strokedark dark:bg-boxdark">      
      <form onSubmit={handleSubmit} className="flex justify-center shadow-xl rounded-md ">
          
              <div className="flex flex-col lg:w-[800px] flex-wrap mt-5 p-4">
                  {auth?.authMsg &&
                      <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
                          {auth?.authMsg}
                      </p>
                  }
                  <h1 className="text-black/100 dark:text-white font-bold text-center text-xl shadow-xl p-4 mt-20 mb-5">
                      Complete your order with <span className="bg-warning p-2 text-white rounded-lg shadow-xl">Pesa Pal</span> 
                  </h1>
                  <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass}>Email: {user?.user?.user_email}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Phone: {order?.user_phone}</label>
                      </div>
                  
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >First Name: {order?.user_firstname}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Last Name: {order?.user_lastname}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Language: {order?.user_lang}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Country Code: {user?.user?.trading_currency}</label>
                      </div>
                  </div>
                  <div className="border border-1 border-warning mt-10 rounded-md"></div>
                  <h1 className="text-black/100 mt-2 text-center font-bold text-lg underline dark:text-white">Billing info used for payment</h1>
                  <div className="border border-1 border-warning mt-2 mb-5 rounded-md"></div>
                  
                  <div className="flex flex-row flex-wrap gap-4">
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Country/Region:{order?.user_country}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Street Address: {order?.user_address}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Town/City: {order?.user_city}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >Postal/zip: {order?.user_zip}</label>
                      </div>
                      <div className="mt-3 flex flex-col">
                          <label className={labelClass} >coupon code: {user?.order?.discount !== ' ' ? user?.order?.discount : "No discount"}</label>
                      </div>
                  </div>
                  <button type="submit" className="w-full shadow-xl mt-3 mb-10 bg-warning rounded-md h-14 text-white dark:text-white">
                      Pay
                  </button>
              </div>
      </form>     
    </div>
  )
}

export default PesaPalPay
// import axios from 'axios'
// import React, {useState, useEffect} from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../context/AuthContext'
// import SignIn from '../pages/Authentication/SignIn'
// import useCreate from '../hooks/useCreate'
// import Loader from '../common/Loader'
// import GooglePay from '../api/GooglePay'
// import { jwtDecode } from 'jwt-decode'
// import PaymentsModal from '../components/Modal/PaymentsModal'

// const PesaPalPay = () => {
//   const navigate = useNavigate();
//   const { updateUser } = useCreate()
//   const localUser = localStorage.getItem('person')
//   const localUserOrder = localStorage.getItem('order')
//   if(!localUser || localUser === "") return navigate('/')
//   const userdecoded = jwtDecode(localUser)
//   const orderdecoded = jwtDecode(localUser)
//   const order = orderdecoded?.objectToSend?.userres
//   const user = userdecoded?.objectToSend
//   const [emailErrMsg, setEmailErrMsg] = useState(false)
//   const [passErrMsg, setPassErrMsg] = useState(false)
//   const [phoneErrMsg, setPhoneErrMsg] = useState(false)
//   const [fnErrMsg, setFnErrMsg] = useState(false)
//   const [lnErrMsg, setLnErrMsg] = useState(false)
//   const [langErrMsg, setLangErrMsg] = useState(false)
//   const [pesapalBtn, setPesapalBtn] = useState(false)
//   const auth = useAuthContext()
//   const [cli, setCli] = useState({
//       cliTitle: "Client",
//       cliEmail: "",
//       cliPhone: "",
//       cliFirstName: "",
//       cliLastName: "",
//       cliLang: "",
//       cliPass: "",
//       cliConfPass: "",
//       cliCountryCode: "",
//       //for the billing details
//       cliCountry: "",
//       cliAddress: "",
//       cliCity: "",
//       cliZip: 0,
//       cliCoupon: 0,
//       isVerifiedUser: "Yes",
//       role: "User"

//   })
//   useEffect(()=>{
//       //if(table.order.pkgtitle === "" || table.order.pkgprice === "") return navigate("/")
//       setTimeout(() => {
//           auth.setErrMsg()
//           auth.setMsg()
//           auth.setAuthMsg()
//       }, 10000);
//   },[auth.errMsg])
//   const inputClassName ="p-2 h-8 mt-2 mb-2 rounded-md bg-transparent border border-none shadow-lg dark:border-slate-200" 
//   const labelClass = "text-black/100 dark:text-warning"
//   const InputErrClass = "text-xs p-1 shadow-xl text-red-400"
//   const optClass = "p-2 w-full h-10 mt-2 mb-4 rounded-md bg-transparent dark:text-white border border-1 border-warning shadow-lg dark:border-slate-200"
//   const opts = [
//       {option: "select"},
//       {option: "Kiswahili"},
//       {option: "English"}
//   ]
//   const countryOpts = [
//       {option: "select"},
//       {option: "KE"},
//       {option: "TZ"},
//       {option: "UG"},
//       {option: "RWA"},
//   ]
//   //handlers
//   //handle input changes
//   const handleChange = (e)=>{
//       const name = e?.target?.name
//       const value = e?.target?.value
//       setCli(prev=>({
//           ...prev,
//           [name]: value
//       }))
//   }
//   //handle submit to the server
  
//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       const res = await axios.post('/api/payments/pesapalpay', {
//         id: user?.order?.order_id,
//         currency: user?.order?.trading_currency,
//         amount: user?.order?.package_price,
//         desc: user?.order?.package_title,
//         callbackurl: "https://kisikicapital.com/finally",
//         notificationid,
//         // values for the billing address
//         email: user?.user?.user_email,
//         phonenumber: order.user_title,
//         countrycode: order?.user_phone,
//         firstname: order?.user_firstname,
//         lastname: order?.user_lastname,
//         lineOne: "",
//         lineTwo: "",
//         city: order?.user_city,
//         state: order?.user_country,
//         postalcode: order?.user_address,
//         zipcode: order?.user_zip,
//       })
//       // const res = await axios.post('/api/payments/pesapalpay',{ title: cli.cliTitle, email: user?.user?.user_email, phone: cli.cliPhone, firstname: cli.cliFirstName, lastname: cli.cliLastName, lang: cli.cliLang, password: user?.user?.user_password, country: cli.cliCountry, address: cli.cliAddress, city: cli.cliCity, zip: cli.cliZip, coupon: cli.cliCoupon, isVerifiedUser: cli.isVerifiedUser, roleId: cli.role})
//       if(res?.status===200) {
//           auth.setOpenSignUp(false)
//           //for google pay
//           auth.setOpenGooglePayBtn(true)
//           //for pesapal button
//           setPesapalBtn(true);
//           //auth.setOpenSignIn(true)
//       }
//   //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
//   };

//   return (
//     <div className="mt-30 p-4 sm:w-full bg-white opacity-[85%] rounded-lg dark:border-strokedark dark:bg-boxdark">      
//       <form onSubmit={handleSubmit} className="flex justify-center shadow-xl rounded-md ">
          
//               <div className="flex flex-col lg:w-[800px] flex-wrap mt-5 p-4">
//                   {auth?.authMsg &&
//                       <p className={"bg-red-600 text-white rounded-md text-center pt-2 pb-2 shadow-xl"} >
//                           {auth?.authMsg}
//                       </p>
//                   }
//                   <h1 className="text-black/100 dark:text-white font-bold text-center text-xl shadow-xl p-4 mt-20 mb-5">
//                       Complete your order with <span className="bg-warning p-2 text-white rounded-lg shadow-xl">Pesa Pal</span> 
//                   </h1>
//                   <div className="flex flex-row flex-2 flex-wrap gap-4 mt-10">
//                       <div className="mt-3 flex flex-col">
//                           {/* <ImageUpload/> */}
//                           <label className={labelClass}> Your email: {user?.user?.user_email}</label>
//                           <input type="email" readOnly value={user?.user?.user_email} className={inputClassName} name="cliEmail" />
//                           {emailErrMsg && cli?.cliEmail === "" ? <p className={InputErrClass}>Email cannot be empty</p> : ""}
//                           {/* hidden inputs */}
//                           {/* end hidden inputs */}
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Phone</label>
//                           <input type="number" onChange={handleChange} readOnly value={user?.user?.user_phone} className={inputClassName} name="cliPhone" />
//                           {phoneErrMsg && cli?.cliPhone === "" ? <p className={InputErrClass}>Phone cannot be empty</p> : ""}
//                       </div>
                  
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >First Name</label>
//                           <input type="text" onChange={handleChange}readOnly value={user?.user?.user_firstname} className={inputClassName} name="cliFirstName" />
//                           {fnErrMsg && cli?.cliFirstName === "" ? <p className={InputErrClass} >First name cannot be empty</p> : ""}
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Last Name</label>
//                           <input type="text" onChange={handleChange}readOnly value={user?.user?.user_lastname} className={inputClassName} name="cliLastName" />
//                           {lnErrMsg && cli?.cliLastName === "" ? <p className={InputErrClass} >Last name cannot be empty</p> : ""}
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Language</label>
//                           <select onChange={handleChange} className={inputClassName} name="cliLang">
//                             <option value={user?.user?.user_lang} key="">{user?.user?.user_email}</option>
//                               {opts.map(({ option}, key) => (
//                                   <option
//                                       className={optClass}
//                                       key={key}
//                                   >
//                                       {option}
//                                   </option>
//                               ))}
//                           </select>
//                           {langErrMsg && cli?.cliLang === "" ? <p className={InputErrClass} >Language cannot be empty</p> : ""}
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Country Code</label>
//                           <select onChange={handleChange} readOnly className={inputClassName} name="cliCountryCode">
//                               {countryOpts.map(({ option}, key) => (
//                                   <option
//                                       className={optClass}
//                                       key={key}
//                                   >
//                                       {option}
//                                   </option>
//                               ))}
//                           </select>
//                           {/* {langErrMsg && cli?.cliLang === "" ? <p className={InputErrClass} >Language cannot be empty</p> : ""} */}
//                       </div>
//                       {/* <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Password</label>
//                           <input type="password" onChange={handleChange} className={inputClassName} name="cliPass" />
//                           {passErrMsg && cli?.cliPass === "" ? <p className={InputErrClass} >Password cannot be empty</p> : ""}
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Confirm Password</label>
//                           <input type="password" onChange={handleChange} className={inputClassName} name="cliConfPass" />
//                       </div> */}
//                   </div>
//                   <div className="border border-1 border-warning mt-10 rounded-md"></div>
//                   <h1 className="text-black/100 mt-2 text-center font-bold text-lg underline dark:text-white">Billing info used for payment</h1>
//                   <div className="border border-1 border-warning mt-2 mb-5 rounded-md"></div>
                  
//                   <div className="flex flex-row flex-wrap gap-4">
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Country/Region</label>
//                           <input type="text"readOnly onChange={handleChange} className={inputClassName} name="cliCountry" />
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Street Address</label>
//                           <input type="text" readOnly onChange={handleChange} className={inputClassName}name="cliAddress" />
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Town/City</label>
//                           <input type="text" readOnly onChange={handleChange} className={inputClassName} name="cliCity" />
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >Postal/zip</label>
//                           <input type="number" readOnly onChange={handleChange} className={inputClassName} name="cliZip" />
//                       </div>
//                       <div className="mt-3 flex flex-col">
//                           <label className={labelClass} >If you have a coupon code</label>
//                           <input type="text" readOnly onChange={handleChange} className={inputClassName} name="cliCoupon" />
//                       </div>
//                   </div>
//                   <button type="submit" className="w-full shadow-xl mt-3 mb-10 bg-warning rounded-md h-14 text-white dark:text-white">
//                       Submit
//                   </button>
//               </div>
//       </form>     
//     </div>
//   )
// }

// export default PesaPalPay