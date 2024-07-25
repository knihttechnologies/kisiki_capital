import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

const NowPayment = () => {
    const links = [
        {index: 1, link: "https://nowpayments.io/payment/?iid=6304888115", price: 120, currency: "USD"}
    ]
  return (
    <div>
        {links.map((value) => {
            <Link className="shadow-xl mt-4 mb-4 p-3 text-black/100 bg-white border border-none" key={value?.index} to={value?.link}>{value?.currency}{value?.price}</Link>
        })}
    </div>
  )
}

export default NowPayment