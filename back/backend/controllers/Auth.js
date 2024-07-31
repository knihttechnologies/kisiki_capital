const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
// create Model
const Users = db.Users
const UserRole = db.UserRole
const {sessionMiddleware} = require('../middleware/sessionMiddleware')

// main work
//require Auth
const RequireAuth = (req, res, next) => {
  console.log(req.session)
  const {user} = req.session
  if(!user){
      return res.status(401).json({message: 'Unauthorized'})
  }
}
//Login controller
const Login = async (req, res, next) => {
  const secretKey = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
  }
  //get user inputs from the form
  const { userEmail, userPass } = req?.body;
  console.log(userEmail, userPass)
  const userSession = await Users.findOne({ 
    where: { user_email: userEmail},
    attributes: [
      'user_id',
      'user_title',
      'user_firstname',
      'user_lastname',
      'user_country',
      'user_email',
      'user_phone',
      'user_profilepicture',
      'user_password',
      'role_id',
      'isVerified_user',
      'user_refresh_token'
    ],include: [{
      model: UserRole,
      as: 'user_role'
  }],
  })
  //debugging
  // console.log(userSession)
  //check if the information exists.
  if (!userSession) return res.status(400).json({ message: "Information doesnt exist please sign up or put the correct information" })
  //check if the password is a match
  if (userPass === " ") return res.status(400).json({ message: "Password cannot be empty!" })
  const match = await bcrypt.compare(userPass, userSession?.user_password )
  if (!match) return res.status(400).json({ message: "Password does not match!" })
  //create the user access token
  //for debugging to check if the access token secret exists
  //console.log(secretKey.accessTokenSecret)
  
  if(secretKey.accessTokenSecret === " " || secretKey.accessTokenSecret === null || secretKey.accessTokenSecret === undefined)
    return console.log("accessTokenSecret is empty") && res.status(400).json({ message: "Missing secret!" })
  const accessToken = jwt.sign({userSession}, secretKey.accessTokenSecret,{
          expiresIn: '10440s'
  })
  //create the user access token
  //for debugging to check if the access token secret exists
  //console.log(secretKey.accessTokenSecret)
  if(secretKey.refreshTokenSecret === " " || secretKey.refreshTokenSecret === null || secretKey.refreshTokenSecret === undefined)
    return console.log("refreshTokenSecret is empty") && res.status(400).json({ message: "Missing secret!" })
  const refreshToken = jwt.sign({userSession}, secretKey.refreshTokenSecret,{
      expiresIn: '1d'
  })
  //Update authenticated admin with refresh token
  const updated = await Users.update({refresh_token: refreshToken},{
      where:{user_email: userSession?.user_email}
  })
  if(!updated) return res.status(400).send({msg: 'The refresh token failed to update'})
  req.session.logged_in = true
  req.session.user = userSession
  // await req.session.save((err)=> console.log(err))
  //next()
  return res.status(201).cookie('refreshToken', refreshToken,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json({ message: `The login was successful`, accessToken}) 
}
// const MaintainUserSession = async (req, res, next) => {
//   next()
//   // req.session.reload((err)=>{
//   //   console.log(req.session)
//   //   if(err) return console.log(err)
//   //   if(req.session.user){
//   //     res.status(200).json({valid: true, user: req.session.user})
//   //     return
//   //   }else{
//   //     res.status(401).json({valid: false})
//   //     return 
//   //   }
//   // })
  
// }

const Logout = async (req, res, next) => {
  req?.session?.destroy()
  return res.status(200).json({message: "You have been logged out"})
}

module.exports = {
  RequireAuth,
  Login,
  Logout 
}