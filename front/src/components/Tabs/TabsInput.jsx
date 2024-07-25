import React, {useContext} from 'react'
//import {Select, Option} from "@material-tailwind/react"
import { countries } from "countries-list";
import { useNavigate } from 'react-router-dom';
import FormContext from '../../context/FormContext';

export const TabsSelect = ({label, onChange, name, value}) => {
    //console.log(countries)
    return (
       <div className="flex flex-col gap-6">
            <select
                defaultValue={value}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                onChange={onChange}
                name={name}    
            > 
                {/* <option value="" key="">Select</option> */}
                {
                    Object.keys(countries).map((index, key) => ( 
                    <>
                    <option className="bg-slate-200 text-black dark:text-white dark-bg-slate-800" key={key} value={countries[index].name}> 
                        {countries[index].name} 
                    </option></>))
                } 
            </select>
            {/* <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {label}
            </label> */}
       </div> 
    )
}
// export const TabsCheckbox = () => {
//     return (

//     )
// }

export const TabsInput = ({placeholder, type, name, value, onChange, maxLength }) => {
  return (
    <div className="relative h-12 items-center w-72 min-w-[200px]">
        <div className="relative">
            <input 
                name={name} 
                value={value} 
                onChange={onChange} 
                type={type}
                maxLength={maxLength} 
                placeholder={placeholder} 
                className="items-center peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-xs font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
            />
            {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {placeholder}
            </label> */}
            {/* <span className="absolute right-4 top-2">
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
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                    />
                </g>
                </svg>
            </span> */}
        </div>
    </div>
  )
}

export const CheckBox = ({label, name, value, onChange, type, defaultChecked}) => {
    return (
        
        <div className="ml-5 relative h-15 items-center">
            <div className="flex flex-row mt-2 gap-2" >
                <input name={name} defaultChecked={defaultChecked} onChange={onChange} type={type} className="w-6 h-6" />
                <label className="ml-2">
                    {label}
                </label>
            </div>
        </div>
    )
}

export const FooterButton = ({value, valueTwo, label, labelTwo, handleChange}) => {
    const navigate = useNavigate()
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    const handleClick = () =>{
        console.log(updateContext.userFormData)
        //navigate("/billing")
    }
    return (
        <>
            <div className="flex-col">
                <CheckBox
                    label={label}
                    type="checkbox"
                    name="checked"
                    value={value}
                    onChange={handleChange}
                />
                <CheckBox
                    label={labelTwo}
                    type="checkbox"
                    name="checkedTwo"
                    value={valueTwo}
                    onChange={handleChange}
                />
            </div>
            <div className="ps-30 float-right h-15 items-center min-w-[200px]">
                <button className="p-6 bg-primary text-white dark:bg-primary rounded-2xl ">
                    Continue to Check Out
                </button>
            </div>
        </>
    )
}