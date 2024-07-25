module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define('package',{
        package_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        package_title:{
            type: 'CHAR(25)'
        },
        package_price:{
            type: 'INT(25)'
        },
        package_platform:{
            type: 'VARCHAR(15)'
        },
        package_type:{
            type: 'VARCHAR(15)'
        },
        isVerified_package:{
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
    return Package
}