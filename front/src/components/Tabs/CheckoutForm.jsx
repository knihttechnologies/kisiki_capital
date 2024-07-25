import React, {useContext}from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
//import LogoDark from '../../images/logo/logo-dark.svg';
//import Logo from '../../images/logo/logo.svg';
import { AuthInput, AuthSelect } from '../../components/Inputs/AuthInput';
import { useAuthContext } from '../../context/AuthContext';
import { TabsSelect } from '../../components/Tabs/TabsInput';
import useCreate from '../../hooks/useCreate';
import Loader from '../../common/Loader'
import FormContext from '../../context/FormContext';
import { jwtDecode } from 'jwt-decode';

const CheckoutForm = ({onClick}) => {
  const navigate = useNavigate()
  const myContext = useContext(FormContext);
  const updateContext = myContext?.userDetails;
  //const pkgSubscriber = localStorage.getItem("pkgsubscriber");
  ////if(!pkgSubscriber) return <Navigate to="/signin" state={{ from: location }} replace />
 // const foundUser = jwtDecode(pkgSubscriber);
  const data = ""//foundUser.userSession
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
		updateContext.setUserFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	};
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')
    console.log(auth?.userFormData)
  } ;
  // <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{loadingUserCreated}</p>
  return auth.loading ? <Loader/> : (
    <>
      {auth?.msg && <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{auth.msg}</p>}
      {auth?.userErrorCreated && <p className={"bg-primary text-white rounded-2xl mb-5 pt-2 pb-2 "} >{auth.userErrorCreated}</p>}
      <div className="flex flex-col w-full">
        <div className=" flex flex-row gap-4 mb-4">
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Title
            </label>
            <div className="relative">
            
              {/* <AuthSelect label={"Title"} name={"title"} onChange={handleChange} /> */}
              <p>{data && data?.sub_title}</p>
              
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              First Name
            </label>
            <div className="relative">
              {/* <AuthInput name={"firstname"} onChange={handleChange} placeholder={"First Name"} type={'text'} /> */}
              <p>{data && data?.sub_firstname}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Last Name
            </label>
            <div className="relative">
              <p>{data && data?.sub_lastname}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Country
            </label>
            <div className="relative">
              {/* <TabsSelect label={"Country"} name={"country"} onChange={handleChange} /> */}
              <p>{data && data?.sub_country}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <p>{data && data?.sub_email}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-8 mb-4">
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Package Name
            </label>
            <div className="relative">
              <p>{data?.package_title}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Price
            </label>
            <div className="relative">
              <p>{data?.discount ? data?.discount / data?.package_price * 100 : data?.package_price}</p>
              
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Discount
            </label>
            <div className="relative">
              <p>{data?.discount}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Billing Country
            </label>
            <div className="relative">
              {/* <TabsSelect label={"Country"} name={"country"} onChange={handleChange} /> */}
              <p>{data?.sub_country}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Billing City
            </label>
            <div className="relative">
              <p>{data?.sub_city}</p>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Billing Address
            </label>
            <div className="relative">
              <p>{data?.sub_address}</p>
            </div>
          </div>
        </div>
        <div className="mt-20 mb-5 items-center">
          <form onSubmit={handleSubmit}>
            <input type="hidden" value="User" onChange={handleChange} name={"roleId"} />
            <input type="hidden" value={data && data?.trading_currency} onChange={handleChange} name={"tradingcurrency"} />
            <input type="hidden" value={data && data?.discount ? data?.discount / data?.package_price * 100 : data?.package_price} onChange={handleChange} name={"pkgprice"} />
            
            <button
                type="submit"
                className="w-80 mb-5 cursor-pointer rounded-lg border border-primary bg-slate-500 p-4 text-white transition hover:bg-opacity-90"
            >
                Pay with crypto
            </button>
            <button
                type="submit"
                className="w-80 mb-5 cursor-pointer rounded-lg border border-primary bg-slate-300 p-4 text-black transition hover:bg-opacity-90"
            >
                Pay with Card
            </button>
          </form>
        </div>
      </div>
    </>
            
  );
};

export default CheckoutForm;
