const express = require("express")
const { Login, Logout, MaintainUserSession } = require("../controllers/Auth")
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
    requireAuth,
    VerifyEmail
 } = require("../controllers/users")
// const admin = express.Router()
const users = express.Router()
const auth = express.Router()

//Auth
auth.post('/login', Login)
auth.get('/authenticate', MaintainUserSession)
auth.post('/logout', Logout)
auth.get('/refresh', RefreshToken)
//Admin
// admin.get('/allusers', getAllUsers)
// admin.get('/allpayments', getAllPayments)
// admin.get('/allorders', getAllOrders)
// admin.get('/allchats', getAllChats)
//Users routes
users.post('/createusersmanually', requireAuth, createUsersManually )
users.post('/createrolesmanually', createRolesManually)
users.post('/registerusers', Register)//upload
users.post('/registerpayments', requireAuth, RegisterPayments)
users.post('/verifyemail',  VerifyEmail)
users.post('/registerorders',  RegisterOrders)
users.post('/registerchat', requireAuth, RegisterChat)
users.post('/registersubscriber', requireAuth, RegisterOrders)//upload
users.get('/userroles', requireAuth, getUserrole)
users.get('/oneuser/:id', requireAuth, getOneUser)
users.get('/oneorder/:id', getOneOrder)
users.get('/onepayment/:id', requireAuth, getOnePayment)
users.get('/onechat/:id', requireAuth, getOneChat)
users.post('/updateuser/:id', upload.single('ProfilePicture'), updateUser)
users.post('/updateorder/:id', requireAuth, updateOrder)
users.post('/updatepayment/:id', requireAuth, updatePayment)
users.post('/updatechat/:id', requireAuth, updateChat)
users.post('/deleteuser/:id', requireAuth, deleteUser)
users.post('/deleteorder/:id', requireAuth, deleteOrder)
users.post('/deletepayment/:id', requireAuth, deletePayment)
users.post('/deletechat/:id', requireAuth, deleteChat)

module.exports = { 
    users, 
    auth
}