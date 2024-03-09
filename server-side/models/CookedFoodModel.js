module.exports = (sequelize, DataTypes) => {
  const CookedFood = sequelize.define("CookedFood", {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cloudinary_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  });
  CookedFood.associate = function (models) {
    CookedFood.belongsTo(models.Recipe);
  };

  return CookedFood;
};
