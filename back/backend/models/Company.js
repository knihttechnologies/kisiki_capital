module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('company',{
        company_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        company_name:{
            type: 'VARCHAR(25)'
        },
        vat_number:{
            type: 'VARCHAR(25)'
        },
        businessregno:{
            type: 'VARCHAR(25)'
        },
        company_country:{
            type: 'VARCHAR(25)'
        },
        company_postalcode:{
            type: 'VARCHAR(10)'
        },
        company_city:{
            type: 'VARCHAR(10)'
        },
        company_address:{
            type: 'VARCHAR(10)'
        },
        company_phone:{
            type: 'VARCHAR(10)'
        },
        company_profilepicture:{
            type: 'VARCHAR(150)'
        },
        isVerified_company:{
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
    return Company
}