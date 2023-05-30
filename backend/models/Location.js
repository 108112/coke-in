const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
  },
  name: {
    type: String,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
});

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
    type: [SectionSchema],
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

const Location = mongoose.model("Location", LocationSchema);
const Section = mongoose.model("Section", SectionSchema);

module.exports = { Location, Section };
