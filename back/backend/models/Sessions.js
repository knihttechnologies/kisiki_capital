module.exports = (sequelize, DataTypes) => {
    const Sessions = sequelize.define('sessions',{
        sid: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        expires:{
            type: 'DATE'
        },
        data:{
            type: 'TEXT(250)'
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
    return Sessions
}