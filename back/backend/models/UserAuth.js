module.exports = (sequelize, DataTypes) => {
    const UserAuth = sequelize.define('user_auth',{
        user_auth_id: {
            type: 'INT(10)',
            autoIncrement: true,
            primaryKey: true
        },
        // login_id: {
        //     type: 'INT(10)',
        //     foreignKey: true
        // },
        question_one:{
            type: "VARCHAR(100)"
        },
        answer_one:{
            type: "VARCHAR(100)"
        },
        question_two:{
            type: "VARCHAR(100)"
        },
        answer_two:{
            type: "VARCHAR(100)"
        },
        question_three:{
            type: "VARCHAR(100)"
        },
        answer_three:{
            type: "VARCHAR(100)"
        },
        verify_code:{
            type: "VARCHAR(100)"
        },
        date_time_generated:{
            type: "VARCHAR(100)"
        },
        expiry_date_time:{
            type: "VARCHAR(100)"
        },
        date_registered:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        freezeTableName:true,
        timestamps: false
    });

    return UserAuth
}