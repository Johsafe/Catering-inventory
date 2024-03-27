module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    order_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Paid",
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["Mpesa", "Cash", "Cheque"]],
      },
    },
  });

  Order.associate = function (models) {
    Order.hasMany(models.OrderItems);
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Order;
};
