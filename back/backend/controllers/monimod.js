const axios = require("axios")
// const PesaPal = require('pesapaljs-v3').init({
//     key: 'W/MOdWsn2hhw/7V+/QfaSVaUvs5GB54t',
//     secret: 'nLx1zafJ2Ce1VIZeUfZOHpoT+pg=',
//     debug: false// false in production
// })

// const auth = PesaPal.authenticate();
// console.log(auth)
// const options = {
//     url: "https://www.kisikicapital.com/ipn",//"https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
//     ipn_notification_type: "GET"
// };
// const registred = PesaPal.register_ipn_url({
//     url: options?.url,
//     ipn_notification_type: options.ipn_notification_type
// })
// if(!registred) return console.log("not registred")
// //console.log(registred)    
// const getlist = PesaPal.get_ipn_list({
//     url: options.url,
//     ipn_notification_type: options.ipn_notification_type
// })
// //console.log(getlist)

const PesaPalButton = async (req, res) => {
    try {
        const PesaPal = axios.post("https://pay.pesapal.com/v3/api/Auth/RequestToken",{
            consumer_key: 'W/MOdWsn2hhw/7V+/QfaSVaUvs5GB54t',
            consumer_secret: 'nLx1zafJ2Ce1VIZeUfZOHpoT+pg=',
            // debug: false// false in production
        },{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(PesaPal)
    } catch (error) {
        console.log(error)
    }
    // // const auth = PesaPal.authenticate();
    // const options = {
    //     url: "https://www.kisikicapital.com/ipn",//"https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
    //     ipn_notification_type: "GET"
    // };
    // console.log(auth)
    // if (auth) {
    //     const registred = await axios.post('',{
    //         url: options?.url,
    //         ipn_notification_type: options.ipn_notification_type
    //     })
    //     if(!registred) return console.log("not registred")
    //     console.log(registred)    
    //     const getlist = await PesaPal.get_ipn_list({
    //         url: registred?.url,
    //         ipn_notification_type: registred?.ipn_notification_type
    //     })
    //     console.log(getlist)
    //     const {
    //         id, //generates some unique value, probably use uuid.
    //         currency,
    //         amount,
    //         desc,
    //         callbackurl,
    //         notificationid,
    //         // values for the billing address
    //         email,
    //         phonenumber,
    //         countrycode,
    //         firstname,
    //         lastname,
    //         lineOne,
    //         lineTwo,
    //         city,
    //         state,
    //         postalcode,
    //         zipcode
        
    //     } = req?.body
    //     PesaPal.submit_order({
    //         "id": id,
    //         "currency": currency,
    //         "amount": amount,
    //         "description": desc, // transaction description
    //         "callback_url": callbackurl, //front end URL for redirect
    //         "notification_id": notificationid, //IPN URL
    //         "billing_address": {
    //         "email_address": email,
    //         "phone_number": phonenumber,
    //         "country_code": countrycode,
    //         "first_name": firstname,
    //         "middle_name": "",
    //         "last_name": lastname,
    //         "line_1": lineOne,
    //         "line_2": lineTwo,
    //         "city": city,
    //         "state": state,
    //         "postal_code": postalcode,
    //         "zip_code": zipcode
    //         }
    //     })
    //         .then(function(status){ /* do stuff*/ })
    //         .catch(function(error){ /* do stuff*/ });   
    // }

}

const getPesaPalTrans = (req, res) => {
    const PesaPal = axios.post("https://pay.pesapal.com/v3/api/Auth/RequestToken",{
        key: 'W/MOdWsn2hhw/7V+/QfaSVaUvs5GB54t',
        secret: 'nLx1zafJ2Ce1VIZeUfZOHpoT+pg=',
        debug: false// false in production
    })
    const registerIpnUrl = async (req, res) => {
    
    }
    console.log(PesaPal)
    const {id} = req.params
    PesaPal.get_transaction_status({
        
        OrderTrackingId:id // ensure you get the spelling correct!
    })
        .then(function(status){ console.log(status) })
        .catch(function(error){ console.log(error)});
}

module.exports = {
    PesaPalButton,
    getPesaPalTrans
}

