module.exports = (sequelize, DataTypes) =>{
    const LockRegis = sequelize.define("LockRegis",{
        
        disable:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        
    })

    return LockRegis

}