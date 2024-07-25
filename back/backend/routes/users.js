const express = require("express")
//const { createInstManually, createInstruction, getAllInstructions, uploadInst } = require("../controllers/instructions")

const { requireAuth, createUsersManually, createRolesManually, Register, getUserrole, getAllUsers, getOneUser, updateUser, deleteUser, upload, RegisterOrders } = require("../controllers/users")

const company = express.Router()
const users = express.Router()

// // Instructions
// company.post('/createinstmanually', createInstManually )
// company.post('/registerinst', upload, createInstruction)
// company.get('/allinstructions', getAllInstructions)

// Teams
users.post('/createusersmanually', createUsersManually )
users.post('/createrolesmanually', createRolesManually)
users.post('/registerusers',  Register)
users.post('/registersubscriber', requireAuth,  RegisterOrders)
users.post('/updateuser', requireAuth, updateUser)
users.post('/deleteuser', requireAuth, deleteUser)
users.get('/userroles',requireAuth, getUserrole)
users.get('/allusers', requireAuth, getAllUsers)
users.get('/oneuser', requireAuth, getOneUser)

// advertisers
//advertisers.post('/view-a-user', getOneUser)

module.exports = {
    users
}
