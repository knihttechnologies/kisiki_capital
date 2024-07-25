import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import PesaPalPay from "../../api/PesaPalPay";

export default function PayModal({title, btnname }) {
    //const {rules, msg, errMsg, loading} = rulesFetch()
    const auth = useAuthContext();
    //console.log(rulesData)
  return (
    <>
        <div 
            className="justify-center items-center overflow-x-hidden overflow-y-auto bg-transparent backdrop-blur-sm  rounded-2xl fixed inset-0 z-50 outline-none focus:outline-none dark:border-strokedark"
        >
            <div className="relative w-full my-6 mx-auto max-w-2xl dark:border-strokedark dark:bg-boxdark">
            {/*content*/}
            <div className="border-0 mt-70 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:border-strokedark dark:bg-boxdark">
                <h3 className="text-3xl font-semibold">
                    {title}
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                        auth.setShowPayModal(false)
                        auth.setPesapalBtn(true)
                    }}
                >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="flex flex-row flex-wrap relative w-full p-5 flex-auto justify-center">
                    <PesaPalPay />
                <button
                    className="mt-2 w-50 text-red-500 bg- shadow-xl  font-bold uppercase p-3 rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        auth.setShowPayModal(false)
                        auth.setPesapalBtn(true)

                    }}
                >
                    Close
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}