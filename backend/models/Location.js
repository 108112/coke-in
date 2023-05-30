const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  station: {
    type: String,
    default: "ST",
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
    type: [
      {
        name: {
          type: String,
        },
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
      },
    ],
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
