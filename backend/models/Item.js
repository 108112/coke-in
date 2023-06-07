const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  bestBefore: {
    type: String,
    required: true
  },
  receipt: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Item", ItemSchema);