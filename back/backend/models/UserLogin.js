module.exports = (sequelize, DataTypes) => {
    const UserLogin = sequelize.define('user_login',{
        login_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        // user_id: {
        //     type: 'INT(10)',
        //     foreignKey: true
        // },
        user_email:{
            type: "VARCHAR(25)"
        },
        password:{
            type: 'VARCHAR(20)'
        },
        status:{
            type: 'TEXT(10)'
        },
        last_logins:{
            type: 'INT(20)'
        },
        session:{
            type: 'INT(1)'
        },
        date_registered:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        freezeTableName:true,
        timestamps: false
    });

    return UserLogin
}