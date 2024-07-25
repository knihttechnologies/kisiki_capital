module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('payment',{
        payment_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        payment_method:{
            type: 'VARCHAR(50)'
        },
        amount_paid:{
            type: 'INT(50)'
        },
        payment_status:{
            type: 'CHAR(15)'
        },
        isVerified_payer:{
            type: 'VARCHAR(3)'
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
    return Payment
}