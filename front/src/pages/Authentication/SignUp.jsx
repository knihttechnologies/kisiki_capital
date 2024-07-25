import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import LogoDark from '../../images/logo/logo-dark.svg';
//import Logo from '../../images/logo/logo.svg';
import { AuthInput, AuthSelect } from '../../components/Inputs/AuthInput';
import { useAuthContext } from '../../context/AuthContext';
import { TabsSelect } from '../../components/Tabs/TabsInput';
import Loader from '../../common/Loader'
import useCreate from '../../hooks/useCreate';

const SignUp = ({onClick}) => {
  const navigate = useNavigate()
  const auth = useAuthContext();
  const {createUser} = useCreate()
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
		auth.setUserSignup(prevData => ({
			...prevData,
			[name]: value
		}))
	};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(auth.userSignup.checking == false) return auth.setErrMsg(`Please accept the ${<Link to="/terms-and-conditions" className="text-primary"> Terms & Conditions</Link>}`)
    if (auth.userSignup.email !== ' ' || auth.userSignup.email !== null && auth.userSignup.password !== ' ' || auth.userSignup.password !== null){
      const res = await createUser({  title: auth.userSignup.title,  firstname: auth.userSignup.firstname, lastname: auth.userSignup.lastname, country: auth.userSignup.country, email: auth.userSignup.email, password: auth.userSignup.password, isVerifiedUser: auth.userSignup.isVerifiedUser, roleId: auth.userSignup.role})
      //for debugging purposes
      //console.log(res)
      setTimeout(() => {
        auth.setMsg('')
        auth.setErrMsg('')
      }, 10000);
      auth.setShowModal(false)
    }else {
      auth.setErrMsg("Email or password cannot be empty")
      return //navigate("/signin")
    }
    //The 201 Created status code means that the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
  };
  // <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{loadingUserCreated}</p>
  return auth.loading ? <Loader /> : (
    <>
      {auth.msg && <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{auth.msg}</p>}
      {auth.errMsg && <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{auth.errMsg}</p>}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full flex flex-row flex-wrap gap-4 mb-4">
          <div className="w-full">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Title
            </label>
            <div className="relative">
            <input type="hidden" value="User" onChange={handleChange} name={"roleId"} />
              <AuthSelect label={"Title"} name={"title"} onChange={handleChange} />
              
            </div>
          </div>
          <div className="w-full">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              First Name
            </label>
            <div className="relative">
              <AuthInput name={"firstname"} onChange={handleChange} placeholder={"First Name"} type={'text'} />
              <span className="absolute right-4 top-4">
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
                      d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                      fill=""
                    />
                    <path
                      d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Last Name
            </label>
            <div className="relative">
              <AuthInput name={"lastname"} onChange={handleChange} placeholder={"Last Name"} type={'text'} />
              <span className="absolute right-4 top-4">
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
                      d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                      fill=""
                    />
                    <path
                      d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-row flex-wrap gap-4 mb-4">
          <div className="w-full">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Country
            </label>
            <div className="relative">
              <TabsSelect label={"Country"} name={"country"} onChange={handleChange} />
            </div>
          </div>
          <div className="w-full">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <AuthInput name={"email"} onChange={handleChange} placeholder={"Email"} type={'email'} />
              <span className="absolute right-4 top-2">
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
                      d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                      fill=""
                    />
                    <path
                      d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-10 mb-4">
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <AuthInput name={"password"} onChange={handleChange} placeholder={"Password"} type={auth.showPass ? 'text' : 'password' }/>
              <button onClick={togglePasswordVisibility} className="absolute right-4 top-4">
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
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <AuthInput name={"cpassword"} onChange={handleChange} placeholder={"Confirm Password"} type={auth.showPass ? 'text' : 'password' } />
              <button onClick={togglePasswordVisibility} className="absolute right-4 top-4">
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
        </div>
        <div className="mb-5">
          <div className="flex flex-row in-line gap-2 mt-10 mb-10">
              <input
                  type="checkbox"
                  id="persist"
                  name="checking"
                  onChange={handleChange}
                  checked={auth.userSignup.checking}
              />
              <label htmlFor="persist">Trust This Device</label>
              <p className="">
                Please accept the<Link to="/terms-and-conditions" className="text-primary"> Terms & Conditions</Link>
              </p>
          </div>
          <input
            type="submit"
            value="Create account"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
            
  );
};

export default SignUp;
