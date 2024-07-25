const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
// require("./backend/utils/passport")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {users, auth}= require('./backend/routes/channel')
const {admin} = require('./backend/routes/admin')
const {payments} = require('./backend/routes/trans')
//const port = process.env.PORT //|| 4000
const { notFound, errorHandler, badRequest } = require("./backend/middleware/exceptions")
const compression = require("compression")
const MemoryStore = require('memorystore')(session)
const config = require("./config")
const { hostname, port, allowedDomains, remote_client_app } = config;
require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware')
//Multer is a Node.js middleware that we use for handling requests from multipart/form-data, 
//and specifically for handling file uploads.
//const multer = require('multer')

//start the app
const app = express();
// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
  origin: ['https://pay.google.com/gp/p/js/pay.js'],
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
//middleware
// app.use('/api',
//   createProxyMiddleware({
//     target: 'http://localhost:60000',
//     changeOrigin: true
//   })
// )
app.use(helmet({   
  contentSecurityPolicy: {  
    useDefaults: true, 
    directives: { 
       'script-src': ["'self'", "https://pay.google.com/gp/p/js/pay.js", "https://pay.google.com/"], 
       'connect-src': ["'self'", "https://pay.google.com/gp/p/js/pay.js", "https://pay.google.com/"], 
       'frame-src': ["'self'", "https://pay.google.com/gp/p/js/pay.js", "https://pay.google.com/"], 
       'script-src-elem': ["'self'", "https://pay.google.com/gp/p/js/pay.js", "https://pay.google.com/"] 
    }, 
  }
}))
// app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE)
  }
}))
// app.use((req, res, next)=>{
//   console.log(req.session)
//   next()
// })
//static files
app.use(express.static(path.join(__dirname, 'dist')));
// routes
app.use('/Images', express.static('./Images'))
app.use('/api/userprofilepicuploads', express.static(path.join(__dirname, 'Images/Usersimg')))
app.use('/api/auth', auth)
app.use('/api/admin', admin)
app.use('/api/users', users)
app.use('/api/payments', payments)

//catch all routes to serve the home page of the site
app.use('*', function (request, response) {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(compression)
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//our error pages
app.use(notFound)
app.use(badRequest)
app.use(errorHandler)
app.listen(port, (
    console.log(` port: ${port}`)
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