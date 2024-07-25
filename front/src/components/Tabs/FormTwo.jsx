import React, {useContext} from 'react';
import FormContext from '../../context/FormContext';
import './styles.css'
import TabsCard from "./TabsCard";
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { AccBtn, PlatformBtn, TabsBtn } from "./TabsFormButton";
import { TabsInput } from './TabsInput';


const FormTwo = ({color, onSubmit, handleChange}) => {
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    const [clickedColor, setClickedColor] = React.useState(" ");
    const clasName = "px-6 inline-flex border-2 rounded-lg h-15 w-70 items-center dark:md:hover:bg-slate-700 dark:md:hover:text-slate-200 cursor-grabbing"
    const clickedClassName = ` px-6 rounded border-2 inline-flex rounded-lg h-15 w-60 items-center bg-${clickedColor} dark:md:hover:bg-${clickedColor}-700 dark:md:hover:text-slate-200`
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
        title: "Two Phase Funding",
        desc: "Package price",
    }
    const mapingTitle = btnword.acctBal.acct1.title
    const mapingTitleB = btnword.acctBal.acct2.title
    const mapingTitleC = btnword.acctBal.acct3.title
    const mapingWord = btnword.acctBal.acct1
    const mapingWordB = btnword.acctBal.acct2
    const mapingWordC = btnword.acctBal.acct3
    const inputTitleClass = "dark:text-white shadow-lg p-2 w-60 rounded-md"

    return (
        <>
            <div className="col-span-12 xl:col-span-8 m-4 p-10">
                <h2 className="dark:text-white mb-10 text-4xl shadow-xl p-4 rounded-md text-center">{cardwords.title}</h2>
                <p className="dark:text-warning text-warning p-4 mt-3 mb-6 text-center">Claim our Two-phase offer and get funded sooner!</p>
                <div className="">
                    <h3 className={inputTitleClass}>Trading Currency</h3>
                    <input type="hidden" value={cardwords.title} name="pkgTitle" onChange={handleChange} />
                    <div className="flex mt-10 mb-10 flex-row flex-wrap gap-4">
                        {btnword.tradingCurrency.map(({indexNum, icon, word}) => 
                            <TabsBtn 
                                onClick={e => {
                                    e.preventDefault();
                                    const { name, value } = e.target;
                                    updateContext.setUserFormData(prevState => ({
                                        ...prevState,
                                        ["pkgTitle"]: cardwords.title,
                                        [name]: value,
                                    }));
                                    updateContext.setClickedColor('cyan');
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
                <div >
                    <h3 className={inputTitleClass}>Account Balance</h3>
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
                                            ['pkgPrice']: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor('cyan');
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
                                            ["pkgPrice"]: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor('cyan');
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
                                            ["pkgPrice"]: price,
                                            [name]: value
                                        }));
                                        updateContext.setClickedColor('cyan');
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
                    <h3 className={inputTitleClass}>Platform</h3>
                    <div className="mt-10 mb-10 flex flex-row gap-4">
                        {btnword.platform.map(({indexNum, word}) => 
                            <TabsBtn 
                                onClick={handleChange} 
                                index={indexNum}
                                name="platform"  
                                type={"text"} 
                                //onChange={handleChange}
                                value={word}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <h3 className={inputTitleClass}>Type</h3>
                    <div className="mt-10 mb-10 flex flex-row gap-4">
                        {btnword.type.map(({indexNum, icon, word}) => 
                            <TabsBtn 
                                icon={icon} 
                                onClick={handleChange} 
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
                    <h3 className={inputTitleClass}>Discount</h3>
                    <div className="mt-10 mb-10">
                        <TabsInput
                            type="text"
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

export default FormTwo;