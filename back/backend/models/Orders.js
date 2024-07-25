module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('orders',{
        order_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        entity_type:{
            type: 'VARCHAR(10)'
        },
        package_title:{
            type: 'VARCHAR(20)'
        },
        package_price:{
            type: 'VARCHAR(20)'
        },
        trading_currency:{
            type: 'VARCHAR(10)'
        },
        account_balance:{
            type: 'INT(10)'
        },
        platform:{
            type: 'VARCHAR(20)'
        },
        type:{
            type: 'VARCHAR(20)'
        },
        discount:{
            type: 'INT(3)'
        },
        status:{
            type: 'CHAR(15)'
        },
        checked_one:{
            type: 'INT(2)'
        },
        checked_two:{
            type: 'INT(2)'
        },
        isVerified_order:{
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
    return Orders
}