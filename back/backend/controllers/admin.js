const bcrypt = require('bcrypt')
const db = require('../models')
const {sendEmail} = require('../middleware/mailer')
// image Upload
const multer = require('multer')
const path = require('path')
// create Models
const Admin = db.Admin
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

const createAdminManually = async ( req, res) => {
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

const requireAdmin = (req, res, next) => {
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
const RegisterAdmin = async (req, res) => {
    const mail = ''
    try {
        const { 
            title,  
            email, 
            phone, 
            firstname, 
            lastname,
            password,
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
        if ( title === " " || firstname === " " || lastname === " " || email === " " || password === " " || isVerifiedUser === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        // Check if the team name already exists
        const existingUser = await Admin.findOne({ where: { user_email: email } });
        console.log(existingUser)
        if (existingUser) {
            console.log(`The user ${existingUser.user_firstname} already exists`);
            return res.status(409).json({ message: `The user ${existingUser.user_email} already exists` });
        }
        console.log(existingUser)
        // Create a new team record
        const newUser = await Admin.create({
            user_title: title,  
            user_email: email, 
            user_phone: phone, 
            user_firstname: firstname, 
            user_lastname: lastname,
            user_password: hashPassword,
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
// create 
const RegisterUserOrders = async (req, res, next) => {
    try {
        const { 
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
            userId
        } = req?.body;
        //check if the user id is available
        const userid = req.session
        //we compare the user id given from the req.body to the user id in users table to get the user_id
        const user = await Users.findOne({
            attributes: ['user_id'],
            where:{ 
                user_id: userid.user_id
            }    
        })
        console.log(user.user_id)
        if(!user || user === null) return res.status(500).json({message: 'The user id does not match'})
        //for debugging purposes
        //console.log()
        // Check if required fields are present
        // if ( title === " " || firstname === " " || lastname === " " || country === " " || email === " " || password === " " || isVerifiedUser === undefined) {
        //     return res.status(400).json({ message: 'Missing required fields' });
        // }
        // Check if the user already exists in the orders
        const existingUser = await Orders.findOne({ where: { user_id: userid.user_id } });
        console.log(existingUser)
        if (existingUser) {
            console.log(`User already subscribed for the package`);
            return res.status(409).json({ message: `You are already subscribed for the package` });
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
        const newOrder = await Orders.create({
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
            user_id: userId,
        });
        const objectToSend = {
            message: `${newOrder.package_title}'s subscription has been created`,
            newOrder
        }
        console.log(`${newOrder.package_title}'s subscrption has been created`);
        return res.status(201).json(objectToSend);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Could not create subscriber record' });
    }
}

// Register payments
const RegisterUserPayments = async (req, res) => {
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
const RegisterUserChat = async (req, res) => {
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
    try {
        const user = await Users.update(req?.body, { where: { user_id: id }})
        user 
            ? res.status(200).json({message: `The User was updated`, user})
            : res.status(400).json({message: 'The record was not updated'})
    } catch (error) {
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
    requireAdmin,
    createAdminManually,
    createRolesManually,
    getUserrole,
    //users
    RegisterAdmin,
    RegisterUserOrders,
    RegisterUserPayments,
    RegisterUserChat,
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