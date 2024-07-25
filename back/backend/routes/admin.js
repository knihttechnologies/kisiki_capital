const express = require("express")
const { Login } = require("../controllers/Auth")
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
    requireAdmin
 } = require("../controllers/admin")
const admin = express.Router()

//Admin routes
admin.post('/createusersmanually', requireAdmin, createAdminManually )
admin.post('/createrolesmanually', createRolesManually)
admin.post('/registerusers', RegisterAdmin)
admin.post('/registerpayments', requireAdmin, RegisterUserPayments)
admin.post('/registerorders',requireAdmin,  RegisterUserOrders)
admin.post('/registerchat', requireAdmin, RegisterUserChat)
admin.post('/registersubscriber', requireAdmin, RegisterUserOrders)
admin.get('/userroles', requireAdmin, getUserrole)
//all records
admin.get('/allusers', getAllUsers)
admin.get('/allpayments', getAllPayments)
admin.get('/allorders', getAllOrders)
admin.get('/allchats', getAllChats)
//single records
admin.get('/oneuser/:id', requireAdmin, getOneUser)
admin.get('/oneorder/:id', requireAdmin, getOneOrder)
admin.get('/onepayment/:id', requireAdmin, getOnePayment)
admin.get('/onechat/:id', requireAdmin, getOneChat)
admin.post('/updateuser/:id', requireAdmin, updateUser)
admin.post('/updateorder/:id', requireAdmin, updateOrder)
admin.post('/updatepayment/:id', requireAdmin, updatePayment)
admin.post('/updatechat/:id', requireAdmin, updateChat)
admin.post('/deleteuser/:id', requireAdmin, deleteUser)
admin.post('/deleteorder/:id', requireAdmin, deleteOrder)
admin.post('/deletepayment/:id', requireAdmin, deletePayment)
admin.post('/deletechat/:id', requireAdmin, deleteChat)

module.exports = {
    admin, 
}