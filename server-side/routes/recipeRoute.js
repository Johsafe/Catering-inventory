const express = require("express");
const recipeRouter = express.Router();
const { Recipe, Products, Ingredients } = require("../models");
const { Op } = require("sequelize");

const generateRecipeCode = () => {
  const characters = "0123456789";
  let recipeCode = "";

  // Generate seven random alphanumeric characters
  for (let i = 0; i < 5; i++) {
    recipeCode += characters[Math.floor(Math.random() * characters.length)];
  }
  recipeCode += Date.now().toString().slice(-5);

  return `R-${recipeCode}`;
};

recipeRouter.post("/create", async (req, res) => {
  try {
    const { title, description, products } = req.body;
    const recipe_id = generateRecipeCode();
    const newRecipe = await Recipe.create({
      recipe_id,
      title,
      description,
    });

    // Fetch product details for each product in the order
    const productsInOrder = await Products.findAll({
      where: {
        id: {
          [Op.in]: products.map((product) => product.pdct_id),
        },
      },
    });

    // Create order items for each product in the order
    const recipeItems = await Promise.all(
      productsInOrder.map(async (product, index) => {
        const { pdct_id, quantity } = products[index];

        // Check if the product exists
        if (!product) {
          throw new Error(`Product with ID ${pdct_id} not found`);
        }

        // Create an order item for the product
        return Ingredients.create({
          recipe_id: newRecipe.recipe_id,
          pdct_id,
          quantity,
          price: product.price,
          product_name: product.title,
          product_image: product.image,
        });
      })
    );
    await newRecipe.save();

    res.json({
      message: "recipe created successfully",
      newRecipe,
      recipeItems,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error creating recipe",
      error: err.message,
    });
  }
});

//update stock
recipeRouter.post("/updatestock", async (req, res) => {
  try {
    console.log("working")
    const { recipeId } = req.body;
    // Fetch all ingredients for the specified recipe
    const ingredients = await Ingredients.findAll({
      where: {
        recipe_id: recipeId,
      },
    });
    // Update stock levels for each ingredient
    await Promise.all(
      ingredients.map(async (ingredient) => {
        const product = await Products.findByPk(ingredient.pdct_id);
        if (!product) {
          throw new Error(`Product with ID ${ingredient.pdct_id} not found`);
        }
        if (product.inStock < ingredient.quantity) {
          throw new Error(
            `Insufficient stock for product with ID ${ingredient.pdct_id}`
          );
        }

        // Subtract ingredient quantity from product stock
        product.inStock -= ingredient.quantity;
        await product.save();
      })
    );

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating product stock",
      error: err.message,
    });
  }
});

module.exports = recipeRouter;
