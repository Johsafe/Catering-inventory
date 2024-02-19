module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    recipe_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdby: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Recipe.associate = function (models) {
    Recipe.hasMany(models.Ingredients);
  };

  return Recipe;
};
