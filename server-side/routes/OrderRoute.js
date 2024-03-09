const express = require("express");
const { Op } = require("sequelize");
const orderRouter = express.Router();
const { Order,Products, OrderItems, CookedFood } = require("../models");

const generateItemId = () => {
  const characters = "ABCDEFGHIJKLMOP0123456789";
  let orderCode = "";

  // Generate seven random alphanumeric characters
  for (let i = 0; i < 3; i++) {
    orderCode += characters[Math.floor(Math.random() * characters.length)];
  }
  orderCode += Date.now().toString().slice(-3);

  return `ORD-${orderCode}`;
};


//  Route to create a new order
orderRouter.post("/order", async (req, res) => {
  try {
    const { customer, products, paymentMethod } = req.body;

    // Create a new order
    const order_no = generateItemId();
    const newOrder = await Order.create({ order_no, customer, paymentMethod });

    // Calculate total amount
    let total = 0;

    // Fetch product details for each product in the order
    const foodsInOrder = await CookedFood.findAll({
      where: {
        id: {
          [Op.in]: products.map((product) => product.CookedFoodId),
        },
      },
    });

    // Create order items for each product in the order
    const orderItems = await Promise.all(
      foodsInOrder.map(async (product, index) => {
        const { CookedFoodId, quantity } = products[index];

        // Check if the product exists
        if (!product) {
          throw new Error(`Food with ID ${CookedFoodId} not found`);
        }

        // Check if the product has sufficient stock
        if (product.quantity < quantity) {
          throw new Error(`Food with ID ${CookedFoodId} is out of stock`);
        }

        total += quantity * product.price;

        // Update product stock
        await CookedFood.update(
          { quantity: product.quantity - quantity },
          { where: { id: CookedFoodId } }
        );

        // Create an order item for the product
        const orderItem = await OrderItems.create({
          order_no: newOrder.order_no,
          CookedFoodId,
          OrderId: newOrder.id,
          quantity,
          price: product.price,
          food_name: product.foodName,
          food_image: product.image,
        });

        return orderItem;
      })
    );

    // Update total amount for the order
    newOrder.total = total;
    await newOrder.save();

    res.json({
      message: "Order created successfully",
      newOrder,
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Get all orders
orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
});

// Get order by ID
orderRouter.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItems,
          include: [CookedFood],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching order and orderitems", error: error.message });
  }
});

// Route to get an order by order_no
orderRouter.get("/order/:orderNo", async (req, res) => {
  try {
    const { orderNo } = req.params;

    // Find the order by order_no and include orderItems
    const order = await Order.findOne({ 
      where: { order_no: orderNo },
      include: [
        {
          model: OrderItems,
          include: [CookedFood],
        },
      ],
    });

    // If order is not found, return 404 status
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving order", error: error.message });
  }
});


// Get all order items
orderRouter.get("/allorders", async (req, res) => {
  try {
    // Retrieve all order items from the database
    const allOrderItems = await OrderItems.findAll();

    res.json(allOrderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching  all order items",
      error: error.message,
    });
  }
});


//Find products of a particular order
// orderRouter.get("/orders/:orderNo/products", async (req, res) => {
//   try {
//     const { orderNo } = req.params;

//     // Find the order by order_no and include orderItems
//     const orderItems = await Order.findOne({ 
//       where: { order_no: orderNo },
//       include: [Products],
//     });

//     if (!orderItems || orderItems.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No products found for the order" });
//     }

//     res.json(orderItems.map((item) => item.Product));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error fetching products for the order",
//       error: error.message,
//     });
//   }
// });


// Delete order by ID
// orderRouter.delete("/order/:orderId", async (req, res) => {
//   try {
//     const orderId = req.params.orderId;

//     // Find the order by ID
//     const order = await Order.findByPk(orderId);
//     console.log(order)

//     // If order is not found, return 404
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     // Retrieve the order items associated with the order
//     const orderItems = await OrderItems.findAll({ where: { OrderId: orderId } });
//     console.log(orderItems)

//     // Destroy the order
//     await order.destroy();

//     // Increment the quantity of cooked food for each order item
//     for (const orderItem of orderItems) {
//       const cookedFood = await CookedFood.findByPk(orderItem.CookedFoodId);
//       if (cookedFood) {
//         cookedFood.quantity += orderItem.quantity;
//         await cookedFood.save();
//       }
//     }

//     res.json({ message: "Order deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting order", error: error.message });
//   }
// });


//delete order and order items by order number

// orderRouter.delete("/orders/items/:orderNumber", async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         order_no: req.params.orderNumber,
//       },
//       include: [OrderItems],
//     });

//     if (!order) {
//       return res.status(404).json({ error: "Order number not found" });
//     }

//     // Delete the associated order items first
//     await OrderItems.destroy({
//       where: {
//         order_no: order.order_no,
//       },
//     });

//     // Then, delete the order itself
//     await order.destroy();

//     res.json({ message: "Order and products deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error deleting order", error: error.message });
//   }
// });

module.exports = orderRouter;
