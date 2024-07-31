const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require("../models")
const Users = db.Users
passport.serializeUser((user, done)=>{
  process.nextTick(()=>{
    return done(null, {
      id: user.user_id,
      useremail: user.user_email
    })
  })
})
passport.deserializeUser((user, done)=>{
  process.nextTick(()=>{
    return done(null, user)
  })
})

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET = "secret"
    },
    (jwtPayload, done) => {
      return Users.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
)