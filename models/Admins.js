module.exports = (sequelize, DataTypes) =>{
    const Admins = sequelize.define("Admins",{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Admins

}