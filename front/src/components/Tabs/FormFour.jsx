import React, {useContext} from 'react';
import FormContext from '../../context/FormContext';
import './styles.css';
import { CurrencyDollarIcon, CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";
import {TabsInput, TabsSelect, CheckBox, FooterButton} from "./TabsInput";
import { useAuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const FormFour = ({onSubmit, handleChange}) => {
    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;
    //const loggedInUser = localStorage.getItem("person");
    //if(!loggedInUser) return <Navigate to="/signin" state={{ from: location }} replace />
    //const foundUser = jwtDecode(loggedInUser);
    const data = "" //foundUser.userSession

    return (
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {updateContext.msg && updateContext.msg }
            <div className="mt-4 w-full gap-8 p-8">
                <form className="flex flex-row flex-wrap gap-10" onSubmit={onSubmit}>
                  <div>
                        <input type="hidden"
                          name="entitytype"
                          value="person"
                          onChange={handleChange} 
                        />
                        <input type="hidden"
                          name="userId"
                          value={data && data?.user_id}
                          onChange={handleChange} 
                        />
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Company Name
                      </label>
                      <div className="relative">
                        <TabsInput 
                          type="text" 
                          placeholder="Company Name"
                          name="companyName"
                          value={updateContext.companyName}
                          onChange={handleChange} 
                        />
                      </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          VAT Number
                      </label>
                      <div className="relative">
                        <TabsInput 
                          type="text" 
                          placeholder="VAT Number"
                          name="vatNumber"
                          value="add vat if applicable"
                          onChange={handleChange}
                        />
                      </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Business Registration Number
                      </label>
                      <div className="relative">
                      <TabsInput 
                        type="text" 
                        placeholder="Business Registration Number"
                        name="businessRegNo"
                        value=""
                        onChange={handleChange}
                      />
                      </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Country
                      </label>
                      <div className="relative">
                          <TabsSelect
                              name="billingCountry"
                              value=" "
                              onChange={handleChange}
                          />
                      </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Postal Code
                      </label>
                      <div className="relative">
                          <TabsInput 
                              type="text" 
                              placeholder="Postal Code"
                              name="billingPostalCode"
                              value={updateContext.billingPostalCode}
                              onChange={handleChange}
                          />
                      </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          City
                      </label>
                      <div className="relative">
                          <TabsInput 
                              type="text" 
                              placeholder="City"
                              name="billingCity"
                              value=""
                              onChange={handleChange}
                          />
                    </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Address
                      </label>
                      <div className="relative">
                      <TabsInput 
                          type="text" 
                          placeholder="Address"
                          name="billingAddress"
                          value=""
                          onChange={handleChange}  
                      />
                    </div>
                  </div>
                  <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Phone Number
                      </label>
                      <div className="relative">
                          <TabsInput 
                              type="text" 
                              placeholder="Phone Number"
                              name="billingPhoneNumber"
                              value=""
                              onChange={handleChange}
                          />
                    </div>
                  </div>
                  <div className="mt-4 w-full" >
                      <div className="flex gap-10" >
                        <div className="flex-col">
                          <CheckBox
                              label={"I agree to the terms and conditions"}
                              type="checkbox"
                              name="checked"
                              defaultChecked={updateContext.checked}
                              onChange={handleChange}
                          />
                          {/* <CheckBox
                              label={"I accept the refund policy"} 
                              type="checkbox"
                              name="checkedTwo"
                              defaultChecked={updateContext.checkedTwo} 
                              onChange={handleChange}
                            /> */}
                        </div>
                        <div className="ps-30 float-right h-15 items-center">
                            <input 
                              type="submit" 
                              className="p-6 bg-primary w-full text-white dark:bg-primary rounded-2xl " 
                              value="Checkout"
                            />
                        </div>
                      </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
        // <div className="container">
        //     <p>Enter your details</p>
        //     <div className="formContain">
        //         <form className="form">
        //             <input className="formInput" type="date" placeholder="Date of Birth" onChange={e => updateContext.setDOB(e.target.value)} required/>
        //             <input className="formInput" type="date" placeholder="License Issue" onChange={e => updateContext.setIssue(e.target.value)} required/>
        //             <input className="formInput" type="text" placeholder="Company Name" onChange={e => updateContext.setCompany(e.target.value)} required/>
        //             <div className="multipleButtons">
        //             <button className="multipleButton" value="Previous" type="button" onClick={() => updateContext.setStep(updateContext.currentPage - 1)}>Previous </button>
        //             <button className="multipleButton" value="Next" type="button" onClick={next}>Next </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
};

export default FormFour;