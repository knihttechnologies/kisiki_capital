import React, { useContext } from 'react';
import FormContext from '../../context/FormContext';
import './styles.css';
import TabsCard from "./TabsCard";
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { AccBtn, PlatformBtn, TabsBtn } from "./TabsFormButton";
import { TabsInput } from './TabsInput';

const FormOne = ({color, onSubmit, handleChange}) => {
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    let btnword = {
        tradingCurrency: [
            {indexNum: 1, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: "USD"},
            // {indexNum: 2, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: "EURO"},
            // {indexNum: 3, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: "GBP"}
        ],
        acctBal: {
            acct1: {
                title: "USD",
                tc: [
                    {indexNum: 1, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000, price: 120},
                    {indexNum: 2, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 25000, price: 240},
                    {indexNum: 3, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 50000, price: 320},
                    {indexNum: 4, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 100000, price: 600},
                    {indexNum: 5, icon: <CurrencyDollarIcon className="h-10 w-10 mt-1 ml-3" />, word: 200000, price: 1200},
                ]
            },
            acct2: {
                title: "EUR",
                tc: [
                    {indexNum: 1, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000, price: 120},
                    {indexNum: 2, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 20000, price: 240},
                    {indexNum: 3, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 40000, price: 320},
                    {indexNum: 4, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 80000, price: 600},
                    {indexNum: 5, icon: <CurrencyEuroIcon className="h-10 w-10 mt-1 ml-3" />, word: 160000, price: 1200},
                ]
            },
            acct3: {
                title: "GBP",
                tc: [
                    {indexNum: 1, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 10000, price: 120},
                    {indexNum: 2, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 20000, price: 240},
                    {indexNum: 3, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 35000, price: 320},
                    {indexNum: 4, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 70000, price: 600},
                    {indexNum: 5, icon: <CurrencyPoundIcon className="h-10 w-10 mt-1 ml-3" />, word: 140000, price: 1200},
                ]
            }
        },
        platform: [
            { indexNum: 1, word: "Match-Trader" },
        ],
        type: [
            {  indexNum: "1", word: "Regular" },
            {  indexNum: "2", word: "Swap-free" },
        ]
        
    }
    let cardwords = {
        title: "One Phase Funding",
        desc: "Package price",
    }
    const mapingTitle = btnword.acctBal.acct1.title
    const mapingTitleB = btnword.acctBal.acct2.title
    const mapingTitleC = btnword.acctBal.acct3.title
    const mapingWord = btnword.acctBal.acct1
    const mapingWordB = btnword.acctBal.acct2
    const mapingWordC = btnword.acctBal.acct3

    return (
        <>
            <div className="col-span-12 xl:col-span-8 m-4 p-10">
                <h2 className="dark:text-white mb-10 text-4xl shadow-xl p-4 rounded-md text-center">{cardwords.title}</h2>
                <p className="dark:text-warning text-warning p-4 mt-3 mb-6 text-center">Get your Funded account just after passing one phase.</p>
                
                <div className="">
                    <h3 className="dark:text-white shadow-lg p-2 w-60 rounded-md">Trading Currency</h3>
                    
                    <div className="flex  flex-wrap mt-10 mb-10 flex-row gap-4">
                        {btnword.tradingCurrency.map(({indexNum, icon, word}) => 
                            <TabsBtn 
                                onClick={e => {
                                    e.preventDefault();
                                    const { name, value } = e.target;
                                    updateContext.setUserFormData(prevState => ({
                                        ...prevState,
                                        ["pkgtitle"]: cardwords.title,
                                        [name]: value,
                                    }));
                                    updateContext.setClickedColor('cyan')
                                    updateContext.setOpenAcctTab(indexNum);
                                }} 
                                index={indexNum}
                                name="tradingCurrency" 
                                type={"text"} 
                                onChange={handleChange} 
                                icon={icon}
                                value={word}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="dark:text-white shadow-lg p-2 w-60 rounded-md">Account Balance</h3>
                    <div className={updateContext.openAcctTab === 1 ? "block" : "hidden"} id="acctBallink1">
                        <div className="mt-10 mb-10 flex flex-row flex-wrap gap-4">
                            {mapingTitle && mapingWord.tc.map(({indexNum, icon, word, price}) => 
                                <TabsBtn 
                                    icon={icon}  
                                    onClick={e => {
                                        e.preventDefault();
                                        const { name, value } = e.target;
                                        updateContext.setUserFormData(prevState => ({
                                            ...prevState,
                                            ["pkgprice"]: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor(indexNum)
                                        updateContext.setCardPrice(word);
                                    }} 
                                    index={indexNum}
                                    name="acctbal" 
                                    type={"text"} 
                                    onChange={handleChange}
                                    value={word}
                                />
                            )}
                        </div>
                    </div>
                    <div className={updateContext.openAcctTab === 2 ? "block" : "hidden"} id="acctBallink2">
                        <div className="mt-10 mb-10 flex flex-row flex-wrap gap-4">
                            {mapingTitleB && mapingWordB.tc.map(({indexNum, icon, word, price}) => 
                                <TabsBtn 
                                    icon={icon} 
                                    onClick={e => {
                                        e.preventDefault();
                                        const { name, value } = e.target;
                                        updateContext.setUserFormData(prevState => ({
                                            ...prevState,
                                            ["pkgprice"]: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor(indexNum)
                                        updateContext.setCardPrice(word);
                                    }}
                                    index={indexNum} 
                                    name="acctbal" 
                                    type={"text"} 
                                    onChange={handleChange} 
                                    value={word}
                                />
                            )}
                        </div>
                    </div>
                    <div className={updateContext.openAcctTab === 3 ? "block" : "hidden"} id="acctBallink3">
                        <div className="mt-10 mb-10 flex flex-row flex-wrap gap-4">
                            {mapingTitleC && mapingWordC.tc.map(({indexNum, icon, word, price}) => 
                                <TabsBtn 
                                    icon={icon} 
                                    onClick={e => {
                                        e.preventDefault();
                                        const { name, value } = e.target;
                                        updateContext.setUserFormData(prevState => ({
                                            ...prevState,
                                            ["pkgprice"]: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor(indexNum)
                                        updateContext.setCardPrice(word);
                                    }}
                                    index={indexNum}
                                    name="acctbal" 
                                    type={"text"} 
                                    onChange={handleChange}
                                    value={word}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="dark:text-white shadow-lg p-2 w-60 rounded-md mb-5">Platform</h3>
                    <div className="mt-2 mb-5 flex flex-row gap-4">
                        {btnword.platform.map(({indexNum, word}) => 
                            <TabsBtn 
                                onClick={e => {
                                    e.preventDefault();
                                    const { name, value } = e.target;
                                    updateContext.setUserFormData(prevState => ({
                                        ...prevState,
                                        [name]: value,
                                    }));
                                    updateContext.setClickedColor(indexNum)
                                }}  
                                index={indexNum}
                                name="platform"  
                                type={"text"} 
                                onChange={handleChange}
                                value={word}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="dark:text-white w-60 rounded-md shadow-lg p-2 mb-5">Type</h3>
                    <div className="mt-2 mb-5 flex flex-row gap-4">
                        {btnword.type.map(({indexNum, icon, word}) => 
                            <TabsBtn 
                                icon={icon} 
                                onClick={e => {
                                    e.preventDefault();
                                    const { name, value } = e.target;
                                    updateContext.setUserFormData(prevState => ({
                                        ...prevState,
                                        ["pkgtitle"]: cardwords.title,
                                        [name]: value,
                                    }));
                                    updateContext.setClickedColor(indexNum)
                                }}  
                                index={indexNum}
                                name="type" 
                                type={"text"} 
                                onChange={handleChange} 
                                value={word}
                            />
                        )}
                    
                    </div>
                </div>
                <div>
                    <h3 className="dark:text-white w-80 rounded-md">Discount</h3>
                    <div className="mt-2 mb-5">
                        <TabsInput
                            type="number"
                            placeholder="Discount"
                            name="discount"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <TabsCard 
                title={cardwords.title} 
                desc={cardwords.desc}
                handleChange={handleChange}
            />
        </>
    );
};

export default FormOne;