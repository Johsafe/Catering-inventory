const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();

const db = require("./models");
const authRouter = require("./routes/AuthRoute");
const roleRouter = require("./routes/roleRoute");
const vendorRouter = require("./routes/supplierRoute");
const productRouter = require("./routes/productRoute");
const recipeRouter = require("./routes/recipeRoute");
const orderRouter = require("./routes/OrderRoute");

app.use("/user", authRouter);
app.use("/vendor", vendorRouter);
app.use("/product",productRouter);
app.use("/recipe",recipeRouter);
app.use("/order",orderRouter)

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("server is running at port 8000");
  });
});
