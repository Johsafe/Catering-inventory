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

app.use("/user", authRouter);
app.use("/role", roleRouter);
app.use("/vendor", vendorRouter);
app.use("/product",productRouter);
app.use("/recipe",recipeRouter);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("server is running at port 8000");
  });
});
