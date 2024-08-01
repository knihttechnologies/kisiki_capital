const express = require("express")
const { Login } = require("../controllers/auth")
const { RefreshToken } = require("../middleware/RefreshToken")

const { 
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
    upload,
    //requireAdmin
 } = require("../controllers/admin")
const admin = express.Router()

//Admin routes
admin.post('/createusersmanually', createAdminManually )
admin.post('/createrolesmanually', createRolesManually)
admin.post('/registerusers', RegisterAdmin)
admin.post('/registerpayments', RegisterUserPayments)
admin.post('/registerorders',  RegisterUserOrders)
admin.post('/registerchat', RegisterUserChat)
admin.post('/registersubscriber', RegisterUserOrders)
admin.get('/userroles', getUserrole)
//all records
admin.get('/allusers', getAllUsers)
admin.get('/allpayments', getAllPayments)
admin.get('/allorders', getAllOrders)
admin.get('/allchats', getAllChats)
//single records
admin.get('/oneuser/:id', getOneUser)
admin.get('/oneorder/:id', getOneOrder)
admin.get('/onepayment/:id', getOnePayment)
admin.get('/onechat/:id', getOneChat)
admin.post('/updateuser/:id', updateUser)
admin.post('/updateorder/:id', updateOrder)
admin.post('/updatepayment/:id', updatePayment)
admin.post('/updatechat/:id', updateChat)
admin.post('/deleteuser/:id', deleteUser)
admin.post('/deleteorder/:id', deleteOrder)
admin.post('/deletepayment/:id', deletePayment)
admin.post('/deletechat/:id', deleteChat)

module.exports = {
    admin, 
}