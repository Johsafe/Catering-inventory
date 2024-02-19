module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Role;
};
