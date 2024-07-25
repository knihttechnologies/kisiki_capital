import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useTableContext } from '../context/TableContext';
import { jwtDecode } from 'jwt-decode';

const GooglePayButtonComponent = () => {
  const auth = useAuthContext()
  const table = useTableContext()
  const localUser = localStorage.getItem('person')
  const localUserOrder = localStorage.getItem('order')
  if(!localUser || localUser === "") return navigate('/')
  const userdecoded = jwtDecode(localUser)
  const orderdecoded = jwtDecode(localUserOrder)
  const order = orderdecoded?.objectToSend?.userres
  const user = userdecoded?.objectToSend
  const [totalPrice, setTotalPrice] = useState(0);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [passwordLength, setPasswordLength] = useState(12);
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    emailAddress: '',
    phoneNumber: '',
  });
  const merchantId = "BCR2DN4T26ZL3T2I"
  const merchantName = "KISIKI CAPITAL TRADERS"
  const calculateTotalPrice = () => {
    return totalPrice;
  };

  const getUserDetails = () => {
    // Implement your own logic to retrieve the user details
    return {
      displayName: `${order?.user_firstname} ${order?.user_lastname}`,
      emailAddress: order?.user_email,
      phoneNumber: order?.user_phone,
    };
  };

  const generateNonce = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
        newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return newPassword;
  };

  const onLoadPaymentData = async (paymentData) => {
    const totalPrice = user?.order?.discount !== "" ? user?.order?.pkgprice - (user?.order?.pkgprice * (user?.order?.discount / 100)) : user?.order?.pkgprice
    try {
      // Send the payment data to the backend
      const response = await axios.post('/api/google-pay', {
        totalPrice: totalPrice,
        userDetails: {
          displayName: user?.user?.title,
          emailAddress: user?.user?.user_email,
          phoneNumber: user?.user?.user_phone,
        }
      });

      if (response.status === 200) {
        // Handle the successful payment
        console.log('Payment successful');
        auth.setOpenSignIn(true)
      } else {
        // Handle the payment error
        console.error('Payment error');
        table?.setTableErrMsg("Payment has an error")
        return 
      }
    } catch (error) {
      console.error('Error communicating with the backend:', error);
    }
  };

  const onPaymentDataAuthorized = (paymentData) => {
    // Handle the payment authorization
    console.log(paymentData)
    return { transactionState: 'SUCCESS' };
  };

  const onPaymentError = (error) => {
    // Handle the payment error
    console.error('Payment error:', error);
  };

  return (
    <div>
      <script
        src="https://pay.google.com/gp/p/js/pay.js"
        onload="onGooglePayLoaded()"
        async
        defer
        nonce={generateNonce()}
      />
      <GooglePayButton
        environment="PRODUCTION"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              },
            },
          ],
          merchantInfo: {
            merchantId: merchantId,
            merchantName: merchantName,
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: totalPrice.toFixed(2),
            currencyCode: 'USD',
            countryCode: 'US',
          },
          paymentDataRequestOptions: {
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
          },
        }}
        onLoadPaymentData={onLoadPaymentData}
        onPaymentDataAuthorized={onPaymentDataAuthorized}
        onPaymentError={onPaymentError}
        style={{
          layout: 'vertical',
        }}
      />
    </div>
  );
};

export default GooglePayButtonComponent;