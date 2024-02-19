const express = require("express");
const UserModel = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = express.Router();

//Create new User

authRouter.post("/create", async (req, res) => {
  const { username, password, roleId } = req.body;
  try {
    //confirm is user exists in the system
    const userExists = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      roleId,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Signup failed. Please check your input and try again.",
      error: error.message,
    });
  }
});

// login with email
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Both email and password are required for login.",
    });
  }

  try {
    const user = await Authenticate.findOne({
      where: {
        email: email,
      },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials. Please check your email.",
      });
    }

    // Verify the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials. Please check your password.",
      });
    }
    if (user) {
      res.status(201).json({
        message: "Login successful!",
        id: user.id,
        fname: user.fname,
        email: user.email,
        // token: generateJwtToken(user),
      });
    }
    // res.json({
    //   message: "Login successful!",
    //   user,
    // });
  } catch (error) {
    res.status(500).send({
      message: "Signin failed. Please check your input and try again.",
      error: error.message,
    });
  }
});

// Get all users
authRouter.get("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user by ID
authRouter.get("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user
authRouter.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { username, password, roleId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ username, password: hashedPassword, roleId });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user
authRouter.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = authRouter;
