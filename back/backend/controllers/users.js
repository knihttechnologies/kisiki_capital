const bcrypt = require('bcrypt')
const db = require('../models')
const {sendEmail} = require('../middleware/mailer')
// image Upload
const multer = require('multer')
const path = require('path')
// create Models
const Users = db.Users
const UserRole = db.UserRole
const Orders = db.Orders
const Payment = db.Payment
const LiveSupport = db.LiveSupport
const axios = require('axios');
const crypto = require('crypto')
const { json } = require('sequelize')
const MERCHANT_ID = process.env.MERCHANT_ID;
const API_KEY = process.env.API_KEY;
const jwt = require('jsonwebtoken')
const secretKey = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
}

const createUsersManually = async ( req, res) => {
    try {
        const register_team = await Users.create({ 
            user_title: "Mr", 
            user_firstname: "Nuwa", 
            user_lastname: "Venture",
            user_email: "mnuwabiine@gmail.com",
            user_country: "Uganda",
            user_postalcode: "30NMW",
            user_city: "Kampala",
            user_address: "Kulambiro",
            user_phone: "+256-760420592",
            user_profilepicture: " " 
        })
        let registerManually = {register_team} 
        res.status(200).json(registerManually );
        console.log(registerManually)
    } catch (error) {
        console.log(error);
    }
}

const createRolesManually = async ( req, res) => {
    try {
        const superadmin_role = await UserRole.create({ role_name: 'Superadmin', role_desc: "For the super admin" })
        const manager_role = await UserRole.create({ role_name: "Manager", role_desc: "For the manager" })
        const user_role = await UserRole.create({ role_name: "User", role_desc: "For the User" })
        let objectWithRoles = {
            superadmin_role, 
            manager_role, 
            user_role,
        } 
        res.status(200).json(objectWithRoles);
        console.log(objectWithRoles)
        return
    } catch (error) {
        console.log(error);
    }
}

const requireAuth = (req, res, next) => {
    const {user} = req.session
    if(!user){
        return res.status(401).json({message: 'Unauthorized'})
    }
    next();
}

// main work
// Get the user roles
const getUserrole = async(req, res) => {
    try {
        const userroles = await UserRole.findAll({
            attributes:['role_id', 'role_name', 'role_desc', 'date_registered'] 
        });
        console.log(userroles)
        if (userroles.attributes == " ") return res.status(400).send({message: "No roles found"}) 
        const objectToSend = {
            message: 'the userroles were found',
            userroles
        }
        userroles 
            ? res.status(200).json(objectToSend)
            : res.status(400).send({message: 'Could not find the userroles'})
    } catch (error) {
        res.status(500).json({message: `an error occured getting user roles: ${error}`})
        console.log(`an error occured getting user roles ${error}`);
    }
}

