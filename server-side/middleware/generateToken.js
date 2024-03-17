
const jwt = require("jsonwebtoken");

//generate jwtToken
module.exports.generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
