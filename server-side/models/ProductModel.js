module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Products.associate = function (models) {
    Products.hasMany(models.Ingredients);
    Products.belongsTo(models.Supplier);
  };
  return Products;
};
