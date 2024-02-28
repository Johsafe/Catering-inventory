module.exports = (sequelize, DataTypes) => {
  const CookedFood = sequelize.define("CookedFood", {
    recipe_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  CookedFood.associate = function (models) {
    CookedFood.belongsTo(models.Recipe);
  };

  return CookedFood;
};
