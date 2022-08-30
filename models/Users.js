module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users",{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Konsuls,{
            onDelete:"cascade",
        });

        Users.hasMany(models.Orders,{
            onDelete:"cascade",
        });
    };
    

    return Users

}