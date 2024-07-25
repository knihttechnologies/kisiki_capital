const dbConfig = require('../utils/dbConfig');
// Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server, Amazon Redshift and Snowflake’s Data Cloud. 
//It features solid transaction support, relations, eager and lazy loading, read replication and more.
// Sequelize follows Semantic Versioning and supports Node v10 and above.
//require sequlise
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(

    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)
sequelize.authenticate()
.then((res) => {
    res.status(200).json({messages: `The sever is connected ${res}`})
    console.log('connected...')
})
.catch(err => {
    console.log('Error'+ err)
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync({ force: false})
.then(() => {
    console.log('yes sync is done!')
})
.catch((err) =>{
    console.log('an error' + err)
})
//IMPORTING MODELS
db.Admin = require('./Admin')(sequelize, DataTypes)
db.Users = require('./Users')(sequelize, DataTypes)
db.Company = require('./Company')(sequelize, DataTypes)
db.UserRole = require('./UserRole')(sequelize, DataTypes)
db.UserLogin = require('./UserLogin')(sequelize, DataTypes)
db.UserAuth = require('./UserAuth')(sequelize, DataTypes)
db.Rules = require('./Rules')(sequelize, DataTypes)
db.Payment = require('./Payment')(sequelize, DataTypes)
db.LiveSupport = require('./LiveSupport')(sequelize, DataTypes)
db.Orders = require('./Orders')(sequelize, DataTypes)

//BEGIN RELATIONSHIPS
// Relationships for admin and user role
db.UserRole.hasMany(db.Admin, {
    foreignKey: 'role_id'
})
db.Admin.belongsTo(db.UserRole, {
    foreignKey: 'role_id'
})
// Relationships for user and user role
db.UserRole.hasMany(db.Users, {
    foreignKey: 'role_id'
})
db.Users.belongsTo(db.UserRole, {
    foreignKey: 'role_id'
})
// //relationships for user and login
db.Users.hasMany(db.UserLogin, {
    foreignKey: 'user_id'
})
db.UserLogin.belongsTo(db.Users, {
    foreignKey: 'user_id'
})
//relationship for auth and login
db.UserLogin.hasMany(db.UserAuth, {
    foreignKey: 'login_id'
})
db.UserAuth.belongsTo(db.UserLogin, {
    foreignKey: 'login_id'
})
//relationship for the user and payments
db.Users.hasMany(db.Payment, {
    foreignKey: 'user_id'
})
db.Payment.belongsTo(db.Users, {
    foreignKey: 'user_id'
})
//relationship for the user and orders
db.Users.hasMany(db.Orders, {
    foreignKey: 'user_id'
})
db.Orders.belongsTo(db.Users, {
    foreignKey: 'user_id'
})
//relationship for the orders and payments
db.Orders.hasMany(db.Payment, {
    foreignKey: 'order_id'
})
db.Payment.belongsTo(db.Orders, {
    foreignKey: 'order_id'
})
//relationship for the live support and users
db.Users.hasMany(db.LiveSupport, {
    foreignKey: 'user_id'
})
db.LiveSupport.belongsTo(db.Users, {
    foreignKey: 'user_id'
})
//relation for company and users
db.Users.hasMany(db.Company, {
    foreignKey: 'user_id'
})
db.Company.belongsTo(db.Users, {
    foreignKey: 'user_id'
})
//relation for company and orders
db.Company.hasMany(db.Orders, {
    foreignKey: 'company_id'
})
db.Orders.belongsTo(db.Company, {
    foreignKey: 'company_id'
})
//relation for company and payments
db.Company.hasMany(db.Payment, {
    foreignKey: 'company_id'
})
db.Payment.belongsTo(db.Company, {
    foreignKey: 'company_id'
})
//relation for company and live support
db.Company.hasMany(db.LiveSupport, {
    foreignKey: 'company_id'
})
db.LiveSupport.belongsTo(db.Company, {
    foreignKey: 'company_id'
})
module.exports = db