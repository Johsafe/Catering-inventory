module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          validator: function (emailUsed) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailUsed);
          },
          message: (props) => `${props.value} is not a valid email`,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isIn: [["Admin", "Cashier","Chef"]],
          },
      },
    });
    return User;
  };
  