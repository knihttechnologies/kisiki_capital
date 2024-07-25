import React from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuthContext } from '../../context/AuthContext';

const AuthTabs = () => {
    const auth = useAuthContext();
  return (
    <div className="pl-20 pr-20 pt-10 mb-10 dark:border-strokedark dark:bg-boxdark">
        {/* <ProgressBar /> */}
        <div className=" w-full dark:border-strokedark dark:bg-boxdark ">
            <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row dark:border-strokedark dark:bg-boxdark"
                role="tablist"
            >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                    <a
                    className={
                        "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (auth.openAuthTab === 1
                            ? `text-white bg-primary`
                            : `text-slate-300 bg-slate-400`)
                    }
                    onClick={e => {
                        e.preventDefault();
                        auth.setOpenAuthTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                    >
                    Sign In
                    </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                    <a
                    className={
                        "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (auth.openAuthTab === 2
                            ? `text-white bg-primary`
                            : `text-slate-300 bg-slate-400`)
                    }
                    onClick={e => {
                        e.preventDefault();
                        auth.setOpenAuthTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                    >
                        Sign Up
                    </a>
                </li>
            </ul>
            <div className="flex flex-col min-w-0 break-words mb-6 shadow-lg rounded dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-5 dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full dark:border-strokedark dark:bg-boxdark">
                        <div className={`${auth.openAuthTab === 1 ? "block" : "hidden"}`} id="link1">
                            <SignIn /> 
                        </div>
                        <div className={`${auth.openAuthTab === 2 ? "block" : "hidden"}`} id="link2">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthTabs