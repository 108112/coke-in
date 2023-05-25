const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  name: {
    type: String,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Section", SectionSchema);
