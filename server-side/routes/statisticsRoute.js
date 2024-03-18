const express = require("express");
const { Products, Order, OrderItems,CookedFood } = require("../models");
const statisticsRouter = express.Router();
const { Op, Sequelize } = require("sequelize");

// GET STATS

//Foods Stats
statisticsRouter.get('/food-revenue', async (req, res) => {
  try {
    // Query to calculate the total revenue for each food
    const foodRevenue = await OrderItems.findAll({
      attributes: [
        'CookedFoodId',
        [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`quantity` * `OrderItems`.`price`')), 'totalRevenue']
      ],
      include: [{
        model: CookedFood,
        attributes: ['foodName'],
      }],
      group: ['CookedFoodId']
    });

    res.json(foodRevenue);
  } catch (error) {
    console.error('Error occurred while fetching food revenue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// PRODUCT STATICTICS
// Get Products that are out of stock
statisticsRouter.get("/out-of-stock", async (req, res) => {
  try {
    const outOfStockProducts = await CookedFood.findAll({
      where: {
        quantity: 0,
      },
    });

    if (outOfStockProducts === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(outOfStockProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching out-of-stock products",
      error: error.message,
    });
  }
});

//out of stock count
statisticsRouter.get("/out-of-stock-count", async (req, res) => {
  try {
    const outOfStockProductCount = await CookedFood.count({
      where: {
        quantity: 0,
      },
    });

    res.json(outOfStockProductCount || 0);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching out-of-stock product count",
      error: error.message,
    });
  }
});

//product count
statisticsRouter.get("/total-product-count", async (req, res) => {
  try {
    const totalProductCount = await CookedFood.count();
    res.json(totalProductCount || 0);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching total product count",
      error: error.message,
    });
  }
});

// GET ORDER STATICS
// GET todays total sales
statisticsRouter.get("/today-total-sales", async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Query to calculate total sales for today
    const result = await Order.findOne({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("total")), "totalSales"]],
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
        },
      },
    });

    // Access the total sales from the result
    const totalSales = result.get("totalSales");

    res.json(totalSales || 0);
  } catch (error) {
    console.error("Error occurred while fetching total sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get today total orders
statisticsRouter.get("/today-total-orders", async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Query to count the number of orders placed today
    const totalOrders = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
        },
      },
    });

    res.json(totalOrders);
  } catch (error) {
    console.error("Error occurred while fetching total orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get the total number of products sold
statisticsRouter.get("/total-products-sold", async (req, res) => {
  try {
    // Query to calculate the total number of products sold
    const result = await OrderItems.findOne({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalProductsSold"],
      ],
    });

    // Access the total products sold from the result
    const totalProductsSold = result.get("totalProductsSold");

    res.json(totalProductsSold || 0);
  } catch (error) {
    console.error("Error occurred while fetching total products sold:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get total orders
statisticsRouter.get("/total-orders", async (req, res) => {
  try {
    const totalOrders = await Order.count();

    res.json(totalOrders || 0);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching total orders", error: error.message });
  }
});
//Get Total Product sold
statisticsRouter.get("/total-sold", async (req, res) => {
  try {
    const totalSold = await OrderItems.sum("quantity");

    res.json(totalSold || 0);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching total sold", error: error.message });
  }
});

//Get the products that have expired
statisticsRouter.get("/expired-products", async (req, res) => {
  try {
    // Get today's date
    const today = new Date();

    // Query to retrieve expired products
    const expiredProducts = await Products.findAll({
      where: {
        expire: {
          [Op.lt]: today, // Select products with expire date less than today
        },
      },
    });

    res.json(expiredProducts);
  } catch (error) {
    console.error("Error occurred while fetching expired products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get the count of expired products
statisticsRouter.get("/expired-product-count", async (req, res) => {
  try {
    // Get today's date
    const today = new Date();

    // Query to count expired products
    const expiredProductCount = await Products.count({
      where: {
        expire: {
          [Op.lt]: today, // Select products with expire date less than today
        },
      },
    });

    res.json(expiredProductCount || 0);
  } catch (error) {
    console.error(
      "Error occurred while fetching expired product count:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//amout gained from selling the poducts
statisticsRouter.get("/total-amount-sold", async (req, res) => {
  try {
    const totalAmountSold = await Order.sum("total");

    res.json(totalAmountSold || 0);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error fetching total amount sold",
        error: error.message,
      });
  }
});

module.exports = statisticsRouter;
