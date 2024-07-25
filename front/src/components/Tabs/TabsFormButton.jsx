import React, {useContext} from 'react';
import FormContext from '../../context/FormContext';
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";

// This function is defined to serve a button component used in the tabs component
export const TabsBtn = ({icon, index, onMouseEnter, onMouseLeave, onChange, onClick, name, value, type}) => {
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    // const clasName = "px-6 inline-flex border-2 rounded-lg h-15 w-70 items-center dark:md:hover:bg-slate-700 dark:md:hover:text-slate-200 cursor-grabbing"
    // const clickedClassName = ` px-6 rounded border-2 inline-flex rounded-lg h-15 w-60 items-center bg-primary text-white dark:md:hover:bg-primary dark:md:hover:text-white`
    
    return (
        <> 
            {/* The button used in the tabs form */}
            <div key={index} className="relative"> 
                <input 
                    readOnly
                    onMouseEnter={onMouseEnter} 
                    onMouseLeave={onMouseLeave} 
                    type={type} 
                    value={value}
                    name={name} 
                    className={name == "platform" || name == "type" ? (`h-12 w-60 py-3 px-6 ps-15 block border-2 border-gray-400 bg-${updateContext.clickedColor === index ? 'cyan' : 'white'}-400 shadow-sm rounded-lg text-md focus:z-10 text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:md:hover:bg-${updateContext.clickedColor === index ? 'cyan' : 'slate'}-300 dark:md:hover:text-slate-500 cursor-grabbing dark:bg-transparent dark:border-neutral-600 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`) :
                    (`h-12 w-60 text-xs py-3 px-6 ps-25 block border-2 border-gray-400 shadow-sm rounded-lg text-md focus:z-10 bg-${updateContext.clickedColor === index ? 'cyan' : 'white'}-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:md:hover:bg-${updateContext.clickedColor === index ? 'cyan' : 'slate'}-300 dark:md:hover:text-slate-200 cursor-grabbing dark:bg-transparent dark:border-neutral-600 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`)
                    }
                    onClick={onClick}
                    onChange={onChange}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-10 w-20">
                    {icon}
                </div>
            </div>
        </>
    )
}

export const PlatformBtn = () => {
    let btnword = [
        {  word: "Regular" },
        {  word: "Swap-free" },
    ]
    const clasName = "border-2 items-center rounded-lg h-15 w-60 items-center dark:md:hover:bg-slate-700 dark:md:hover:text-slate-200"
    const handleClick = () => {
        console.log("how are you")
    }
    return (
        <>
            {btnword.map(({word}) => {
                return(
                    <button key={word} className={clasName} onClick={handleClick}>
                        {word}
                    </button>
                )
            })}
        </>
    )
}

export const AccBtn = () => {
    let btnword = [
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "10,000"},
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "25,000"},
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "50,000"},
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "100,000"},
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "200,000"},
    ]
    const clasName = "flex border-2 rounded-lg h-15 w-40 items-center dark:md:hover:bg-slate-700 dark:md:hover:text-slate-200"
    const handleClick = () => {
        console.log("how are you")
    }
    return (
        <>
            {btnword.map(({word, icon}) => {
                return(
                    <button key={word} className={clasName} onClick={handleClick}>
                        {icon}
                        {word}
                    </button>
                )
            })}
        </>
    )
}

const TabsFormButton = ({}) => {
    let btnword = [
        {icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "USD"},
        {icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: "GBP"},
        {icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: "EUR"}
    ]
    const clasName = "flex border-2 rounded-lg h-15 w-30 items-center dark:md:hover:bg-slate-700 dark:md:hover:text-slate-200"
    const handleClick = () => {
        console.log("how are you")
    }
    return (
        <>
            {btnword.map(({word, icon}) => {
                return(
                    <button key={word} className={clasName} onClick={handleClick}>
                        {icon}
                        {word}
                    </button>
                )
            })}
        </>
  )
}

export default TabsFormButton