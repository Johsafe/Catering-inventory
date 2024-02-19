module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
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
    });
    return User;
  };
  