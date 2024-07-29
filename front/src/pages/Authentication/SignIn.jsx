import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/kisiki-capital-04.png';
import Logo from '../../images/kisiki-capital-01.png';
//import DefaultLayout from '../../layout/DefaultLayout';
import {BackwardIcon} from "@heroicons/react/24/solid"
import { AuthInput } from '../../components/Inputs/AuthInput';
import { useAuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';
import { useTableContext } from '../../context/TableContext';

const SignIn = () => {
  const navigate = useNavigate()
  const table = useTableContext()
  const [checkAuth, setCheckAuth] = useState(false)
  const urls = {
    rolesurl: '/users/createrolesmanually',
    secondrolesurl: '/users/userroles'
  }
  const auth = useAuthContext()
  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    auth.setShowPass(!auth.showPass);
  };
  const handleChange = e => {
		const type = e.target.type
		const name = e.target.name
		const value = type === "checkbox"
		    ? e.target.checked
			  : e.target.value
		auth.setUserAuth(prevData => ({
			...prevData,
			[name]: value
		}))
	};
  
  //clear the messages
  useEffect(() => {
    const timer = setTimeout(() => {
      auth.setMsg()
      auth.setErrMsg()
    }, 7000);
    return () => clearTimeout(timer);
  }, [auth.errMsg]);

  //useFetch()
  //Submit the form for authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check to see if user inputs are not empty
    if (auth.userAuth.email !== ' ' || auth.userAuth.email !== null && auth.userAuth.password !== ' ' || auth.userAuth.password !== null && auth.userTermsCheck !== true || auth.userTermsCheck !== null){
      await auth.loginAction(auth.userAuth.email, auth.userAuth.password)
      setCheckAuth(true)
      //console.log(auth.persist)
      setTimeout(() => {
        auth.setMsg()
        auth.setErrMsg()
        auth.setAuthErrMsg()
        table.setTableErr()
      }, 10000);
    }else {
      auth.setErrMsg("Email or password cannot be empty")
      return //navigate("/signin")
    }
  };
   
  const inputLabelClass = "mb-2.5 block float-left font-medium text-black/100 dark:text-warning"
  
  return (
    <>
        <div className="flex justify-center">
          <Link to="/">
            <img className="w-35 h-15" src={Logo} alt="Logo" />
          </Link>
        </div>
      <form className="container w-full mt-10 flex justify-center shadow-xl rounded-md " id='login' onSubmit={handleSubmit}>
        {auth.msg && <p className={"bg-primary text-white rounded-2xl mb-5 p-2 text-center "} >{auth.msg}</p>}
        {auth.authErrMsg && <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{auth.authErrMsg}</p>}
        {auth.errMsg && <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{auth.errMsg}</p>}
        {table.tableErr && <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{table.tableErr}</p>}
        {/* <p className="mt-2 mb-5"> Don't have an account 
            <button className="text-warning p-2 ml-2 shadow-lg rounded-lg" onClick={() => {
                auth.setOpenSignIn(false)
                auth.setOpenSignUp(true)
            }}>
                Register here
            </button> 
        </p> */}
        <h1 className="text-black/100 dark:text-white font-bold text-center text-lg shadow-xl p-4 mt-6 mb-5">
            Already have an account? <span className="bg-warning p-2 text-white rounded-lg shadow-xl ml-4">Login</span> 
        </h1>
        <div className="mb-6">
          <label className={inputLabelClass}>
            Email
          </label>
          <AuthInput name={"email"} onChange={handleChange} placeholder={"example@example.com"} type={'email'} />
        </div>
        <div className="mb-6 mt-6">
          <label className={inputLabelClass}>
            Password
          </label>
          <div className="relative">
            <AuthInput name={"password"} onChange={handleChange} placeholder="6+ Characters, 1 Capital letter" type={auth.showPass ? 'text' : 'password'} />
            <button type='submit' onClick={togglePasswordVisibility} className="absolute right-4 top-9">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                    fill=""
                  />
                  <path
                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                    fill=""
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="relative mt-5 mb-5">
          {/* <div className="flex flex-row in-line gap-2 mt-10 mb-10">
              <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={auth.persist }
              />
              <label htmlFor="persist">Trust This Device</label>
              <p className="">
                This site is protected by reCAPTCHA and the Google <Link className="text-primary">Privacy Policy</Link> and <Link className="text-primary"> Terms of Service</Link> apply.
              </p>
          </div> */}
          <button
            type="submit"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-warning p-4 text-white transition hover:bg-opacity-90"
          >
            Log In
          </button>
        </div>
        
      </form>
      
    </>
  );
};

export default SignIn;
