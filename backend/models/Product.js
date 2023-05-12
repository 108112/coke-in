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
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  exCode: {
    type: String,
    minlength: 4,
    maxlength: 4,
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
