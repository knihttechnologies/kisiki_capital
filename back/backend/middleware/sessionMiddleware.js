const session = require('express-session')
const db = require('../models')
//stores
const MemoryStore = require('memorystore')(session)
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const extendDefaultFields = (defaults, session) => {
    return {
        data: defaults.data,
        expires:defaults.expires,
        user_id: session.userid
    }
}
const store = new SequelizeStore({
    db: db.sequelize,
    table: "sessions",
    extendDefaultFields: extendDefaultFields
})

const memorystore = new MemoryStore({
    checkPeriod: 86400000 //prune expired entries every 24 hrs
})

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: memorystore,
    saveUninitialized: true,
    resave: false,
    cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
})

module.exports = {
    sessionMiddleware
}