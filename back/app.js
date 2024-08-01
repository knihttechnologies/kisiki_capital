const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {users, auth}= require('./backend/routes/channel')
const {admin} = require('./backend/routes/admin')
const { notFound, errorHandler, badRequest } = require("./backend/middleware/exceptions")
const compression = require("compression")
const config = require("./config")
const { hostname, port, allowedDomains, remote_client_app } = config;
require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware')
//for the session
const session = require('express-session')
//stores
const MemoryStore = require('memorystore')(session)
//Multer is a Node.js middleware that we use for handling requests from multipart/form-data, 
//and specifically for handling file uploads.
//const multer = require('multer')
const memorystore = new MemoryStore({
  checkPeriod: 86400000 //prune expired entries every 24 hrs
})
// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
  origin: ['https://pay.google.com/gp/p/js/pay.js', 'http://localhost:60000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept'
  ],
  credentials: true,
  maxAge: 600 // 10 minutes
};


//start the app
const app = express();
//middleware
app.use(helmet());
// app.use(cors());
app.use(cors({ 
  origin: 'http://localhost:60000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: memorystore,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE)
  }
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/api/userprofilepicuploads', express.static(path.join(__dirname, 'Images/Usersimg')))
app.use('/api/auth', auth)
app.use('/api/admin', admin)
app.use('/api/users', users)
app.use(morgan("dev"));
app.use(compression)
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//our error pages
app.use(notFound)
app.use(badRequest)
app.use(errorHandler)
app.listen(port, (
    console.log(`Am listening on port: ${port}`)
));

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
// app.use((req, res, next) => {
//   if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//       next();
//   } else {
//     //   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     //   res.header('Expires', '-1');
//     //   res.header('Pragma', 'no-cache');
//       res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   }
// });
// app.use((req, res, next)=>{
//   console.log(req.session)
//   next()
// })
//static files
//app.use(express.static(path.join(__dirname, 'dist')));
// routes
//app.use('/Images', express.static('./Images'))
//catch all routes to serve the home page of the site
// app.use('*', function (request, response) {
//   response.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });