import React from "react";
import SignUp from "../../pages/Authentication/SignUp";
import { useAuthContext } from "../../context/AuthContext";

export default function SignUpBtnModal({title, btnname }) {
  const auth = useAuthContext();
  return (
    <>
      {/* <button
        className="text-primary text-center mt-2 border-2 rounded-3xl active:bg-slate-600 font-bold uppercase text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {setShowModal(true)}}
      >
        {btnname}
      </button> */}
      {auth.showModal ? (
        <>
          <div 
            onClick={() => {auth.setShowModal(true)}} className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-transparent backdrop-blur-sm rounded-2xl fixed inset-0 z-50 outline-none focus:outline-none dark:border-strokedark"
          >
            <div className="relative w-full my-6 mx-auto max-w-2xl dark:border-strokedark dark:bg-boxdark">
              {/*content*/}
              <div onClick={() => {auth.setShowModal(true)}} className="border-0 mt-40 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:border-strokedark dark:bg-boxdark">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {auth.setShowModal(false)}}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative w-full p-10 flex-auto">
                  <SignUp />
                  <button
                    className="mt-2 text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => auth.setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : " "}
    </>
  );
}