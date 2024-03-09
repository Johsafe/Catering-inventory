module.exports = (sequelize, DataTypes) => {
    const OrderItems = sequelize.define("OrderItems", {
      order_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OrderId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      CookedFoodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      food_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      food_image:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });
  
    OrderItems.associate = function (models) {
      // OrderItems.belongsTo(models.Order,{ foreignKey: 'OrderId' });
      OrderItems.belongsTo(models.Order);
      OrderItems.belongsTo(models.CookedFood);
    };
  
    return OrderItems;
  };
  