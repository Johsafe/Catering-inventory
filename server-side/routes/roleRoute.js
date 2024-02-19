// routes/role.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Rolemodel = require("../models/Rolemodel");
const roleRouter = express.Router();

// Create a new role
roleRouter.post("/", authMiddleware(["admin"]), async (req, res) => {
  const { name } = req.body;

  try {
    const role = await Rolemodel.create({ name });
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all roles
roleRouter.get("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get role by ID
roleRouter.get("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update role
roleRouter.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    await role.update({ name });
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete role
roleRouter.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = roleRouter;
