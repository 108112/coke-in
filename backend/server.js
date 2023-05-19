const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
require('dotenv').config();
const cors = require('cors');

//////CONNECT DB//////
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect MongoDB"))
  .catch(() => console.log("disconnected MongoDB"));

//////MIDDLE WARE//////
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,PATCH,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}));
app.use(express.json());
const productRouter = require("./routes/product");
const itemRouter = require("./routes/item");
const locationRouter = require("./routes/location");
const sectionRouter = require('./routes/section')
app.use("/api/products", productRouter);
app.use("/api/items", itemRouter);
app.use("/api/locations", locationRouter);
app.use("/api/sections", sectionRouter);

app.listen(port, () => console.log(`CokeIN listening on port ${port}`));
