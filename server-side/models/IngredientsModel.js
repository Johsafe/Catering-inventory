module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define("Ingredients", {
    recipe_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdct_id: {
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
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });

  Ingredients.associate = function (models) {
    Ingredients.belongsTo(models.Recipe);
    Ingredients.belongsTo(models.Products);
  };

  return Ingredients;
};
