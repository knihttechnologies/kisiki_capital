import React from "react";
import SignUp from "../../pages/Authentication/SignUp";
import { useAuthContext } from "../../context/AuthContext";
import { rulesFetch } from "../../hooks/useFetch"
import { 
  mergingaccts, 
  maxtradingcapital, 
  waystofailachallenge, 
  easandbots, newstrading, 
  timelimits, copytrading, 
  overnighttrades, consistency, 
  profitshare, weekendTrades, prohibitedTradingStrategies, 
  propFirm, profitsTargets, dailyLossRule,
  maxLossRule,
  flexChallenge} from "../../data/rules-data";
import Rule from "./Rule";
export function RulesModal({title, btnname }) {
    //const {rules, msg, errMsg, loading} = rulesFetch()
    const auth = useAuthContext();
  return (
    <>
      {auth.showRulesModal ? (
        <>
          <div 
            className="justify-center items-center overflow-x-hidden bg-transparent backdrop-blur-sm rounded-2xl fixed inset-0 z-50 outline-none focus:outline-none dark:border-strokedark"
            onClick={() => {auth.setShowRulesModal(0)}}
          >
            <div className="relative flex flex-col flex-grow my-6 mx-6 max-w-6xl min-h-screen dark:border-strokedark dark:bg-boxdark">
              {/*content*/}
              <div 
                className="border-0 mt-10 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark"
                onClick={() => {auth.setShowRulesModal(0)}}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:border-strokedark dark:bg-boxdark" onClick={() => {auth.setShowRulesModal(0)}}>
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {auth.setShowRulesModal(0)}}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative w-full p-10 flex-auto flex-wrap">
                    {auth.showRulesModal === 1 && mergingaccts.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 2 && maxtradingcapital.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 3 && waystofailachallenge.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 4 && easandbots.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 5 && newstrading.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 6 && timelimits.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 7 && copytrading.map(({ title, icon, description, end }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key} end={end}/>
                        </>
                    ))}
                    {auth.showRulesModal === 8 && overnighttrades.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 9 && consistency.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 10 && profitshare.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 11 && weekendTrades.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showRulesModal === 12 && prohibitedTradingStrategies.map(({ title, icon, description }, key) => (
                        <>
                            <Rule icon={icon} description={description} title={title} index={key}/>
                        </>
                    ))}
                  <button
                    className="mt-2 text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => auth.setShowRulesModal(0)}
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
export function GetStartedModal({title, btnname }) {
    //const {rules, msg, errMsg, loading} = rulesFetch()
    const auth = useAuthContext();
  return (
    <>
      {auth.showGetStartedModal ? (
        <>
          <div 
            className="justify-center items-center overflow-x-hidden bg-transparent backdrop-blur-sm rounded-2xl fixed inset-0 z-50 outline-none focus:outline-none dark:border-strokedark"
            onClick={() => {auth.setShowGetStartedModal(0)}}
          >
            <div className="relative flex flex-col flex-grow my-6 mx-6 max-w-6xl min-h-screen dark:border-strokedark dark:bg-boxdark">
              {/*content*/}
              <div 
                className="border-0 mt-10 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark"
                onClick={() => {auth.setShowGetStartedModal(0)}}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:border-strokedark dark:bg-boxdark" onClick={() => {auth.setShowRulesModal(0)}}>
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {auth.setShowGetStartedModal(0)}}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative w-full p-10 flex-auto flex-wrap">
                    {auth.showGetStartedModal === 1 && propFirm.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                  <button
                    className="mt-2 text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => auth.setShowGetStartedModal(0)}
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
export function OnePhaseModal({title, btnname }) {
    //const {rules, msg, errMsg, loading} = rulesFetch()
    const auth = useAuthContext();
  return (
    <>
      {auth.showOnePhaseModal ? (
        <>
          <div 
            className="justify-center items-center overflow-x-hidden bg-transparent backdrop-blur-sm rounded-2xl fixed inset-0 z-50 outline-none focus:outline-none dark:border-strokedark"
            onClick={() => {auth.setShowOnePhaseModal(0)}}
          >
            <div className="relative flex flex-col flex-grow my-6 mx-6 max-w-6xl min-h-screen dark:border-strokedark dark:bg-boxdark">
              {/*content*/}
              <div 
                className="border-0 mt-10 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark"
                onClick={() => {auth.setShowOnePhaseModal(0)}}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:border-strokedark dark:bg-boxdark" onClick={() => {setShowOnePhaseModal(0)}}>
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {auth.setShowOnePhaseModal(0)}}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative w-full p-10 flex-auto flex-wrap">
                    {auth.showOnePhaseModal === 1 && profitsTargets.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showOnePhaseModal === 2 && dailyLossRule.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showOnePhaseModal === 3 && maxLossRule.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                    {auth.showOnePhaseModal === 4 && flexChallenge.map(({ title, icon, description, desctitle, desc1, desc2, desc3, desc4,desc5,desc6, end}, key) => (
                        <>
                            <Rule icon={icon} description={description} desctitle={desctitle} desc1={ desc1} desc2={desc2} desc3={desc3} desc4={desc4} desc5={desc5} desc6={desc6} end={end} title={title} index={key}/>
                        </>
                    ))}
                  <button
                    className="mt-2 text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => auth.setShowOnePhaseModal(0)}
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