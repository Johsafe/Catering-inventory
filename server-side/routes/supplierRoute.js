const express = require("express");
const vendorRouter = express.Router();
const { sendWelcomeEmail } = require("../services/vendorEmail.js");
const { Supplier } = require("../models");

//format phone number
const formatKenyanPhoneNumber = (phoneNumber, res) => {
  // Remove any non-digit
  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (!/^\d{10}$/.test(phoneNumber)) {
    res.status(400).json({
      error: "Invalid mobile number format. Please enter a 10-digit number.",
    });
    return;
  } else {
    // Remove the "0" and replace it with (+254)
    phoneNumber = "254" + phoneNumber.substr(1);
    return phoneNumber;
  }
};

//create a new vendor
vendorRouter.post("/create", async (req, res) => {
  try {
    const { name, company, email, phone, address } = req.body;

    if (!name || !company || !email || !phone || !address) {
        return res.status(400).json({ message: "All fields are required." });
      }
    //confirm isvendor  exists in the system
    const vendorExists = await Supplier.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (vendorExists)
      return res
        .status(409)
        .send({ message: "vendor with given email already Exist!" });
    //Format mobile number to kenyan
    const formattedPhoneNumber = formatKenyanPhoneNumber(phone, res);

    // If an error occurred in the formatting function, it has already sent the response
    if (!formattedPhoneNumber) {
      return;
    }
    const vendor = await Supplier.create({
      name,
      company,
      email,
      address,
      phone: formattedPhoneNumber,
    });
    await sendWelcomeEmail(vendor.email, vendor.name);

    res.status(201).json({
      message: "Signup successful!",
      vendor: vendor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Signup failed. Please check your input and try again.",
      error: error.message,
    });
  }
});

// Get all vendors route
vendorRouter.get("/vendors", async (req, res) => {
  try {
    const vendors = await Supplier.findAll();

    res.json(vendors);
  } catch (error) {
    console.error("Get all vendors error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//Update vendor info
vendorRouter.put("/vendor/:id", async (req, res) => {
  try {
    const { name, company, email, phone, address } = req.body;
    const vendor = await Supplier.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    // Update product details
    vendor.name = name;
    vendor.company = company;
    vendor.email = email;
    vendor.phone = phone;
    vendor.address = address;

    await vendor.save();

    res.json({
      message: "Vendor updated successfully",
      updatedVendor: vendor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating product",
      error: err.message,
    });
  }
});

//delete vendor by id
vendorRouter.delete("/vendor/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    // Find the vendor by ID
    const vendor = await Supplier.findByPk(vendorId);

    // Check if the vendor exists
    if (!vendor) {
      return res.status(404).json({
        error: "vendor not found.",
      });
    }

    // Delete the vendor
    await vendor.destroy();

    res.json({
      message: "vendor deleted successfully.",
    });
  } catch (error) {
    console.error("Delete vendor error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = vendorRouter;
