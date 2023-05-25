const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  station: {
    type: String,
    default: "ST"
  },
  name: {
    floor: {
      type: Number,
    },
    area: {
      type: String,
    },
  },
  sections: {
    type: Array,
    default: [],
  },
  col: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Location", LocationSchema);
