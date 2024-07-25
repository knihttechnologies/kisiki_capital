import React, {useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import './styles.css';
import FormContext from '../../context/FormContext';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import FormFour from './FormFour';
import CheckoutFormModal from './CheckoutFormModal';
import { useAuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import GooglePay from '../../api/GooglePay';

const StepForm = ({color}) => {
    //const location = useAuthContext()
    // const loggedInUser = localStorage.getItem("person");
    // const foundUser = jwtDecode(loggedInUser);
    const data = null;
    //console.log(foundUser)
    const auth = useAuthContext()
    const [step, setStep] = useState(0);
    const [loading, setloading] = useState(false);
    const [clickedColor, setClickedColor] = React.useState(0);
    const [msg, setMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [openTab, setOpenTab] = React.useState(1);
    //state for openining and closing modals
    const [openGoogleTab, setOpenGoogleTab] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(true);
    const [openAcctTab, setOpenAcctTab] = React.useState(1);
    const [cardPrice, setCardPrice] = React.useState(10000);
    const [checked, setChecked] = React.useState(1);
    const [userFormData, setUserFormData] = React.useState({
        entitytype: '',
        pkgtitle: '',
        pkgprice: 0,
        tradingcurrency: '',
        acctbal: 0,
        platform: '',
        type: '',
        discount: 0,
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        companyName: '',
        vatNumber: '',
        businessRegNo: '',
        compcountry: '',
        comppostalCode: '',
        compcity: '',
        compaddress: '',
        compphonenumber: '',
        billingCountry: '',
        billingPostalCode: '',
        billingCity: '',
        billingAddress: '',
        billingPhoneNumber: '',
        isverifiedCompany: '',
        status: 'Pending',
        checkedOne: false,
        checkedTwo: false,
        userId: data?.user_id
    });

    const userDetails = {
        setStep,
        loading, setloading,
        openAcctTab, setOpenAcctTab,
        cardPrice, setCardPrice,
        msg, setMsg,
        checked, setChecked,
        userFormData, setUserFormData,
        currentPage: step,
        errMsg, setErrMsg,
        clickedColor, setClickedColor
    };
    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name
        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value
        setUserFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(userFormData)
    };
    //register function
    const RegisterPackageSubscriber = async ({
        entitytype,
        pkgtitle,
        pkgprice,
        tradingcurrency,
        acctbal,
        platform,
        type,
        discount,
        status,
        checkedOne,
        checkedTwo,
        userId
    }) => {
        try {
            auth.setLoading(true);
            const response = await axios.post("/api/auth/users/registersubscriber", { 
                entitytype,
                pkgtitle,
                pkgprice,
                tradingcurrency,
                acctbal,
                platform,
                type,
                discount,
                status,
                checkedOne,
                checkedTwo,
                userId
            })
            if(!response) return setErrMsg("Something went wrong in the try block")
            console.log(response)
            if (response.status === 201) {
                //const userData = jwtDecode(response?.data?.accessToken)
                //console.log(userData.userSession)
                setMsg(`Form Submitted`)
                localStorage.setItem("pkgsubscriber", response?.data?.accessToken);
                //navigate("/dashboard");
                return;
            }
        } catch (err) {
            //console.log(err)
            setErrMsg(err.response.data.message)
        }finally {
            // we finally end the loading session
            return auth.setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userFormData)
        //if(userFormData.checkedOne === false && userFormData.checkedTwo === false) return setErrMsg("You must Agree to the terms")
        const res = await RegisterPackageSubscriber({
            entitytype: userFormData.entitytype,
            pkgtitle: userFormData.pkgtitle,
            pkgtrice: userFormData.pkgprice,
            tradingcurrency: userFormData.tradingcurrency,
            acctbal: userFormData.acctbal,
            platform: userFormData.platform,
            type: userFormData.type,
            discount: userFormData.discount,
            status: userFormData.status,
            checkedOne: userFormData.checkedOne,
            checkedTwo: userFormData.checkedTwo,
            userId: data?.user_id,
        })
        console.log(res)
        //auth.setShowCheckOutModal(true)
        setOpenGoogleTab(true)
        setOpenForm(false)
        return
    }
    setTimeout(() => {
        setMsg();
        setErrMsg();
    }, 10000);

    return (

        <FormContext.Provider value={{userDetails}}>
            {openForm &&
            <div className="flex flex-wrap w-full mb-10 dark:border-strokedark dark:bg-boxdark">
                {/* <ProgressBar /> */}
                <div className="ml-4 dark:border-strokedark dark:bg-boxdark">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row dark:border-strokedark dark:bg-boxdark"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                            <a
                            className={
                                "dark:text-white text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? `bg-warning text-white`
                                    : `bg-slate-400 text-slate-300`)
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                            >
                            One Phase Funding
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                            <a
                            className={
                                "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? `bg-primary text-white`
                                    : `bg-slate-400 text-slate-300`)
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                            >
                                Two Phase Funding
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded dark:border-strokedark dark:bg-boxdark">
                        <div className="px-4 py-5 flex-auto dark:border-strokedark dark:bg-boxdark">
                            <div className="tab-content tab-space dark:border-strokedark dark:bg-boxdark">
                                <div className={`grid grid-cols-12 gap-4 ${openTab === 1 ? "block" : "hidden"}`} id="link1">
                                    <FormOne color={clickedColor}  handleChange={handleChange}/> 
                                </div>
                                <div className={`grid grid-cols-12 gap-4 ${openTab === 2 ? "block" : "hidden"}`} id="link2">
                                    <FormTwo color={clickedColor}  handleChange={handleChange} />
                                </div>
                                {msg && <p className={"bg-primary text-white rounded-2xl mb-5 p-2 text-center "} >{msg}</p>}
                        {errMsg && <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{errMsg}</p>}
                                <div className="container justify-center p-5">
                                    <div>
                                        <form   onSubmit={handleSubmit}>
                                            <button className="mt-10 mb-5 shadow-xl bg-warning rounded-lg text-white p-2 w-60">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="container mb-20 dark:border-strokedark dark:bg-boxdark">
                <div className={openGoogleTab ? "block" : "hidden"} id="link3">
                    <GooglePay totalPrice={userFormData.discount !== 0 ? userFormData?.pkgprice - userFormData.discount / 100 * userFormData?.pkgprice : userFormData?.pkgprice}/>     
                </div>
            </div>
            <CheckoutFormModal title="Checkout" btnName="Close"/>
        </FormContext.Provider>
    );
};

export default StepForm;

// import React, {useState} from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import './styles.css';
// import FormContext from '../../context/FormContext';
// import FormOne from './FormOne';
// import FormTwo from './FormTwo';
// import FormThree from './FormThree';
// import FormFour from './FormFour';
// import CheckoutFormModal from './CheckoutFormModal';
// import { useAuthContext } from '../../context/AuthContext';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import GooglePay from '../../api/GooglePay';

// const StepForm = ({color}) => {
//     //const location = useAuthContext()
//     // const loggedInUser = localStorage.getItem("person");
//     // const foundUser = jwtDecode(loggedInUser);
//     const data = null;
//     //console.log(foundUser)
//     const auth = useAuthContext()
//     const [step, setStep] = useState(0);
//     const [loading, setloading] = useState(false);
//     const [clickedColor, setClickedColor] = React.useState(0);
//     const [msg, setMsg] = useState(null);
//     const [errMsg, setErrMsg] = useState(null);
//     const [openTab, setOpenTab] = React.useState(1);
//     const [openSecondTab, setOpenSecondTab] = React.useState(3);
//     const [openAcctTab, setOpenAcctTab] = React.useState(1);
//     const [cardPrice, setCardPrice] = React.useState(10000);
//     const [checked, setChecked] = React.useState(1);
//     const [userFormData, setUserFormData] = React.useState({
//         entitytype: '',
//         pkgtitle: '',
//         pkgprice: 0,
//         tradingcurrency: '',
//         acctbal: 0,
//         platform: '',
//         type: '',
//         discount: 0,
//         title: '',
//         firstname: '',
//         lastname: '',
//         email: '',
//         companyName: '',
//         vatNumber: '',
//         businessRegNo: '',
//         compcountry: '',
//         comppostalCode: '',
//         compcity: '',
//         compaddress: '',
//         compphonenumber: '',
//         billingCountry: '',
//         billingPostalCode: '',
//         billingCity: '',
//         billingAddress: '',
//         billingPhoneNumber: '',
//         isverifiedCompany: '',
//         status: 'Pending',
//         checkedOne: false,
//         checkedTwo: false,
//         userId: data?.user_id
//     });

//     const userDetails = {
//         setStep,
//         loading, setloading,
//         openAcctTab, setOpenAcctTab,
//         cardPrice, setCardPrice,
//         msg, setMsg,
//         checked, setChecked,
//         userFormData, setUserFormData,
//         currentPage: step,
//         errMsg, setErrMsg,
//         clickedColor, setClickedColor
//     };
//     const handleChange = (e) => {
//         const type = e.target.type
//         const name = e.target.name
//         const value = type === "checkbox"
//             ? e.target.checked
//             : e.target.value
//         setUserFormData(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//         console.log(userFormData)
//     };
//     //login function
//     const RegisterPackageSubscriber = async ({
//         entitytype,
//         pkgtitle,
//         pkgprice,
//         tradingcurrency,
//         acctbal,
//         platform,
//         type,
//         discount,
//         title,
//         firstname,
//         lastname,
//         email,
//         companyName,
//         vatNumber,
//         businessRegNo,
//         compcountry,
//         comppostalCode,
//         compcity,
//         compaddress,
//         compphonenumber,
//         isverifiedCompany,
//         billingCountry,
//         billingPostalCode,
//         billingCity,
//         billingAddress,
//         billingPhoneNumber,
//         status,
//         checkedOne,
//         checkedTwo,
//         userId
//     }) => {
//         try {
//             auth.setLoading(true);
//             const response = await axios.post("/api/auth/users/registersubscriber", { 
//                 entitytype,
//                 pkgtitle,
//                 pkgprice,
//                 tradingcurrency,
//                 acctbal,
//                 platform,
//                 type,
//                 discount,
//                 title,
//                 firstname,
//                 lastname,
//                 email,
//                 companyName,
//                 vatNumber,
//                 businessRegNo,
//                 compcountry,
//                 comppostalCode,
//                 compcity,
//                 compaddress,
//                 compphonenumber,
//                 isverifiedCompany,
//                 billingCountry,
//                 billingPostalCode,
//                 billingCity,
//                 billingAddress,
//                 billingPhoneNumber,
//                 status,
//                 checkedOne,
//                 checkedTwo,
//                 userId
//             })
//             if(!response) return setErrMsg("Something went wrong in the try block")
//             console.log(response)
//             if (response.status === 201) {
//                 //const userData = jwtDecode(response?.data?.accessToken)
//                 //console.log(userData.userSession)
//                 setMsg(`Form Submitted`)
//                 localStorage.setItem("pkgsubscriber", response?.data?.accessToken);
//                 //navigate("/dashboard");
//                 return;
//             }
//         } catch (err) {
//             //console.log(err)
//             setErrMsg(err.response.data.message)
//         }finally {
//             // we finally end the loading session
//             return auth.setLoading(false);
//         }
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(userFormData)
//         //if(userFormData.checkedOne === false && userFormData.checkedTwo === false) return setErrMsg("You must Agree to the terms")
//         const res = await RegisterPackageSubscriber({
//             entitytype: userFormData.entitytype,
//             pkgtitle: userFormData.pkgtitle,
//             pkgtrice: userFormData.pkgprice,
//             tradingcurrency: userFormData.tradingcurrency,
//             acctbal: userFormData.acctbal,
//             platform: userFormData.platform,
//             type: userFormData.type,
//             discount: userFormData.discount,
//             title: userFormData.title,
//             firstname: userFormData.firstname,
//             lastname: userFormData.lastname,
//             email: userFormData.email,
//             companyName: userFormData.companyName,
//             vatNumber: userFormData.vatNumber,
//             businessRegNo: userFormData.businessRegNo,
//             compcountry: userFormData.compcountry,
//             comppostalcode: userFormData.comppostalCode,
//             compcity: userFormData.compcity,
//             compaddress: userFormData.compaddress,
//             compphone: userFormData.compphonenumber,
//             isverifiedCompany: userFormData.isverifiedCompany,
//             billingCountry: userFormData.billingCountry,
//             billingPostalCode: userFormData.billingPostalCode,
//             billingCity: userFormData.billingCity,
//             billingAddress: userFormData.billingAddress,
//             billingPhoneNumber: userFormData.billingPhoneNumber,
//             status: userFormData.status,
//             checkedOne: userFormData.checkedOne,
//             checkedTwo: userFormData.checkedTwo,
//             userId: data?.user_id,
//         })
//         console.log(res)
//         auth.setShowCheckOutModal(true)
//         return
//     }
//     setTimeout(() => {
//         setMsg();
//         setErrMsg();
//     }, 10000);

//     return (

//         <FormContext.Provider value={{userDetails}}>
//             <div className="flex flex-wrap w-full mb-10 dark:border-strokedark dark:bg-boxdark">
//                 {/* <ProgressBar /> */}
//                 <div className="ml-4 dark:border-strokedark dark:bg-boxdark">
//                     <ul
//                         className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row dark:border-strokedark dark:bg-boxdark"
//                         role="tablist"
//                     >
//                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
//                             <a
//                             className={
//                                 "dark:text-white text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//                                 (openTab === 1
//                                     ? `bg-warning text-white`
//                                     : `bg-slate-400 text-slate-300`)
//                             }
//                             onClick={e => {
//                                 e.preventDefault();
//                                 setOpenTab(1);
//                             }}
//                             data-toggle="tab"
//                             href="#link1"
//                             role="tablist"
//                             >
//                             One Phase Funding
//                             </a>
//                         </li>
//                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
//                             <a
//                             className={
//                                 "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//                                 (openTab === 2
//                                     ? `bg-primary text-white`
//                                     : `bg-slate-400 text-slate-300`)
//                             }
//                             onClick={e => {
//                                 e.preventDefault();
//                                 setOpenTab(2);
//                             }}
//                             data-toggle="tab"
//                             href="#link2"
//                             role="tablist"
//                             >
//                                 Two Phase Funding
//                             </a>
//                         </li>
//                     </ul>
//                     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded dark:border-strokedark dark:bg-boxdark">
//                         <div className="px-4 py-5 flex-auto dark:border-strokedark dark:bg-boxdark">
//                             <div className="tab-content tab-space dark:border-strokedark dark:bg-boxdark">
//                                 <div className={`grid grid-cols-12 gap-4 ${openTab === 1 ? "block" : "hidden"}`} id="link1">
//                                     <FormOne color={clickedColor} onSubmit={handleSubmit}  handleChange={handleChange}/> 
//                                 </div>
//                                 <div className={`grid grid-cols-12 gap-4 ${openTab === 2 ? "block" : "hidden"}`} id="link2">
//                                     <FormTwo color={clickedColor} onSubmit={handleSubmit} handleChange={handleChange} />
//                                 </div>
//                                 <div className="container justify-center p-5">
//                                     <GooglePay totalPrice={userFormData.discount !== 0 ? userFormData?.pkgprice - userFormData.discount / 100 * userFormData?.pkgprice : userFormData?.pkgprice}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <div className="flex flex-wrap dark:border-strokedark dark:bg-boxdark">
//                 <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//                     <h3 className="font-medium text-black dark:text-white">
//                         Billing Details
//                     </h3>
//                 </div>
//                 <div className="w-full dark:border-strokedark dark:bg-boxdark">
//                     <ul
//                         className="flex w-100 mb-0 list-none flex-wrap pt-3 pb-4 flex-row dark:border-strokedark dark:bg-boxdark"
//                         role="tablist"
//                     >
//                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-black">
//                             <a
//                             className={
//                                 "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//                                 (openSecondTab === 3
//                                     ? `text-slate-300 bg-${color}-200`
//                                     : `text-${color}-700 bg-slate-400`)
//                             }
//                             onClick={e => {
//                                 e.preventDefault();
//                                 setOpenSecondTab(3);
//                             }}
//                             data-toggle="tab"
//                             href="#link3"
//                             role="tablist"
//                             >
//                                 People
//                             </a>
//                         </li>
//                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-black">
//                             <a
//                             className={
//                                 "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//                                 (openSecondTab === 4
//                                     ? `text-slate-300 bg-${color}-200`
//                                     : `text-${color}-700 bg-slate-400`)
//                             }
//                             onClick={e => {
//                                 e.preventDefault();
//                                 setOpenSecondTab(4);
//                             }}
//                             data-toggle="tab"
//                             href="#link4"
//                             role="tablist"
//                             >
//                                 Company
//                             </a>
//                         </li>
//                     </ul>
//                     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded dark:border-strokedark dark:bg-boxdark">
//                         <div className="w-full px-4 py-5 flex-auto dark:border-strokedark dark:bg-boxdark">
//                             <div className="md:w-full tab-content tab-space dark:border-strokedark dark:bg-boxdark">
//                                 <div className={openSecondTab === 3 ? "block" : "hidden"} id="link3">
//                                     <FormThree onSubmit={handleSubmit} handleChange={handleChange} />      
//                                 </div>
//                                 <div className={openSecondTab === 4 ? "block" : "hidden"} id="link4">
//                                     <FormFour onSubmit={handleSubmit} handleChange={handleChange} />
//                                 </div>
//                             </div>
//                         </div>
//                         {msg && <p className={"bg-primary text-white rounded-2xl mb-5 p-2 text-center "} >{msg}</p>}
//                         {errMsg && <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{errMsg}</p>}
//                     </div>
//                 </div>
//             </div> */}
//             <CheckoutFormModal title="Checkout" btnName="Close"/>
//         </FormContext.Provider>
//     );
// };

// export default StepForm;