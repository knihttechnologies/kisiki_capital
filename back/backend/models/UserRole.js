module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('user_roles',{
        role_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        role_name:{
            type: 'CHAR(10)'
        },
        role_desc:{
            type: 'VARCHAR(100)'
        },
        date_registered:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        //alter: true,
        //force: true,
        freezeTableName:true,
        timestamps: false
    });
    return UserRole
}