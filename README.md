# kisiki_capital
### Built using [React Frontend library (https://react.dev/)] and Express Server On Node js
Download the files and or clone the repo
Front - npm run dev (using vite)
Back - npm start (with express js)

# Back End
# User api endpoint = /api/users
# Path to routes kisiki_capital\back\backend\routes\channel

The statement users.post('/createusersmanually', createUsersManually) is a route definition in a Node.js application, typically using the Express framework. Here's a breakdown of what it does:

users / admin: This is an instance of an Express Router. It allows you to define routes that can be grouped together.

.post(): This method is used to define a route that responds to HTTP POST requests. It indicates that this route will handle requests sent to the specified path using the POST method.

'/createusersmanually': This is the URL path for the route. When a POST request is made to this path, the associated handler function will be executed.

createUsersManually: This is the handler function that will be called when a POST request is made to the /createusersmanually endpoint. This function typically contains the logic to handle the request, such as processing input data, interacting with a database, and sending a response back to the client.

The above statements attempt to explain the route definitions that were used.

# Incase of test environment
    users.post('/createusersmanually', createUsersManually)
    users.post('/createrolesmanually', createRolesManually)

### routes for the user dashboard
    users.post('/registerusers', Register)
    users.post('/registerorders',  RegisterOrders)
    users.post('/registerpayments', RegisterPayments)
    users.post('/verifyemail',  VerifyEmail)
    users.post('/registerchat', RegisterChat)
    users.post('/registersubscriber', RegisterOrders)
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
# Admin api endpoint = /api/admin
# Path to routes kisiki_capital\back\backend\routes\admin
# Incase of test environment
    admin.post('/createusersmanually', requireAdmin, createAdminManually )
    admin.post('/createrolesmanually', createRolesManually)
### routes for the admin dashboard
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