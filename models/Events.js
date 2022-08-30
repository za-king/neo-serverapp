module.exports = (sequelize, DataTypes) => {
    const Events =sequelize.define("Events" , {
        event_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        started_at:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        finish_at:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        speakers:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        speakers_job:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        speakers_company:{
            type: DataTypes.STRING,
            allowNull: false,
        },  
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        disable:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        order_limit:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    Events.associate = (models) =>{
        Events.hasMany(models.Orders,{
            onDelete:"cascade",
        });
    };

    
   
    return Events
}

