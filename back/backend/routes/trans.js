const express = require("express")
const { RefreshToken } = require("../middleware/RefreshToken")
const { PesaPalButton } = require("../controllers/monimod")
// const admin = express.Router()
const payments = express.Router()

//Auth
payments.post('/pesapalpay', PesaPalButton)

module.exports = { 
    payments
}