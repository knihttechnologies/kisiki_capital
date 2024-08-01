const express = require("express")
const { Login, Logout } = require("../controllers/auth")
const { RefreshToken } = require("../middleware/RefreshToken")
const upload = require("../controllers/uploadFiles")
const { 
    createUsersManually,
    createRolesManually,
    getUserrole,
    //users
    Register,
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
    VerifyEmail
 } = require("../controllers/users")
// const admin = express.Router()
const users = express.Router()
const auth = express.Router()

//Auth
auth.post('/login', Login)
//auth.get('/authenticate', MaintainUserSession)
auth.post('/logout', Logout)
auth.get('/refresh', RefreshToken)
//Admin
// admin.get('/allusers', getAllUsers)
// admin.get('/allpayments', getAllPayments)
// admin.get('/allorders', getAllOrders)
// admin.get('/allchats', getAllChats)
//Users routes
users.post('/createusersmanually', createUsersManually)
users.post('/createrolesmanually', createRolesManually)
users.post('/registerusers', Register)//upload
users.post('/registerpayments', RegisterPayments)
users.post('/verifyemail',  VerifyEmail)
users.post('/registerorders',  RegisterOrders)
users.post('/registerchat', RegisterChat)
users.post('/registersubscriber', RegisterOrders)//upload
users.get('/userroles', getUserrole)
users.get('/oneuser/:id', getOneUser)
users.get('/oneorder/:id', getOneOrder)
users.get('/onepayment/:id', getOnePayment)
users.get('/onechat/:id', getOneChat)
users.post('/updateuser/:id', upload.single('ProfilePicture'), updateUser)
users.post('/updateorder/:id', updateOrder)
users.post('/updatepayment/:id', updatePayment)
users.post('/updatechat/:id', updateChat)
users.post('/deleteuser/:id', deleteUser)
users.post('/deleteorder/:id', deleteOrder)
users.post('/deletepayment/:id', deletePayment)
users.post('/deletechat/:id', deleteChat)

module.exports = { 
    users, 
    auth
}