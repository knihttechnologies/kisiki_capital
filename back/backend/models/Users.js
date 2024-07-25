module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users',{
        user_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        user_title:{
            type: 'CHAR(10)'
        },
        user_email:{
            type: 'VARCHAR(70)'
        },
        user_phone:{
            type: 'VARCHAR(10)'
        },
        user_firstname:{
            type: 'VARCHAR(25)'
        },
        user_lastname:{
            type: 'VARCHAR(25)'
        },
        user_lang:{
            type: 'VARCHAR(20)'
        },
        user_password:{
            type: 'VARCHAR(250)'
        },
        user_country:{
            type: 'VARCHAR(25)'
        },
        user_address:{
            type: 'VARCHAR(10)'
        },
        user_city:{
            type: 'VARCHAR(10)'
        },
        user_zip:{
            type: 'VARCHAR(10)'
        },
        user_profilepicture:{
            type: 'VARCHAR(150)'
        },
        user_coupon:{
            type: 'VARCHAR(250)'
        },
        isVerified_user:{
            type: 'VARCHAR(3)'
        },
        user_refresh_token:{
            type: 'VARCHAR(150)'
        } 
    
    },{
        //persit with above given table name
        freezeTableName: true,
        //alter: true,
        //by default, sequelize creates two timestamped variables (created at, updated at) to track new record entries.
        //if you want to define your own you can turn the defaults off like this.
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleteStatus'
        //alter: true
    });
    return Users
}