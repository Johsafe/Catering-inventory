const express = require("express");
const recipeRouter = express.Router();
const { Recipe, Products, Ingredients, CookedFood } = require("../models");
const { Op, Sequelize } = require("sequelize");
const multerUpload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");
const { sendNotification } = require("../services/notifications");
// const { sendNotification } = require("../services/notification");

//-----------------------------RECIPE ROUTE-----------------------

recipeRouter.post("/create", async (req, res) => {
  try {
    const { title, description, products } = req.body;
    // const recipe_id = generateRecipeCode();
    const newRecipe = await Recipe.create({
      // recipe_id,
      title,
      description,
    });

    // Fetch product details for each product in the order
    const productsInOrder = await Products.findAll({
      where: {
        id: {
          [Op.in]: products.map((product) => product.value),
        },
      },
    });

    // Create order items for each product in the order
    const recipeItems = await Promise.all(
      productsInOrder.map(async (product, index) => {
        const { value, label, quantity } = products[index];

        // Check if the product exists
        if (!product) {
          throw new Error(`Product with ID ${value} not found`);
        }

        // Create an order item for the product
        return Ingredients.create({
          recipe_id: newRecipe.id,
          pdct_id: value,
          quantity,
          price: product.price,
          product_name: label,
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

// get all recipes
recipeRouter.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
});

//get all recipes+ ingredients
recipeRouter.get("/fullrecipes/:id", async (req, res) => {
  try {
    const recipes = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredients,
          attributes: ["id", "quantity", "product_name", "product_image"],
        },
      ],
    });
    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes with ingredients:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve recipes with ingredients" });
  }
});

//delete recipe
recipeRouter.delete("/recipe/:id", async (req, res) => {
  try {
    // Find the recipe by ID and include its associated ingredients
    const recipe = await Recipe.findByPk(req.params.id, {
      include: Ingredients,
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Delete the associated ingredients first
    await Promise.all(
      recipe.Ingredients.map(async (ingredient) => {
        await ingredient.destroy();
      })
    );

    // Then, delete the recipe
    await recipe.destroy();

    res.json({ message: "Recipe and its ingredients deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe and its ingredients:", error);
    res
      .status(500)
      .json({ error: "Failed to delete recipe and its ingredients" });
  }
});
// Route to update the ingredients and details of a recipe
// recipeRouter.put('/recipes/:recipeId', async (req, res) => {
//   const { recipeId } = req.params; // Extract recipe ID from request params
//   const { title, description, ingredients } = req.body; // Extract updated recipe details and ingredients from request body

//   try {
//     // Find the recipe by ID
//     const recipe = await Recipe.findByPk(recipeId, {
//       include: [{ model: Ingredients }],
//     });

//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     // Update the recipe details
//     await recipe.update({
//       title: title || recipe.title,
//       description: description || recipe.description,
//     });

//     // Update or delete existing ingredients
//     await Promise.all(
//       recipe.Ingredients.map(async (ingredient) => {
//         const updatedIngredientData = ingredients.find(data => data.id === ingredient.id);
//         console.log("Processing ingredient:", ingredient);
//         console.log("Updated ingredient data:", updatedIngredientData);
//         if (updatedIngredientData) {
//           // If the ingredient exists in the updated ingredients data, update it
//           await ingredient.update(updatedIngredientData);
//           console.log("Ingredient updated:", ingredient);
//         } else {
//           // If the ingredient doesn't exist in the updated ingredients data, delete it
//           await ingredient.destroy();
//           console.log("Ingredient deleted:", ingredient);
//         }
//       })
//     );

//     // Create new ingredients
//     const newIngredientsData = ingredients.filter(data => !data.id);

//     await Promise.all(
//       newIngredientsData.map(async (newIngredientData) => {
//         await Ingredients.create({
//           ...newIngredientData,
//           recipe_id: recipeId,
//         });
//       })
//     );

//     res.json({
//       message: "Recipe and ingredients updated successfully",
//       recipe,
//     });
//   } catch (error) {
//     console.error("Error updating recipe and ingredients:", error);
//     res.status(500).json({ error: "Failed to update recipe and ingredients" });
//   }
// });

//---------------------COOKED FOOD ROUTE---------------------------------

// Route to remove ingredients from stock when a recipe is clicked and save the recipe as cooked food
recipeRouter.post(
  "/updateStockAndSave",
  multerUpload.single("image"),
  async (req, res) => {
    try {
      const { recipe_id, foodName, price,quantity } = req.body;

      // Fetch all ingredients for the specified recipe
      const ingredients = await Ingredients.findAll({
        where: {
          recipe_id: recipe_id,
        },
      });
      //upload image to cloudinary

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      console.log(req.file)
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "catering",
      });
      const imageUrl = result.secure_url;
      const imageId = result.public_id;

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
      // Fetch the recipe and its ingredients
      const recipeId = req.body.recipe_id; // Ensure recipe_id is passed correctly from the request body
      const recipe = await Recipe.findOne({
        where: { id: recipeId }, // Use the correct attribute name, typically 'id'
        include: [
          {
            model: Ingredients,
            attributes: ["quantity", "product_name"],
          },
        ],
      });
      
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      

      // Create a new cooked food item
      const cookedFood = await CookedFood.create({
        recipe_id: recipe_id,
        foodName,
        image: imageUrl,
        cloudinary_id: imageId,
        price,
        quantity
      });

      // Associate the cooked food item with the recipe
      await cookedFood.setRecipe(recipe);

      res.status(201).json({
        message: "Stock updated and cooked food saved successfully",
        cookedFood,
        imagefile: req.file,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating stock or saving cooked food",
        error: error.message,
      });
    }
  }
);
//get all cooked food
recipeRouter.get('/cookedFood', async (req, res) => {
  try {
    // Fetch all cooked food items
    const cookedFood = await CookedFood.findAll();

    res.status(200).json(cookedFood);
  } catch (error) {
    console.error('Error fetching cooked food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//get notification if the product quantity less 10
// recipeRouter.get('/cookedfood/low-quantity', async (req, res) => {
//   try {
//     const lowQuantityProducts = await CookedFood.findAll({
//       where: {
//         quantity: {
//           [Op.lt]: 20 // Example threshold for low quantity
//         }
//       }
//     });
//     res.json(lowQuantityProducts);
//   } catch (error) {
//     console.error('Error fetching low quantity products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

recipeRouter.get('/cookedfood/low-quantity', async (req, res) => {
  try {
    const lowQuantityFoods = await CookedFood.findAll({
      where: {
        quantity: {
          [Sequelize.Op.lte]: 10
        }
      }
    });

    // Send SSE notification to clients
    lowQuantityFoods.forEach(food => {
      sendNotification('low_quantity_food', { foodId: food.id });
    });

    res.json(lowQuantityFoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

recipeRouter.put('/:foodId/approve', async (req, res) => {
  const { foodId } = req.params;

  try {
    const food = await CookedFood.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // Update food status to approved
    food.status = 'approved';
    await food.save();

    // Send SSE notification to clients
    sendNotification('approve_cooking', { foodId });

    res.json({ success: true, food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

recipeRouter.put('/:foodId/dismiss', async (req, res) => {
  const { foodId } = req.params;

  try {
    const food = await CookedFood.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // Update food status to dismissed
    food.status = 'dismissed';
    await food.save();

    res.json({ success: true, food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
//get a cooked food
recipeRouter.get('/cookedFood/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the cooked food item with the given ID
    const cookedFood = await CookedFood.findByPk(id,{
      include: {
        model: Recipe,
      }
    });

    if (!cookedFood) {
      return res.status(404).json({ message: 'Cooked food not found' });
    }

    res.status(200).json(cookedFood);
  } catch (error) {
    console.error('Error fetching cooked food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//delete a food item
recipeRouter.delete('/cookedFood/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the cooked food item with the given ID
    const cookedFood = await CookedFood.findByPk(id, {
      include: {
        model: Recipe,
        include: Ingredients
      }
    });

    if (!cookedFood) {
      return res.status(404).json({ message: 'Cooked food not found' });
    }

    // Loop through the ingredients of the associated recipe
    await Promise.all(cookedFood.Recipe.Ingredients.map(async (ingredient) => {
      // Find the product associated with the ingredient
      const product = await Products.findByPk(ingredient.pdct_id);
      if (!product) {
        throw new Error(`Product with ID ${ingredient.pdct_id} not found`);
      }

      // Add the removed quantity back to the product stock
      product.inStock += ingredient.quantity;
      await product.save();
    }));

    // Delete the cooked food item
    await cookedFood.destroy();

    res.status(200).json({ message: 'Cooked food deleted successfully' });
  } catch (error) {
    console.error('Error deleting cooked food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

recipeRouter.put('/cookedFood/:id',multerUpload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { foodName, price, recipe_id ,quantity} = req.body;

  try {
    // Fetch the cooked food item with the given ID
    const cookedFood = await CookedFood.findByPk(id, {
      include: {
        model: Recipe,
        include: Ingredients
      }
    });

    if (!cookedFood) {
      return res.status(404).json({ message: 'Cooked food not found' });
    }

    // Update the cooked food item attributes
    cookedFood.foodName = foodName;
    cookedFood.price = price;
    cookedFood.recipe_id = recipe_id;
    cookedFood.quantity = quantity;

    if (req.file) {
      // Delete the existing image from Cloudinary
      await cloudinary.uploader.destroy(cookedFood.cloudinary_id);

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "catering",
      });

      // Extract the new image URL from the Cloudinary response
      // existingProduct.image = result.secure_url;
      cookedFood.image = result.secure_url;
      cookedFood.cloudinary_id = result.public_id;
    }

    await cookedFood.save();

    res.status(200).json({ message: 'Cooked food updated successfully', cookedFood });
  } catch (error) {
    console.error('Error updating cooked food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// recipeRouter.patch("/cookedFood/:productId", async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const { newStock } = req.body;

//     // Validate that productId is a positive integer
//     if (!productId || isNaN(productId) || productId <= 0) {
//       return res.status(400).json({ message: "Invalid productId" });
//     }

//     // Validate that newStock is a non-negative integer
//     if (isNaN(newStock) || newStock < 0) {
//       return res.status(400).json({ message: "Invalid newStock value" });
//     }

//     // Find the product by its ID
//     const product = await CookedFood.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update the stock of the product
//     await CookedFood.update(
//       { quantity: newStock },
//       { where: { id: productId } }
//     );

//     // If the product has a recipe ID, reduce the stock of its ingredients
//     if (product.recipeId) {
//       const recipe = await Recipe.findByPk(product.recipeId);
//       if (!recipe) {
//         return res.status(404).json({ message: "Recipe not found" });
//       }

//       const recipeIngredients = await RecipeIngredients.findAll({
//         where: { recipeId: product.recipeId }
//       });

//       for (const recipeIngredient of recipeIngredients) {
//         const ingredientProduct = await CookedFood.findByPk(recipeIngredient.productId);
//         if (ingredientProduct) {
//           await CookedFood.update(
//             { quantity: ingredientProduct.quantity - (recipeIngredient.quantity * newStock) },
//             { where: { id: recipeIngredient.productId } }
//           );
//         }
//       }
//     }

//     const updatedProduct = await CookedFood.findByPk(productId);
//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error updating product stock",
//       error: error.message,
//     });
//   }
// });



module.exports = recipeRouter;
