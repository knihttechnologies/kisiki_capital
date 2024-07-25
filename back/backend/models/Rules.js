module.exports = (sequelize, DataTypes) => {
    const Rules = sequelize.define('rules',{
        rules_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        rules_title:{
            type: 'CHAR(100)'
        },
        rules_desc:{
            type: 'VARCHAR(200)'
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
    return Rules
}