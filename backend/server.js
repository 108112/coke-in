const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
require('dotenv').config();
//////CONNECT DB//////
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect MongoDB"))
  .catch(() => console.log("disconnected MongoDB"));
//////MIDDLE WARE//////
app.use(express.json());
const productRouter = require("./routes/product");
const itemRouter = require("./routes/item");
app.use("/api/products", productRouter);
app.use("/api/items", itemRouter);
//////Listen PORT//////
app.listen(port, () => console.log(`CokeIN listening on port ${port}`));