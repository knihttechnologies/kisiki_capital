import React, {useState} from 'react'
import { Navigate} from 'react-router-dom';
import { useTableContext } from '../context/TableContext';
import { useAuthContext } from '../context/AuthContext';
import CheckOut from './CheckOut';
import { jwtDecode } from 'jwt-decode';

const Success = () => {
    const updateContext = useTableContext();
    const auth = useAuthContext()
    const localUser = localStorage.getItem('person')
    if(!localUser || localUser === "") return <Navigate to={'/'} />
    const userdecoded = jwtDecode(localUser)
    const user = userdecoded?.objectToSend
    //console.log(user)
  return (
    <div className="flex flex-col flex-wrap justify-center p-10 m-10">
        <div className="flex flex-col justify-center flex-wrap">
            {updateContext?.tableEmailMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableEmailMsg}</p> }
            {updateContext?.tableErrMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableErrMsg}</p> }
            {updateContext?.tableMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableMsg}</p> }
            <h4 className="p-5 bg-slate-600 text-warning font-bold shadow-xl mt-2 mb-5 w-90 flex flex-wrap rounded-md">You have successfully subscribed for the <span className="text-white mr-2">{user?.order?.package_title}</span> package.</h4>
            {/* <p className="p-4 bg-slate-500 text-white shadow-xl mt-2 mb-5 rounded-md text-sm w-50">{updateContext.order.pkgtitle}</p> */}
            <p className="text-center p-3 shadow-xl mt-2 mb-5 rounded-md text-sm w-50">Price: <span className="text-warning ml-2 ">{user?.order?.package_price}</span></p>
            <p className="text-center p-3 shadow-xl mt-2 mb-5 rounded-md text-sm w-50">Account balance: <span className="text-warning ml-2" >{user?.order?.account_balance}</span></p>
            <p className="p-3 shadow-xl mt-2 mb-5 rounded-md text-md text-warning bg-slate-600 text-shadow-xl text-center">You are almost done, just tap the button below to continue and complete the order</p>
        </div>
        {auth.openSignIn &&
            <CheckOut />
        }
        <button className="p-3 mt-5 w-50 bg-warning text-white shadow-xl rounded-md mb-10" onClick={()=> auth.setOpenSignIn(!auth.openSignIn)}>
            {auth.openSignIn ? "Close": "Continue registration" }
        </button>
    </div>
  )
}

export default Success