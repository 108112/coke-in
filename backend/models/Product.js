const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
  code: {
    js: {
      type: String,
      maxlength: 5,
      minlength: 5,
      reqired: true,
    },
    branch: {
      type: String,
      maxlength: 4,
      minlength: 4,
      required: true
    }
  },
>>>>>>> 13148fc (update)
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
<<<<<<< HEAD
  code: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
=======
>>>>>>> 13148fc (update)
  maxLoad: {
    type: String,
    minlength: 2,
    maxlength: 3,
    required: true,
  }
});

module.exports = mongoose.model("Product", ProductSchema);