//User controllers
// create users
const Register = async (req, res) => {
    const mail = ''
    try {
        const { 
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
            userProfilePic,
            isVerifiedUser, 
            roleId 
        } = req.body;
        //check if the role id is available
        //we compare the role given from the req.body to the role in userrole table to get the role_id
        const role = await UserRole.findOne({
            attributes: ['role_id'],
            where:{ 
                role_name: roleId
            }    
        })
        console.log(role.role_id)
        if(!role || role === null) return res.status(500).json({message: 'failed to get the role'})
        //for debugging purposes
        //console.log(teamName, teamThemeSong, teamMarks,isVerifiedTeam)
        // Check if required fields are present
        if ( title === " " || firstname === " " || lastname === " " || country === " " || email === " " || password === " " || isVerifiedUser === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        // Check if the team name already exists
        const existingUser = await Users.findOne({ where: { user_email: email } });
        console.log(existingUser)
        if (existingUser) {
            console.log(`The user ${existingUser.user_firstname} already exists`);
            return res.status(409).json({ message: `The user ${existingUser.user_email} already exists` });
        }
        console.log(existingUser)
        // Create a new team record
        const newUser = await Users.create({
            user_title: title,  
            user_email: email, 
            user_phone: phone, 
            user_firstname: firstname, 
            user_lastname: lastname, 
            user_lang: lang,
            user_password: hashPassword,
            //Billing details  
            user_country: country,
            user_address: address,
            user_city: city,
            user_zip: zip,
            user_coupon: coupon,
            user_profilepicture: userProfilePic,
            isVerified_user: isVerifiedUser, 
            role_id: role.role_id
        })
        const mailToSend = {
            from: "kisikicapital@gmail.com",
            to: newUser.user_email,
            subject: "Kisiki Capital User Registration",
            text: `Your account has successfully been successfully been created`
        }
        const mail = await sendEmail(mailToSend)
        req.session.user = newUser
        const objectToSend = {
            message: `Your account ${newUser.user_firstname} has been created`,
            mail,
        }

        console.log(`Your account ${newUser.user_firstname} has been created`);
        return res.status(201).json(objectToSend);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Could not create user record' });
    }
}

//verify the email
const VerifyEmail = async (req, res, next) => {
    const {emailAccessToken} = req.query;
    const secretKey = {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
    }
    try {
        const { signObject } = jwt.verify(emailAccessToken, secretKey.process.env.JWT_SECRET);
        console.log(signObject)
        const {user} = signObject
        console.log(user)
        await Users.updateOne({ user_email: user?.user_email }, { isVerified_user: "Yes" });
        res.send('Email verified successfully');
    } catch (error) {
        res.status(400).send('Invalid or expired token');
    }
    // Verifying the JWT token 
    // jwt.verify(emailAccessToken, secretKey.accessTokenSecret, (err, decoded) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(400).json({message:"Email verification failed, possibly the link is invalid or expired"});
    //     }
    //     else {
    //         console.log(decoded)
    //         const objectToSend = {
    //             message: "Email verified successfully",
    //             decoded
    //         }
    //         return res.status(200).json(objectToSend);
    //     }
    // });
}
// create orders
const RegisterOrders = async (req, res, next) => {
    try {
        const { 
            useremail,
            userpass,
            entitytype,
            pkgtitle,
            pkgprice,
            tradingcurrency,
            acctbal,
            platform,
            type,
            discount,
            status,
            checkedOne,
            checkedTwo,
        } = req?.body;

        //check if the inputs are not empty
        if ( useremail === " " || userpass === " " || pkgtitle === " " || pkgprice === " " || acctbal === " ") {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(userpass, salt)
        //const userid = req.session.user.user_email
        //Find a user or create them
        const [user, created] = await Users.findOrCreate({
            where: { user_email: useremail },
            defaults: {
                user_email: useremail, 
                user_password: hashPassword
            },
        });
        console.log(user)
        const [order, orderCreated] = await Orders.findOrCreate({
            where: { user_id: user.user_id  },
            defaults: {
                entity_type: entitytype,
                package_title: pkgtitle,
                package_price: pkgprice,
                trading_currency: tradingcurrency,
                account_balance: acctbal,
                platform: platform,
                type: type,
                discount: discount,
                status: status,
                checked_one: checkedOne,
                checked_two: checkedTwo,
                user_id: user.user_id,
            },
        });
        const signObject = {
            user, order
        }
        //console.log(`The token with: ${order.package_title} for ${user.user_email} has been created`);
        if(secretKey.accessTokenSecret === " " || secretKey.accessTokenSecret === null || secretKey.accessTokenSecret === undefined)
            return console.log("accessTokenSecret is empty") && res.status(400).json({ message: "Missing secret for email!" })
        const emailAccessToken = jwt.sign({signObject}, secretKey.accessTokenSecret,{
                expiresIn: '10440s'
        })
        //const token = jwt.sign({ data: 'Token Data'}, 'ourSecretKey', { expiresIn: '10m' });
        // console.log(order)
        if (created === true && orderCreated === true) {
            const mailToSend = {
                from: "kisikicapital@gmail.com",
                to: user.user_email,
                subject: "Kisiki Capital User Registration",
                html: 
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.taiwindcss.com"></script>
                    <title>Kisiki Capital</title>
                </head>
                <body>
                    <div class="flex flex-col flex-wrap justify-center p-10 m-10">
                        <div class="flex flex-col justify-center flex-wrap">
                            <h4 class="p-5 bg-slate-600 font-bold shadow-xl mt-2 mb-5 w-90 flex flex-wrap rounded-md"> Your order: <span class="text-white mr-2">${pkgtitle}</span> package.</h4>
                            <p class="text-center p-3 shadow-xl mt-2 mb-5 rounded-md text-sm w-50">Price: <span class="text-warning ml-2 ">$${pkgprice}</span></p>
                            <p class="text-center p-3 shadow-xl mt-2 mb-5 rounded-md text-sm w-50">Account balance: <span class="text-warning ml-2" >$${acctbal}</span></p>
                            <h2 class="p-5 bg-slate-600 font-bold shadow-xl mt-2 mb-5 w-90 flex flex-wrap rounded-md">Use the provided link to verify your email: </h2>
                            <a className="text-warning" href="https://kisikicapital.com/verify?emailAccessToken=${emailAccessToken}" >Verify your Email</a>
                            <h4 class="p-5 bg-slate-600 font-bold shadow-xl mt-2 mb-5 w-90 flex flex-wrap rounded-md">Thank you </h4>
                        </div>
                    </div>
                    <footer class="rounded-lg mb-10 shadow-xl shadow-white bg-black opacity-[85%]">
                        <div class="h-10 w-10">
                            <img src="https://kisikicapital.com/assets/kisiki-capital-04-5d40396b.png" class="h-10 w-10" alt="">
                        </div>
                    </footer>
                </body>
                </html>
                `
            }
            const mail = await sendEmail(mailToSend)
            const objectToSend = {
                // message: `The user ${user.user_email} has been created with ${order.package_title} subscription has been created`,
                message: `Successfully subscribed to ${order.package_title}, A verification link has been sent to the email you provided`,
                user, order, mail
            }
            console.log(`The Subscription: ${order.package_title} for ${user.user_email} has been created`);
            if(secretKey.accessTokenSecret === " " || secretKey.accessTokenSecret === null || secretKey.accessTokenSecret === undefined)
                return console.log("accessTokenSecret is empty") && res.status(400).json({ message: "Missing secret!" })
            const accessToken = jwt.sign({objectToSend}, secretKey.accessTokenSecret,{
                    expiresIn: '10440s'
            })
            //create the user access token
            //for debugging to check if the access token secret exists
            //console.log(secretKey.accessTokenSecret)
            if(secretKey.refreshTokenSecret === " " || secretKey.refreshTokenSecret === null || secretKey.refreshTokenSecret === undefined)
            return console.log("refreshTokenSecret is empty") && res.status(400).json({ message: "Missing secret!" })
            const refreshToken = jwt.sign({objectToSend}, secretKey.refreshTokenSecret,{
                expiresIn: '1d'
            })
            //Update authenticated admin with refresh token
            const updated = await Users.update({refresh_token: refreshToken},{
                where:{user_email: user?.user_email}
            })
            if(!updated) return res.status(400).send({msg: 'The refresh token failed to update'})
            return  res.status(201).cookie('refreshToken', refreshToken,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json(accessToken) 
        }else{
            if(secretKey.accessTokenSecret === " " || secretKey.accessTokenSecret === null || secretKey.accessTokenSecret === undefined)
                return console.log("accessTokenSecret is empty") && res.status(400).json({ message: "Missing secret for email!" })
            const user = jwt.sign({signObject}, secretKey.accessTokenSecret,{
                    expiresIn: '10440s'
            })
            console.log(`The user with email: ${user?.user_email} already has an order called ${order?.package_title}`);
            return res.status(409).json(user);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Could not create subscriber record' });
    }
}

// Register payments
const RegisterPayments = async (req, res) => {
    try {
        const { 
            paymentmethod,
            tradingcurrency,
            amountpaid,
            paymentstatus,
            isVerifiedPayer,
            orderId,
            userId, 
        } = req.body;
        const userid = req.session
        const data = {
            amount: amountpaid,
            currency: tradingcurrency,
            order_id: orderId
        }
        const sign = crypto
            .createHash("md5")
            .update(Buffer.from(JSON.stringify(data)).toString("base") + API_KEY)
        //check if the user id is available
        //we compare the user id given from the req.body to the user id in users table to get the user_id
        const orders = await Orders.findOne({
            attributes: ['order_id'],
            where:{ 
                order_id: orderId
            }    
        })
        console.log(orders.order_id)
        if(!orders || orders === null) return res.status(500).json({message: 'The payment id does not match'})
        //for debugging purposes
        //console.log()
        // Check if required fields are present
        // if ( title === " " || firstname === " " || lastname === " " || country === " " || email === " " || password === " " || isVerifiedUser === undefined) {
        //     return res.status(400).json({ message: 'Missing required fields' });
        // }
        // Check if the user already exists
        const existingOrder = await Orders.findOne({ where: { order_id: orderId } });
        console.log(existingOrder)
        if (existingOrder) {
            console.log(`${existingOrder.package_title} already paid for the package`);
            return res.status(409).json({ message: `${existingOrder.package_title} already paid for the package` });
        }
        //debugging
        // console.log(existingUser)
        // Create a new team record
        const newOrder = await Payment.create({
            payment_method: paymentmethod,
            amount_paid: amountpaid,
            payment_status: paymentstatus,
            isVerified_payer: isVerifiedPayer,
            order_Id: orderId,
            user_id: userid.user_id
        });
        const objectToSend = {
            message: ` ${newOrder.package_name}'s payment has been created`,
            newOrder
        }
        console.log(`${newOrder.package_name}'s payment has been created`);
        return res.status(201).json(objectToSend);
    } catch (error) {
        console.error('Error creating payment:', error);
        return res.status(500).json({ message: 'Could not create payment record' });
    }
}
//register a support chat
const RegisterChat = async (req, res) => {
    try {
        const { 
            querysubject,
            querymessage,
            queryreply,
            querystatus,
            isVerifiedchat,
            userId, 
        } = req.body;
        const userid = req.session
        //check if the user id is available
        //we compare the user id given from the req.body to the user id in users table to get the user_id
        const user = await Users.findOne({
            attributes: ['user_id'],
            where:{ 
                user_id: userid.user_id
            }    
        })
        console.log(user.user_id)
        if(!user || user === null) return res.status(500).json({message: 'You are not allowed to view this message'})
        //for debugging purposes
        //console.log()
        // Create a new chat record
        const newChat = await LiveSupport.create({
            query_subject: querysubject,
            query_message: querymessage,
            query_reply: queryreply,
            query_status: querystatus,
            isVerified_chat: isVerifiedchat,
            user_id: userid.user_id
        });
        const objectToSend = {
            message: ` ${newChat.query_subject} has been created`,
            newChat
        }
        console.log(`${newChat.query_subject} has been created`);
        return res.status(201).json(objectToSend);
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).json({ message: 'Could not create chat record' });
    }
}
// get all users
const getAllUsers = async (req, res) => {
    try
    {
        const Users = await Users.findAll({
            attributes: [
                "user_title",  
                "user_email", 
                "user_phone", 
                "user_firstname", 
                "user_lastname", 
                "user_lang",
                "user_password",
                //Billing details  
                "user_country",
                "user_address",
                "user_city",
                "user_zip",
                "user_coupon",
                "user_profilepicture",
                "isVerified_user", 
                "role_id",
                "user_refresh_token"
                
            ],
            include: [{
                model: UserRole,
                as: 'user_roles'
            },{model: Orders, as: 'orders'}],

        })
        if (Users.length > 0) {
            console.log(Users);
            res.status(200).json({ message: 'All Users were found', Users });
        } else {
            res.status(400).json({ message: 'No Users to display' });
        }
    }catch(error){
        console.error(`Server has an error: ${error}`);
        res.status(500).json({ message: `Server has an error: ${error}` });
    }
}
// get all orders
const getAllOrders = async (req, res) => {
    try
    {
        const orders = await Orders.findAll({
            attributes: [
                "order_id",
                "entity_type",
                "package_title",
                "trading_currency",
                "account_balance",
                "platform",
                "type",
                "discount",
                "status"
            ],
            include: [{
                model: Payment,
                as: 'payments'
            }],
        })
        if (orders.length > 0) {
            console.log(orders);
            res.status(200).json({ message: 'All Users were found', orders });
        } else {
            res.status(400).json({ message: 'No Users to display' });
        }
    }catch(error){
        console.error(`Server has an error: ${error}`);
        res.status(500).json({ message: `Server has an error: ${error}` });
    }
}
// get all payments
const getAllPayments = async (req, res) => {
    try
    {
        const Payment = await Payment.findAll({
            attributes: [
                "payment_id",
                "payment_method",
                "amount_paid",
                "payment_status",
                "isVerified_payer"
            ],
            // include: [{
            //     model: Payment,
            //     as: 'payments'
            // }],
        })
        if (Payment.length > 0) {
            // console.log(Orders);
            res.status(200).json({ message: 'All Payments were found', Payment });
        } else {
            res.status(400).json({ message: 'No Payments to display' });
        }
    }catch(error){
        console.error(`Server has an error: ${error}`);
        res.status(500).json({ message: `Server has an error: ${error}` });
    }
}
// get all chats
const getAllChats = async (req, res) => {
    try
    {
        const chat = await LiveSupport.findAll({
            attributes: [
                "query_id",
                "query_subject",
                "query_message",
                "query_reply",
                "query_status",
                "isVerified_chat",
                "isVerified_payer"
            ],
            include: [{
                model: Users,
                as: 'users'
            }],
        })
        if (chat.length > 0) {
            // console.log(Orders);
            res.status(200).json({ message: 'All Users were found', chat });
        } else {
            res.status(400).json({ message: 'No Users to display' });
        }
    }catch(error){
        console.error(`Server has an error: ${error}`);
        res.status(500).json({ message: `Server has an error: ${error}` });
    }
}
// get single user
const getOneUser = async (req, res) => {
    const {id }= req?.params
    console.log(id)
    try{
        const User = await Users.findOne({
            attributes: [
                "user_id",
                "user_title",
                "user_firstname",
                "user_lastname",
                "user_email",
                "user_country",
                "user_postalcode",
                "user_city",
                "user_address",
                "user_phone",
                "user_profilepicture",
                "user_password",
                "isVerified_user",
                "user_refresh_token"
            ],
            include: [{
                model: UserRole,
                as: 'user_role'
            }],
            include: [{
                model: Orders,
                as: 'order'
            }],
            include: [{
                model: Payment,
                as: 'payment'
            }],
            where: { user_id: id }
        })
        Users ? res.status(200).json(User) : res.status(401).send({message:'Getting user unsuccessful', error: 'User not found'})
    }
    catch(error){
        res.status(500).json({message: `something is wrong with the server: ${error}`})
    }
}
// get single order
const getOneOrder = async (req, res) => {
    const {id }= req?.params
    console.log(id)
    try{
        const Order = await Orders.findOne({
            attributes: [
                "order_id",
                "entity_type",
                "package_title",
                "package_price",
                "trading_currency",
                "account_balance",
                "platform",
                "type",
                "discount",
                "status",
                "isVerified_order",
            ],
            include: [{
                model: Users,
                as: 'user'
            }],
            include: [{
                model: Payment,
                as: 'payment'
            }],
            where: { order_id: id }
        })
        Order ? res.status(200).json(Order) : res.status(401).json({message:'Getting order unsuccessful', error: 'order not found'})
    }
    catch(error){
        res.status(500).json({message: `something is wrong with the server: ${error}`})
    }
}
// get single order
const getOnePayment = async (req, res) => {
    const {id }= req?.params
    console.log(id)
    try{
        const payment = await Payment.findOne({
            attributes: [
                "payment_id",
                "payment_method",
                "amount_paid",
                "payment_status",
                "isVerified_payer",
            ],
            include: [{
                model: Users,
                as: 'user'
            }],
            include: [{
                model: Orders,
                as: 'order'
            }],
            where: { payment_id: id }
        })
        payment ? res.status(200).json(payment) : res.status(401).json({message:'Getting user unsuccessful', error: 'User not found'})
    }
    catch(error){
        res.status(500).json({message: `something is wrong with the server: ${error}`})
    }
}
// get single order
const getOneChat = async (req, res) => {
    const {userId}= req?.params
    console.log(id)
    try{
        const Chat = await LiveSupport.findOne({
            attributes: [
                "query_id",
                "query_subject",
                "query_message",
                "query_reply",
                "query_status",
                "isVerified_chat",
                "isVerified_payer"
            ],
            include: [{
                model: Users,
                as: 'user'
            }],
            where: { user_id: userId }
        })
        Chat ? res.status(200).json(Chat) : res.status(401).json({message:'Getting user unsuccessful', error: 'User not found'})
    }
    catch(error){
        res.status(500).json({message: `something is wrong with the server: ${error}`})
    }
}
// update user
const updateUser = async (req, res) => {
    
    const {id} = req?.params
    
    const users = req?.body
    // console.log(req?.body)
    // console.log(req?.params)
    // console.log(id)
    try {
        const userres = await Users.update({
            user_title: users?.title,
            user_phone: users?.phone, 
            user_firstname: users?.firstname,
            user_lastname: users?.lastname,
            user_lang: users?.lang,
            //Billing details
            user_country: users?.country,
            user_address: users?.address,
            user_city: users?.city,
            user_zip: users?.zip,
            user_coupon: users?.coupon,
            user_profilepicture: users?.userProfilePic,
            isVerified_user: users?.isVerifiedUser,
            }, { where: { user_id: id }})
        // console.log(userres)
        if(userres == 1){
            const userRes =  await Users.findByPk(id)
            const signObject = {
                message: "User updated succesfully",
                userRes
            }
            if(secretKey.accessTokenSecret === " " || secretKey.accessTokenSecret === null || secretKey.accessTokenSecret === undefined)
                return console.log("accessTokenSecret is empty") && res.status(400).json({ message: "Missing secret for email!" })
            const user = jwt.sign({signObject}, secretKey.accessTokenSecret,{
                    expiresIn: '10440s'
            })
            return res.status(200).json({user})
        }else{
            return res.status(400).json({message: 'The user was not updated'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({messages: `something went wrong: ${error}`})
    }
}
// update order
const updateOrder = async (req, res) => {
    const {id} = req?.params
    try {
        const order = await Orders.update(req?.body, { where: { order_id: id }})
        order 
            ? res.status(200).json({message: `The Record was updated`, order})
            : res.status(400).json({message: 'The record was not updated'})
    } catch (error) {
        res.status(500).json({messages: `something went wrong: ${error}`})
    }
}
// update payment
const updatePayment = async (req, res) => {
    const {id} = req?.params
    try {
        const payment = await Payment.update(req?.body, { where: { payment_id: id }})
        payment 
            ? res.status(200).json({message: `The Record was updated`, payment})
            : res.status(400).json({message: 'The record was not updated'})
    } catch (error) {
        res.status(500).json({messages: `something went wrong: ${error}`})
    }
}
// update payment
const updateChat = async (req, res) => {
    const {id} = req?.params
    try {
        const chat = await LiveSupport.update(req?.body, { where: { query_id: id }})
        payment 
            ? res.status(200).json({message: `The Record was updated`, payment})
            : res.status(400).json({message: 'The record was not updated'})
    } catch (error) {
        res.status(500).json({messages: `something went wrong: ${error}`})
    }
}
// delete user
const deleteUser = async (req, res) => {
    const {id} = req?.params
    try {
        const user = await Users.destroy({ where: { user_id: id }} )
        user
            ? res.status(200).json({message: 'Record has been deleted!'})
            : res.status(400).json({message: 'failed to delete user record'})
    } catch (error) {
        res.status(500).json({message: 'something is wrong with the server'})
    }
}
// delete order
const deleteOrder = async (req, res) => {
    const {id} = req?.params
    try {
        const order = await Orders.destroy({ where: { order_id: id }} )
        order
            ? res.status(200).json({message: 'Record has been deleted!'})
            : res.status(400).json({message: 'failed to delete order record'})
    } catch (error) {
        res.status(500).json({message: 'something is wrong with the server'})
    }
}
// delete payment
const deletePayment = async (req, res) => {
    const {id} = req?.params
    try {
        const payment = await Payment.destroy({ where: { order_id: id }} )
        payment
            ? res.status(200).json({message: 'Record has been deleted!'})
            : res.status(400).json({message: 'failed to delete payment record'})
    } catch (error) {
        res.status(500).json({message: 'something is wrong with the server'})
    }
}
// delete chat
const deleteChat = async (req, res) => {
    const {id} = req?.params
    try {
        const chat = await LiveSupport.destroy({ where: { order_id: id }} )
        chat
            ? res.status(200).json({message: 'Record has been deleted!'})
            : res.status(400).json({message: 'failed to delete chat record'})
    } catch (error) {
        res.status(500).json({message: 'something is wrong with the server'})
    }
}
// Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
}).single('image')

//export the controllers
module.exports = {
    requireAuth,
    createUsersManually,
    createRolesManually,
    getUserrole,
    //users
    Register,
    VerifyEmail,
    RegisterOrders,
    RegisterPayments,
    RegisterChat,
    getAllUsers,
    getAllOrders,
    getAllPayments,
    getAllChats,
    getOneUser,
    getOneOrder,
    getOnePayment,
    getOneChat,
    updateUser,
    updateOrder,
    updatePayment,
    updateChat,
    deleteUser,
    deleteOrder,
    deletePayment,
    deleteChat,
    upload
}


        // if(companyName === "") next()
        // //create a new company order record
        // const newCompanyOrder = await Company.create({
        //     company_name: companyName,
        //     vat_number: vatNumber,
        //     businessregno: businessRegNo,
        //     company_country: compcountry,
        //     company_postalcode: comppostalCode,
        //     company_city: compcity,
        //     company_address: compaddress,
        //     company_phone: compphonenumber,
        //     isVerified_company: isverifiedCompany
        // })
        // Create a new user order record