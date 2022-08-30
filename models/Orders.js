module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_time_limit: {
      type: DataTypes.DATE,
      allowNull: false,
    },

  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true,
      },
    });
    Orders.belongsTo(models.Events, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return Orders;
};
