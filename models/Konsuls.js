module.exports = (sequelize, DataTypes) => {
    const Konsuls =sequelize.define("Konsuls" , {
        nama:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal_lahir:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis_kelamin:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomor_wa:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isComplete:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        uuid:{
            type: DataTypes.STRING,
            allowNull: false,
        }
      
    })
    Konsuls.associate = (models) => {
        Konsuls.belongsTo(models.Users, {
          foreignKey: {
            allowNull: true,
          },
        });
    }

    return Konsuls
}

