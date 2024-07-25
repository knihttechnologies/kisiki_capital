import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import FormContext from '../../context/FormContext';
import './styles.css';
import {TabsInput, TabsSelect, CheckBox, FooterButton} from "./TabsInput";
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../../context/AuthContext';
import CheckoutFormModal from './CheckoutFormModal';

const FormThree = ({onSubmit, handleChange}) => {
    const auth = useAuthContext()
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    // const loggedInUser = localStorage.getItem("person");
    // if(!loggedInUser) return <Navigate to="/auth" state={{ from: location }} replace />
    // const foundUser = jwtDecode(loggedInUser);
    const data = null
   
    // const handleChange = (e) => {
    //     const type = e.target.type
	// 	const name = e.target.name
	// 	const value = type === "checkbox"
	// 	    ? e.target.checked
	// 		: e.target.value
    //     updateContext.setUserFormData(prevState => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    //     console.log(updateContext.userFormData)
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     //console.log(updateContext.userFormData)
    //     updateContext.setMsg("Form was submitted")
    //     // if (auth.userAuth.email !== ' ' || auth.userAuth.email !== null && auth.userAuth.password !== ' ' || auth.userAuth.password !== null){
    //     //   auth.loginAction(auth.userAuth.email, auth.userAuth.password)
    //     //   console.log(auth.persist)
    //     //   return
    //     // }else {
    //     //   auth.setErrMsg("Email or password cannot be empty")
    //     //   return //navigate("/signin")
    //     // }
    //   };

    return (
        <>
            <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-strokelight bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    {updateContext.msg && updateContext.msg }
                    <div className="flex mt-4 gap-8 p-8">
                        <form className="flex flex-row flex-wrap mt-4 gap-10" onSubmit={onSubmit}>
                            <div>
                                    <TabsInput type="hidden"
                                        name="entitytype"
                                        value="person"
                                        onChange={handleChange} 
                                    />
                                    <TabsInput type="hidden"
                                        name="userId"
                                        value={data && data?.user_id}
                                        onChange={handleChange} 
                                    />
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Title
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="Title"
                                        name="title"
                                        value={data && data?.user_title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    First Name
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="First Name"
                                        name="firstName"
                                        value={data && data?.user_firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={data && data?.user_lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Country
                                </label>
                                <div className="relative">
                                    <TabsSelect
                                        name="country"
                                        value={data && data?.user_country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Postal Code
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="Postal Code"
                                        name="postalCode"
                                        value={data && data?.user_zip}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    City
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="City"
                                        name="city"
                                        value={data && data?.user_city}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Address
                                </label>
                                <div className="relative">
                                <TabsInput 
                                    type="text" 
                                    placeholder="Address"
                                    name="address"
                                    value={data && data?.user_address}
                                    onChange={handleChange} 
                                />
                            </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <TabsInput 
                                        type="text" 
                                        placeholder="Phone Number"
                                        name="phonenumber"
                                        maxLength="10"
                                        value={data && data?.user_phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4" >
                            <div className="w-full flex gap-10" >
                                <div className="flex-col">
                                    <CheckBox
                                        label={"I agree to the terms and conditions"}
                                        type="checkbox"
                                        name="checked"
                                        defaultChecked={updateContext.checkedOne}
                                        onChange={handleChange}
                                    />
                                    {/* <CheckBox
                                        label={"I accept the refund policy"} 
                                        type="checkbox"
                                        name="checkedTwo"
                                        defaultChecked={updateContext.checkedTwo} 
                                        onChange={handleChange}
                                        /> */}
                                </div>
                                <div className="ps-30 float-right h-15 items-center">
                                    <input 
                                        type="submit" 
                                        className="p-6 bg-primary w-full text-white dark:bg-primary rounded-2xl " 
                                        value="Update"
                                    />
                                </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormThree;