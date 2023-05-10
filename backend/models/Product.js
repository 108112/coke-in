const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 12,
    required: true,
  },
  volume: {
    type: String,
    minlength: 3,
    maxlength: 4,
    required: true,
  },
  code: {
    type: String,
    minlength: 9,
    maxlength: 9,
    unique: true,
    required: true,
  },
  maxLoad: {
    type: String,
    minlength: 2,
    maxlength: 3,
    required: true,
  }
});

module.exports = mongoose.model("Product", ProductSchema);
