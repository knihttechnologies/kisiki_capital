import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles.css';
import TableOne from '../Tables/TableOne'
import TableTwo from '../Tables/TableTwo'
import { useTableContext } from '../../context/TableContext';
import Loader from '../../common/Loader';
import axios from 'axios';
import emailjs from '@emailjs/browser'
//import { sign } from 'crypto';
import { useAuthContext } from '../../context/AuthContext';
import SignIn from '../../pages/Authentication/SignIn';

const HomeStepTable = ({}) => {
    const navigate = useNavigate()
    const table = useTableContext();
    const auth = useAuthContext()
    //console.log(table)

    //This for initializing the email js module
    //useEffect(() => emailjs.init("Napm9yHzNIRu8WVGX"), []);

    return (
            <div className="dark:border-strokedark dark:bg-boxdark">
                {/* <ProgressBar /> */}
                
                <div className=" dark:border-strokedark dark:bg-boxdark flex flex-col flex-wrap items-center justify-center">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row dark:border-strokedark dark:bg-boxdark"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                            <a
                            className={
                                "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (table.openTableTab === 1
                                    ? `text-white bg-primary`
                                    : `text-slate-300 bg-slate-400`)
                            }
                            onClick={e => {
                                e.preventDefault();
                                table.setOpenTableTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                            >
                            One Phase Funding
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center dark:text-slate-200">
                            <a
                            className={
                                "dark:text-gray-300 text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (table.openTableTab === 2
                                    ? `text-white bg-primary`
                                    : `text-slate-300 bg-slate-400`)
                            }
                            onClick={e => {
                                e.preventDefault();
                                table.setOpenTableTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                            >
                                Two Phase Funding
                            </a>
                        </li>
                    </ul>
                    <div className="mb-6 shadow-lg rounded dark:border-strokedark dark:bg-boxdark">
                        {table.tableErrMsg && <p className="bg-red-400 h-10 w-40">{table.tableErrMsg}</p>}
                        <div className="flex flex-row flex-wrap items-center dark:border-strokedark dark:bg-boxdark">
                            {table.tableLoading ? <Loader /> :
                                <div className=" dark:border-strokedark dark:bg-boxdark">
                                    <div className={`${table.openTableTab === 1 ? "block" : "hidden"}`} id="link1">
                                        
                                        <TableOne /> 
                                    </div>
                                    <div className={`${table.openTableTab === 2 ? "block" : "hidden"}`} id="link2">
                                    
                                        <TableTwo />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
                
            </div>
    );
};

export default HomeStepTable;