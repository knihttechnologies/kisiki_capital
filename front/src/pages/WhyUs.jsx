import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import logo from "../images/kisiki-capital-01.png"
import { DocumentIcon, ClockIcon , ChatBubbleBottomCenterIcon, ShieldCheckIcon, BanknotesIcon, BarsArrowUpIcon, CalendarIcon, WrenchScrewdriverIcon, InformationCircleIcon, ChartBarIcon} from '@heroicons/react/24/outline'

import {
  FaInstagram, FaTelegram
} from "react-icons/fa";

export const whyData = [
  {
    index: 1,
    icon: DocumentIcon,
    desc: "No max trading days"
  },
  {
    index: 2,
    icon: BarsArrowUpIcon,
    desc: "No min trading days"
  },
  {
    index: 3,
    icon: ClockIcon,
    desc: "Scale up to $5m"
  },
  {
    index: 4,
    icon: ChatBubbleBottomCenterIcon,
    desc: "5-star Trader Support"
  },
  {
    index: 5,
    icon: ShieldCheckIcon,
    desc: "Risk our capital not yours"
  },
  {
    index: 6,
    icon: BanknotesIcon,
    desc: "Pay once, try twice"
  },
  {
    index: 7,
    icon: WrenchScrewdriverIcon,
    desc: "Keep up to 100%"
  },
  {
    index: 8,
    icon: CalendarIcon,
    desc: "Hold over the weekend"
  },
  {
    index: 9,
    icon: InformationCircleIcon,
    desc: "Realistic Objectives"
  },
  {
    index: 10,
    icon: ChartBarIcon,
    desc: "Trade your strategy"
  },
]
const WhyUs = () => {
  //const {rules, msg, errMsg, loading} = rulesFetch()
  const titles = [
    {
      index: 1,
      title: "Merging Accounts",
    },
    {
      index: 2,
      title: "Maximum Trading Capital",
    },
    {
      index: 3,
      title: "Ways To Fail A Challenge",
    },
    {
      index: 4,
      title: "Bots & EA’s",
    },
    {
      index: 5,
      title: "News Trading",
    },
    {
      index: 6,
      title: "Time Limits",
    },
    {
      index: 7,
      title: "Copy Trading",
    },
    {
      index: 8,
      title: "Overnight Trades",
    },
    {
      index: 9,
      title: "Consistency Rule",
    },
    {
      index: 10,
      title: "Profit Share & Payouts",
    },
    {
      index: 11,
      title: "Can I Hold Trades Over The Weekend",
    },
    {
      index: 12,
      title: "Prohibited Trading Strategies",
    },
];
  const auth = useAuthContext()
  let circleClasses = "inline-block p-7 rounded-full w-20";
  let iconStyles = { color: "white", fontSize: "1.5em" };
  return (
    <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
      <div className='bg-slate-200 p-10 w-100 mt-10 text-lg'>
        <Link to="/">
          <p className='mt-5 mb-10 text-cyan-500 underline '>Back home</p>
        </Link>
        <div>
          <h1 className="text-center text-black dark:text-white mt-4 mb-4 font-bold">WHY US</h1>
          <h3 className="text-center text-black dark:text-white mt-4 mb-4 font-bold">Reasons why you should choose us.</h3>
          {/* {rulesData.map(({ title }, key) => ( */}
              <div className="">
                  {whyData.map(({ icon, desc, index}) => (
                    <>
                      <div 
                        className="flex flex-row flex-wrap p-2 w-full bg-warning font-10 text-white gap-4 mt-2 mb-2 rounded-lg flex-f" key={index}
                      >
                        {React.createElement(icon, {
                          className: "w-6 h-6 text-white dark:text-white",
                        })}
                        {desc}
                      </div>
                    </>
                  ))}
              </div>
          {/* ))} */}
        </div>
      </div>
      <div className="mt-10 p-20 justify-center">
        <div className="w-100 h-50">
          <img src={logo} alt="" className="" />
        </div>
        <h3 className="mb-5 font-bold">For more info, please get in-touch</h3>
        <div className="flex items-center gap-2">
          <Link to="https://t.me/kisiki_capital">
          <span style={{ background: "#3B5998" }} className={circleClasses}>
            <FaTelegram style={iconStyles} />
          </span>
          </Link>
          <Link to="https://instagram.com/kisiki_capital">
          <span style={{ background: "#c13584" }} className={circleClasses}>
            <FaInstagram style={iconStyles} />
          </span>
          </Link>
          <Link to="https://x.com/kisiki_capital">
            <span style={{ background: "#1da1f2" }} className={circleClasses}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WhyUs