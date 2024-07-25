import React,{useContext} from 'react'
import FormContext from '../../context/FormContext';
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";

const TabsCard = ({title, desc, handleChange, handleSubmit }) => {
  const myContext = useContext(FormContext);
  const updateContext = myContext.userDetails;
  const klassName = "w-20 bg-transparent border-hidden focus:outline-none focus:border-none dark:border-hidden dark:text-white dark:bg-transparent"
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   updateContext.setUserFormData(prevState => ({
  //       ...prevState,
  //       [name]: value,
  //   }));
  // };
  let icons = {
    usd: {
      currency: "USD",
      icon: <CurrencyDollarIcon className="mt-1 ml-3" />,
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
  const handleScroll = (event) => {
    console.log('User scrolled:', event.target.scrollTop)
    const { name, value } = event.target;
    updateContext.setUserFormData(prevState => ({
        ...prevState,
        [name]: value,
    }));
  };
  return (
    <div onFocus={handleScroll} className="col-span-12 l-10 xl:col-span-4 sticky top-30 border-2 h-80 w-60 rounded-lg m-4 p-10">
        <div className="bg-slate-400 p-5 rounded-md animate-pulse">
            <h3 className="dark:text-white text-yellow-200">{title}</h3>  
            <div className="mt-10 mb-10 flex flex-row inline gap-4 text-white">
                <div className="h-20 w-20" >
                  {icons.usd.icon}
                </div>
                
                {updateContext.cardPrice == 10000 ? <input className={klassName} name='pkgPrice' readOnly defaultValue={120} onChange={handleChange} />  : " "}
                {updateContext.cardPrice == 20000 ? <input className={klassName} name='pkgPrice' readOnly value={240} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 25000 ? <input className={klassName} name='pkgPrice' readOnly value={260} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 35000 ? <input className={klassName} name='pkgPrice' readOnly value={280} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 40000 ? <input className={klassName} name='pkgPrice' readOnly value={300} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 50000 ? <input className={klassName} name='pkgPrice' readOnly value={320} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 70000 ? <input className={klassName} name='pkgPrice' readOnly value={340} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 80000 ? <input className={klassName} name='pkgPrice' readOnly value={360} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 100000 ? <input className={klassName} name='pkgPrice' readOnly value={600} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 160000 ? <input className={klassName} name='pkgPrice' readOnly value={650} onChange={handleChange} /> : " "}
                {updateContext.cardPrice == 200000 ? <input className={klassName} name='pkgPrice' readOnly value={1200} onChange={handleChange} /> : " "}
            </div>
            <div className='mt-10 text-yellow-200'>
              {desc}
            </div>
        </div>
    </div>
  )
}

export default TabsCard