const express = require("express");
const { User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const { generateJwtToken } = require("../middleware/generateToken");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");

//Create new User

authRouter.post("/create", async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    //confirm is user exists in the system
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
      email
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Signup failed. Please check your input and try again.",
      error: error.message,
    });
  }
});

// // login with email
// authRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // if (!email || !password) {
//   //   return res.status(400).json({
//   //     error: "Both email and password are required for login.",
//   //   });
//   // }

//   try {
//     const user = await User.findOne({
//       where: {
//         email: email,
//       },
//     });

//     // Check if the user exists
//     if (!user) {
//       return res.status(401).json({
//         error: "Invalid credentials. Please check your email.",
//       });
//     }

//     // Verify the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         error: "Invalid credentials. Please check your password.",
//       });
//     }
//     // if (user) {
//     //   res.status(201).json({
//     //     message: "Login successful!",
//     //     id: user.id,
//     //     username: user.username,
//     //     email: user.email,
//     //     // token: generateJwtToken(user),
//     //   });
//     // }
//     res.json({
//       message: "Login successful!",
//       user,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Signin failed. Please check your input and try again.",
//       error: error.message,
//     });
//   }
// });

//login roles
// Combine both login functionalities into a single route handler
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verify the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Redirect user based on role
    let redirectURL;
    switch (user.role) {
      case 'Admin':
        redirectURL = '/admin-dashboard';
        break;
      case 'Cashier':
        redirectURL = '/cashier-dashboard';
        break;
      case 'Chef':
        redirectURL = '/chef-dashboard';
        break;
      default:
        redirectURL = '/';
        break;
    }
    // res.json({ message: 'Login successful!',  });
    if(user){
      res.status(201).json({
      message: "Login successful!",
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateJwtToken(user),
      redirectURL

      })
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all users
authRouter.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Get user by ID
// authRouter.get("/:id", authMiddleware(["admin"]), async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Update user
// authRouter.put("/:id", authMiddleware(["admin"]), async (req, res) => {
//   const { id } = req.params;
//   const { username, password, roleId } = req.body;

//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await user.update({ username, password: hashedPassword, roleId });
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Delete user
// authRouter.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     await user.destroy();
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = authRouter;
