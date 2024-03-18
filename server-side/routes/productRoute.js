const express = require("express");
const productRouter = express.Router();
const { Products } = require("../models");
const multerUpload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");
const { Supplier } = require("../models");
const { Op } = require("sequelize");

//create a new product
productRouter.post(
  "/create",
  multerUpload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        expire,
        cost,
        supplierId,
        status,
        category,
        batch,
        description,
        inStock,
      } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "catering",
      });
      // console.log(result)

      // Extract the image URL from the Cloudinary response
      // const imageUrl = result.secure_url;
      const imageUrl = result.secure_url;
      const imageId = result.public_id;
      // Check if the supplier exists
      const supplier = await Supplier.findByPk(supplierId);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      // Create a new product with the image URL
      const newProduct = await Products.create({
        title,
        expire,
        cost,
        supplierId: supplierId,
        status,
        category,
        batch,
        description,
        inStock,
        image: imageUrl,
        cloudinary_id: imageId,
      });

      res.json({
        message: "Product added successfully",
        newProduct,
        imagefile: req.file,
      });
    } catch (err) {
      // console.error(err);
      res.status(500).send({
        message: "Error adding product",
        error: err.message,
      });
    }
  }
);

// GET route to get all products with their supplier details
productRouter.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: Supplier,
          attributes: ["id", "name","company"],
        },
      ],
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get notification if the product quantity less 10
productRouter.get('/product/low-quantity', async (req, res) => {
  try {
    const lowQuantityProducts = await Products.findAll({
      where: {
        inStock: {
          [Op.lt]: 20 // Example threshold for low quantity
        }
      }
    });
    res.json(lowQuantityProducts);
  } catch (error) {
    console.error('Error fetching low quantity products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get a product by id
productRouter.get("/product/:id", async (req, res) => {
  const product = await Products.findByPk(req.params.id, {
    include: [
      {
        model: Supplier,
        attributes: ["id", "name","company"], // Specify which supplier attributes to include
      },
    ],
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//delete product by id
productRouter.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Check if the product exists
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Extract the public ID from the product's image URL
    const imageId = product.cloudinary_id;
    console.log(imageId)

    // Delete the image from Cloudinary
    const deletionResult = await cloudinary.uploader.destroy(imageId);

    // Check if the image was successfully deleted from Cloudinary
    if (deletionResult.result === "ok") {
      // Delete the product from the database
      await Products.destroy({ where: { id: productId } });

      res.json({ message: "Product and image deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting image from Cloudinary" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error deleting product",
      error: error.message,
    });
  }
});

//update product + image
productRouter.put(
  "/product/:productId",
  multerUpload.single("image"),
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const {
        title,
        expire,
        cost,
        supplierId,
        status,
        category,
        batch,
        description,
        inStock,
      } = req.body;

      // Find the existing product in the database
      const existingProduct = await Products.findByPk(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product details
      existingProduct.title = title;
      existingProduct.expire = expire;
      existingProduct.cost = cost;
      existingProduct.supplierId = supplierId;
      existingProduct.description = description;
      existingProduct.category = category;
      existingProduct.status = status;
      existingProduct.batch = batch;
      existingProduct.inStock = inStock;

      // If a new image is uploaded, update the Cloudinary image
      if (req.file) {
        // Delete the existing image from Cloudinary
        await cloudinary.uploader.destroy(existingProduct.cloudinary_id);

        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "catering",
        });

        // Extract the new image URL from the Cloudinary response
        // existingProduct.image = result.secure_url;
        existingProduct.image = result.secure_url;
        existingProduct.cloudinary_id = result.public_id;
      }

      // Save the updated product to the database
      await existingProduct.save();

      res.json({
        message: "Product updated successfully",
        updatedProduct: existingProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error updating product",
        error: err.message,
      });
    }
  }
);

//update product stock
productRouter.patch("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { newStock } = req.body;

    // Validate that productId is a positive integer
    if (!productId || isNaN(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    // Validate that newStock is a non-negative integer
    if (isNaN(newStock) || newStock < 0) {
      return res.status(400).json({ message: "Invalid newStock value" });
    }

    // Update the stock of the product
    const [affectedRows] = await Products.update(
      { inStock: newStock },
      { where: { id: productId } }
    );

    // Check if the product was found and updated
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Products.findByPk(productId);
    res.json(updatedProduct);
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Error updating product stock",
      error: err.message,
    });
  }
});

module.exports = productRouter;
