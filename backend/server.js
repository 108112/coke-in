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
app.use("/api/products", productRouter);
app.use("/api/items", itemRouter);

//////TEST//////
app.get('/', (req, res) => {
  res.send('hello server');
})

//////Listen PORT//////
<<<<<<< HEAD
app.listen(port, () => console.log(`CokeIN listening on port ${port}`));
=======
app.listen(port, () => console.log(`CokeIN listening on port ${port}`));
>>>>>>> 13148fc (update)
