module.exports = (sequelize, DataTypes) => {
    const LiveSupport = sequelize.define('livesupport',{
        query_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        query_subject:{
            type: 'VARCHAR(20)'
        },
        query_message:{
            type: 'VARCHAR(200)'
        },
        query_reply:{
            type: 'VARCHAR(200)'
        },
        query_status:{
            type: 'CHAR(20)'
        },
        isVerified_chat:{
            type: 'VARCHAR(3)'
        },
    
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
    return LiveSupport
}