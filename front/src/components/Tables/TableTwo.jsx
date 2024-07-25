import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsCard from '../Tabs/TabsCard';
import { useTableContext } from '../../context/TableContext';
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../../context/AuthContext';

const TableTwo = () => {
    const navigate = useNavigate()
    const updateContext = useTableContext();
    const auth = useAuthContext()
    const [randomPass, setRandomPass] = useState("")
    const [passwordLength, setPasswordLength] = useState(12);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const packageData = [
        {
          name: 'Profit target',
          infofunded: '-',
        },
        {
          name: 'Max daily loss',
          infofunded: '5%',
        },
        {
          name: 'Max loss',
          infofunded: '10%',
        },
        {
          name: 'Profit Split',
          infofunded: 'Up To 100%',
        },
        {
          name: 'EA Trading',
          infofunded: 'No',
        },
        {
          name: 'Trading Period',
          infofunded: 'Unlimited'
        },
    ];
    let btnword = {
        tradingCurrency: [
            {indexNum: 1, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "USD"},
            {indexNum: 2, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: "EURO"},
            {indexNum: 3, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: "GBP"}
        ],
        acctBal: {
            acct1: {
                title: "USD",
                tc: [
                    {indexNum: 1, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000},
                    {indexNum: 2, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 25000},
                    {indexNum: 3, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 50000},
                    {indexNum: 4, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 100000},
                    {indexNum: 5, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 200000},
                ]
            },
            acct2: {
                title: "EUR",
                tc: [
                    {indexNum: 1, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000},
                    {indexNum: 2, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 20000},
                    {indexNum: 3, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 40000},
                    {indexNum: 4, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 80000},
                    {indexNum: 5, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 160000},
                ]
            },
            acct3: {
                title: "GBP",
                tc: [
                    {indexNum: 1, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000},
                    {indexNum: 2, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 20000},
                    {indexNum: 3, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 35000},
                    {indexNum: 4, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 70000},
                    {indexNum: 5, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 140000},
                ]
            }
        },
        platform: [
            { indexNum: 1, word: "Regular" },
            { indexNum: 2, word: "Swap-free" }
        ],
        type: [
            {  indexNum: "1", word: "Match-Trader" },
            {  indexNum: "2", word: "cTrader" },
        ]
        
    }
    const mapingTitle = btnword.acctBal.acct1.title
    const mapingWord = btnword.acctBal.acct1
    let icons = {
        usd: {
          currency: "USD",
          icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />,
          values: [
            {id: 1, acctBal: 10000, cardPrice: 89},
            {id: 2, acctBal: 20000, cardPrice: 189},
            {id: 3, acctBal: 50000, cardPrice: 299},
            {id: 4, acctBal: 100000, cardPrice: 499},
            {id: 5, acctBal: 200000, cardPrice: 998}
          ]
    
        },
        euro: {
          currency: "EURO",
          icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />,
          values: [
            {id: 1, acctBal: 10000, cardPrice: 89},
            {id: 2, acctBal: 20000, cardPrice: 189},
            {id: 3, acctBal: 40000, cardPrice: 299},
            {id: 4, acctBal: 80000, cardPrice: 499},
            {id: 5, acctBal: 160000, cardPrice: 998}
          ]
        },
        gbp: {
          currency: "GBP",
          icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />,
          values: [
            {id: 1, acctBal: 10000, cardPrice: 89},
            {id: 2, acctBal: 20000, cardPrice: 189},
            {id: 3, acctBal: 35000, cardPrice: 299},
            {id: 4, acctBal: 70000, cardPrice: 499},
            {id: 5, acctBal: 140000, cardPrice: 998}
          ]
        },
    }
    //useEffect(() => emailjs.init("Napm9yHzNIRu8WVGX"), []);
    //
    const handleChange = (e) => {
		updateContext.setOrder(prevData => ({
			...prevData,
			[e.target.name]: e.target.value
		}))
    }
    //random username
    //random password
    const generatePassword = () => {
        let charset = "";
        let newPassword = "";
 
        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
 
        setRandomPass(newPassword);
    };
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(updateContext?.order?.useremail === null || updateContext?.order?.useremail === "") return updateContext?.setTableErr('Email cannot be empty')
        const message = `Your order ${updateContext?.order?.pkgtitle}, has been registered. You pay $${updateContext?.order?.pkgprice} to get an account balance of $${updateContext?.order?.acctbal}, Go back to the website and login with these credentials: username - (${updateContext?.order?.useremail}) and the password - ${randomPass}`
        //variables for the email auth
        const serviceId = "kisiki_2iete9t";
        const templateId = "template_1kar0f1";
        const templateParams = {
            to: updateContext?.order?.useremail,
            name: 'Kisiki Capital',
            message: message,
        }
        if(updateContext?.order?.pkgtitle === "" && updateContext?.order?.pkgprice === "") {
            return updateContext.setTableErr('The input fields cannot be empty');
        }
        try {
            await emailjs?.send(serviceId, templateId, templateParams,'Napm9yHzNIRu8WVGX', {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'https://api.emailjs.com',
                  'Access-Control-Allow-Methods': 'POST', 
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
              })
            .then((res)=>{
                if(res.status === 200) updateContext?.setTableEmailMsg(`We have sent you an email with your login details .`)
                console.log(res)
            }).catch((err)=>{
                console.log(err)
                //return updateContext?.setTableEmailErr(res)
            })
            
        } catch (err) {
            //console.log(err);
            return updateContext?.setTableEmailErr(err)
        } finally {
            updateContext?.setTableLoading(false);
        }
        try {
            updateContext.setTableLoading(true);
            console.log(updateContext?.order)
            const response = await axios.post("/api/users/registerorders", { 
                useremail: updateContext.order.useremail,
                userpass: updateContext.order.userpass,
                entitytype: '',
                pkgtitle: updateContext.order.pkgtitle,
                pkgprice: updateContext.order.pkgprice,
                tradingcurrency: '',
                acctbal: updateContext.order.acctbal,
                platform: '',
                type: '',
                discount: '',
                status: 'Pending',
                checkedOne: false,
                checkedTwo: false,
                userId: ''
            })
            console.log(response)
            if(response?.status === 201){
                const userData = jwtDecode(response?.data)
                updateContext?.setTableEmailMsg(userData?.message || `Email successfully submitted, A verification link has been sent to your email inbox.`)
                updateContext?.setOrder(userData?.order)
                //const orderId = updateContext.order.order_id
                // localStorage.setItem('order', response?.data?.order)
                localStorage.setItem("person", JSON.stringify(response?.data));
                return 
            }
        } catch (err) {
            console.log(err)
            updateContext?.setTableErr(err?.response?.data?.message)
            auth.setOpenSignIn(true)
            updateContext.setTableModal(false)
            return 
        }finally {
            // we finally end the loading session
            return updateContext.setTableLoading(false);
        }
    }
    const klassInName = "w-30 bg-transparent text-white border-hidden focus:outline-none focus:border-none dark:border-hidden dark:text-white dark:bg-transparent"
    const klassBtnName = "w-30 bg-warning w-30 h-10 rounded-md border-hidden text-white focus:outline-none focus:border-none dark:border-hidden dark:text-white dark:bg-transparent"
  return (
    <div className="flex flex-col flex-wrap items-center">
        <div>
            <p className="text-warning dark:text-white text-info mt-4 mb-2 text-sm">Price changes according to account balance</p>
            <h3 className="text-white mt-8">Account Balance</h3>
            <div >
                <div className="mt-5 mb-10 flex flex-row flex-wrap gap-4">
                    {mapingTitle && mapingWord.tc.map(({indexNum, icon, word}) => 
                        <button
                            icon={icon}  
                            onClick={e => {
                                e.preventDefault();
                                updateContext.setClickedColor(indexNum)
                                updateContext.setCardPrice(word);
                            }} 
                            index={indexNum}
                            name="acctbal"
                            className={`w-30 h-10 text-center text-white dark:white rounded-md bg-${updateContext.clickedColor === indexNum ? 'cyan' : 'slate'}-400`}
                        >{word}</button>
                    )}
                </div>
            </div>
        </div>
        <div className="flex flex-col flex-wrap justify-center gap-5">
            <div className="rounded-sm border border-stroke bg-black/100 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-500 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                            
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                            Details
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((packageItem) => (
                        <tr key={packageItem.name}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-white dark:text-white">
                                {packageItem.name}
                            </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p
                                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-md font-medium ${
                                packageItem.infofunded === 'Unlimited'
                                    ? 'bg-success text-success'
                                    : packageItem.infofunded === 'limited'
                                    ? 'bg-danger text-danger'
                                    : 'bg-warning text-warning'
                                }`}
                            >
                                {packageItem.infofunded}
                            </p>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <div className='flex flex-col p-5'>
                {/* <img
                    alt="Image"
                    src="/image/kisiki-capital-invest.gif"
                    className="h-500 w-100 mb-20 animate-pulse"
                /> */}
                <div className="mt-2 mb-10 flex flex-col  inline gap-10">
                    {updateContext?.tableErr && <p className="bg-red-500 text-white rounded-md text-sm p-3">{updateContext?.tableErr}</p> }
                    {updateContext?.tableEmailMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3">{updateContext?.tableEmailMsg}</p> }
                    {updateContext?.tableEmailErr && <p className="bg-red-500 text-white rounded-md text-sm p-3">{updateContext?.tableEmailErr}</p> }
                    <div>
                        <p className='text-white'>Price: </p>
                    </div>
                    {/* {formData.map(({pkgprice, acctbal}, key)=>{
                        <form onSubmit={onSubmit} key={key}>
                            {icons.usd.icon}
                            <input className={klassInName} name='pkgprice' readOnly defaultValue={pkgprice} onChange={handleChange} />
                            <input type="hidden" name='acctbal' value={acctbal} onChange={handleChange} />
                            <input type="hidden" name='pkgtitle' value="One Phase Funding " onChange={handleChange} />
                            
                            <input
                            className={klassBtnName} type="submit" value="Purchase" 
                            onClick={e => {
                                e.preventDefault();
                                const { name, value } = e.target;
                                updateContext.setOrder(prevState => ({
                                    ...prevState,
                                    ["pkgprice"]: pkgprice,
                                    ["pkgtitle"]: "One Phase Funding",
                                    ["acctbal"]: acctbal,
                                    [name]: value
                                }));
                            }}
                            />
                               
                        </form>
                    })} */}
                    <form onSubmit={handleSubmit}>
                        {updateContext.cardPrice == 10000 ? (
                            <>
                                <div className="flex flex-row mb-10 gap-4">
                                    {icons.usd.icon} 
                                    <input defaultValue={88} onChange={handleChange} name="pkgprice" className={klassInName} readOnly  />
                                </div>
                                <div className="mb-5 flex flex-col gap-2">
                                    <label className="mt-4 mb-2 text-white">Enter your email to receive login details</label>
                                    <input onChange={handleChange} name="useremail" className="p-3 w-70 bg-transparent border rounded-md shadow-xl text-slate-100 placholder:text-white " type="email" placeholder="Enter email" />
                                </div>
                                <button 
                                    className={klassBtnName} 
                                    onClick={(e)=>{
                                             generatePassword()
                                            updateContext.setOrder((prev) => ({
                                                ...prev, 
                                                ['pkgtitle']: "Two Phase Funding",
                                                ['pkgprice']: 88,
                                                ['acctbal']: 10000,
                                                ['userpass']: randomPass,
                                            }))
                                        }
                                    }
                                >Purchase</button>
                            </> 
                        ) : " "}
                        
                        {updateContext.cardPrice == 25000 ? (
                            <>
                                <div className="flex flex-row mb-10 gap-4">
                                    {icons.usd.icon} 
                                    <input defaultValue={130} onChange={handleChange} name="pkgprice" className={klassInName} readOnly  />
                                </div>
                                <div className="mb-5 flex flex-col gap-2">
                                    <label className="mt-4 mb-2 text-white">Enter your email to receive login details</label>
                                    <input onChange={handleChange} name="useremail" className="p-3 w-70 bg-transparent border rounded-md shadow-xl text-slate-100 placholder:text-white " type="email" placeholder="Enter email" />
                                </div>
                                <button 
                                    className={klassBtnName} 
                                    onClick={(e)=>{
                                            generatePassword()
                                            updateContext.setOrder((prev) => ({
                                                ...prev, 
                                                ['pkgtitle']: "Two Phase Funding",
                                                ['pkgprice']: 130,
                                                ['acctbal']: 25000,
                                                ['userpass']: randomPass,
                                            }))
                                        }
                                    }
                                >Purchase</button>
                            </> 
                        ) : " "}
                        
                        {updateContext.cardPrice == 50000 ? (
                            <>
                                <div className="flex flex-row mb-10 gap-4">
                                    {icons.usd.icon} 
                                    <input defaultValue={280} onChange={handleChange} name="pkgprice" className={klassInName} readOnly  />
                                </div>
                                <div className="mb-5 flex flex-col gap-2">
                                    <label className="mt-4 mb-2 text-white">Enter your email to receive login details</label>
                                    <input onChange={handleChange} name="useremail" className="p-3 w-70 bg-transparent border rounded-md shadow-xl text-slate-100 placholder:text-white " type="email" placeholder="Enter email" />
                                </div>
                                <button 
                                    className={klassBtnName} 
                                    onClick={(e)=>{
                                            generatePassword()
                                            updateContext.setOrder((prev) => ({
                                                ...prev, 
                                                ['pkgtitle']: "Two Phase Funding",
                                                ['pkgprice']: 280,
                                                ['acctbal']: 50000,
                                                ['userpass']: randomPass,
                                            }))
                                        }
                                    }
                                >Purchase</button>
                            </> 
                        ) : " "}
                        
                        {updateContext.cardPrice == 100000 ? (
                            <>
                                <div className="flex flex-row mb-10 gap-4">
                                    {icons.usd.icon} 
                                    <input defaultValue={480} onChange={handleChange} name="pkgprice" className={klassInName} readOnly  />
                                </div>
                                <div className="mb-5 flex flex-col gap-2">
                                    <label className="mt-4 mb-2 text-white">Enter your email to receive login details</label>
                                    <input onChange={handleChange} name="useremail" className="p-3 w-70 bg-transparent border rounded-md shadow-xl text-slate-100 placholder:text-white " type="email" placeholder="Enter email" />
                                </div>
                                <button 
                                    className={klassBtnName} 
                                    onClick={(e)=>{
                                            generatePassword()
                                            updateContext.setOrder((prev) => ({
                                                ...prev, 
                                                ['pkgtitle']: "Two Phase Funding",
                                                ['pkgprice']: 480,
                                                ['acctbal']: 100000,
                                                ['userpass']: randomPass,
                                            }))
                                        }
                                    }
                                >Purchase</button>
                            </> 
                        ) : " "}
                        
                        {updateContext.cardPrice == 200000 ? (
                            <>
                                <div className="flex flex-row mb-10 gap-4">
                                    {icons.usd.icon} 
                                    <input value={960}  onChange={handleChange} name="pkgprice" className={klassInName} readOnly  />
                                    <input value="One Phase Funding" onChange={handleChange} type="hidden" name="pkgtitle" className={klassInName} />
                                    <input onChange={handleChange} type="hidden" name="acctbal" className={klassInName} readOnly value="200,000"/>
                                </div>
                                <div className="mb-5 flex flex-col gap-2">
                                    <label className="mt-4 mb-2 text-white">Enter your email to receive login details</label>
                                    <input onChange={handleChange} name="useremail" className="p-3 w-70 bg-transparent border rounded-md shadow-xl text-slate-100 placholder:text-white " type="email" placeholder="Enter email" />
                                </div>
                                <button 
                                    className={klassBtnName} 
                                    onClick={(e)=>{
                                            generatePassword()
                                            updateContext.setOrder((prev) => ({
                                                ...prev, 
                                                ['pkgtitle']: "Two Phase Funding",
                                                ['pkgprice']: 960,
                                                ['acctbal']: 200000,
                                                ['userpass']: randomPass,
                                            }))
                                        }
                                    }
                                >Purchase</button>
                            </>  
                        ) : " "}
                    </form>


                    {/* {updateContext.cardPrice == 20000 ? (
                        <>
                            <input className={klassInName} name='pkgprice' readOnly value={189} onChange={handleChange} />
                            <input type="hidden" name='acctbal' value="20,000" onChange={handleChange} />
                            <input type="hidden" name='pkgtitle' value="One Phase Funding " onChange={handleChange} />
                            <Link to='/signin'>
                                <button className={klassBtnName}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "}
                    {updateContext.cardPrice == 35000 ? (
                        <>
                            <input className={klassInName} name='pkgPrice' readOnly value={189} onChange={handleChange} />
                            <Link to='/signin'>
                            <button className={klassBtnName} name='pkgPrice' readOnly defaultValue={89} onChange={handleChange}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "}
                    {updateContext.cardPrice == 40000 ? (
                        <>
                            <input className={klassInName} name='pkgPrice' readOnly value={299} onChange={handleChange} />
                            <Link to='/signin'>
                            <button className={klassBtnName} name='pkgPrice' readOnly defaultValue={89} onChange={handleChange}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "}
                    {updateContext.cardPrice == 70000 ? (
                        <>
                            <input className={klassInName} name='pkgPrice' readOnly value={299} onChange={handleChange} />
                            <Link to='/signin'>
                            <button className={klassBtnName} name='pkgPrice' readOnly defaultValue={89} onChange={handleChange}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "}
                    {updateContext.cardPrice == 80000 ? (
                        <>
                            <input className={klassInName} name='pkgPrice' readOnly value={299} onChange={handleChange} />
                            <Link to='/signin'>
                            <button className={klassBtnName} name='pkgPrice' readOnly defaultValue={299} onChange={handleChange}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "}
                    {updateContext.cardPrice == 160000 ? (
                        <>
                            <input className={klassInName} name='pkgPrice' readOnly value={499} onChange={handleChange} />
                            <Link to='/signin'>
                            <button className={klassBtnName} name='pkgPrice' readOnly defaultValue={499} onChange={handleChange}> Purchase </button>
                            </Link>
                        </> 
                    ) : " "} */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableTwo