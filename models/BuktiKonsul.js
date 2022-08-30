module.exports = (sequelize, DataTypes) =>{
    const BuktiKonsul = sequelize.define("BuktiKonsul",{
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        kode_order:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_rekening_pengirim:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_rekening_pengirim:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_rekening_penerima:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_rekening_penerima:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        
    })

    return BuktiKonsul

}