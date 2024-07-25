import React from 'react'

const Rule = ({index, icon, title, description, desctitle, desc1, desc2, desc3, desc4, desc5, desc6, end}) => {
  return (
    <div key={index}className="flex flex-row flex-wrap">
        {React.createElement(icon, {
            className: "w-5 h-5 text-black mt-5",
        })}
        <h1 className="font-bold font-16 mt-5">
            {title}
        </h1>
        <p>{description}</p>
        <p className="font-bold font-14 mt-2">{desctitle}</p>
        <span className="mt-2">{desc1}</span>
        <span className="mt-2">{desc2}</span>
        <span className="mt-2">{desc3}</span>
        <span className="mt-2">{desc4}</span>
        <span className="mt-2">{desc5}</span>
        <span className="mt-2">{desc6}</span>
        <span className="font-bold font-14 mt-6">{end}</span>
    </div>
  )
}

export default Rule