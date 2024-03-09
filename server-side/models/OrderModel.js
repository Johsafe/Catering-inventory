module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      order_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer:{
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
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIn: [["Mpesa", "Cash","Cheque"]],
          },
      },
    });
  
    Order.associate = function (models) {
      Order.hasMany(models.OrderItems);
    };
  
    return Order;
  };
  