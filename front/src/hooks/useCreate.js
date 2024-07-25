import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";

const useCreate = () => {
  const navigate = useNavigate()
  const localUser = localStorage.getItem('person')
  if(!localUser || localUser === "") return navigate('/')
  const userdecoded = jwtDecode(localUser)
  const user = userdecoded?.objectToSend
 // const navigate = useNavigate();
  const auth = useAuthContext()
  const createUser = async ({ 
    title,  
    email, 
    phone, 
    firstname, 
    lastname, 
    lang,
    password,  
    country,
    address,
    city,
    zip,
    coupon,
    isVerifiedUser, 
    roleId
  }) => {
    try {
      auth.setLoading(true);
      const response = await axios.post('/api/users/registerusers', { 
        title,  
        email, 
        phone, 
        firstname, 
        lastname, 
        lang,
        password,
        //Billing details  
        country,
        address,
        city,
        zip,
        coupon,
        isVerifiedUser, 
        roleId
      })
      if(!response) return auth.setErrMsg("The server is offline")
      if(response.status === 409) return auth.setErrMsg(`${response.data.message}`)
      auth.setMsg(`${response.data.message}`)
      return response
    } catch (err) {
      auth.setErrMsg(err.response.data.message);
    } finally {
      auth.setLoading(false);
    }
  };
  const updateUser = async ({
    title,  
    email, 
    phone, 
    firstname, 
    lastname, 
    lang,
    password,  
    country,
    address,
    city,
    zip,
    coupon,
    isVerifiedUser, 
    roleId
  }) => {
    try {
      auth.setUserUpdateLoading(true);
      const response = await axios.post(`/api/users/updateuser/${user?.user?.user_id}`, {
        title,  
        email, 
        phone, 
        firstname, 
        lastname, 
        lang,
        password,
        //Billing details  
        country,
        address,
        city,
        zip,
        coupon,
        isVerifiedUser, 
        roleId
      }, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      localStorage.setItem("order", JSON.stringify(response?.data));
      if(!response) return auth.setUserUpdateErrMsg("The server is offline")
      if(response.status === 409) return auth.setUserUpdateErrMsg(`${response?.data?.message}`)
      auth.setUserUpdateMsg(`${response?.data?.message}`)
      return response
    } catch (err) {
      auth.setUserUpdateErrMsg(err?.response?.data?.message);
    } finally {
      auth.setUserUpdateLoading(false);
    }
  };

  return { 
    createUser, updateUser
  };
};

export default useCreate;