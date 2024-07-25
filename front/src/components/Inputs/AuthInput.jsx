import React from 'react'
export const AuthInput = ({placeholder, type, name, value, onChange, onClick }) => {
    return (
      <div className="relative h-10 mt-2 mb-2 ">
          <input name={name} value={value} onChange={onChange} onClick={onClick} type={type} placeholder={placeholder} 
          className="items-center peer h-full lg:w-80 rounded-md border border-warning bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
      </div>
    )
}
export const AuthSelect = ({label, onChange, name}) => {
    const titles = {
        one: "Mr.",
        two: "Mrs.",
        three: "Ms."
    }
    return (
       <div className="flex flex-col gap-6">
            <select 
                defaultValue="Uganda"
                onChange={onChange} 
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                name={name}
            > 
                <option value="bg-slate-300">Select</option>
                <option className="bg-slate-300" value={titles.one}> 
                    {titles.one} 
                </option>
                <option className="bg-slate-300" value={titles.two}> 
                    {titles.two} 
                </option>
                <option className="bg-slate-300" value={titles.three}> 
                    {titles.three} 
                </option>
            </select>
       </div> 
    )
}