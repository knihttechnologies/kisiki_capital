module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin',{
        admin_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        admin_title:{
            type: 'CHAR(10)'
        },
        admin_email:{
            type: 'VARCHAR(25)'
        },
        admin_phone:{
            type: 'VARCHAR(10)'
        },
        admin_firstname:{
            type: 'VARCHAR(25)'
        },
        admin_lastname:{
            type: 'VARCHAR(25)'
        },
        admin_password:{
            type: 'VARCHAR(250)'
        },
        isVerified_admin:{
            type: 'VARCHAR(3)'
        },
        admin_refresh_token:{
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
    return Admin
}