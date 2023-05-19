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
    //縦に何PL入るか(56ロケ = 4 * 14なので14)
    type: Number,
    required: true,
  },
  row: {
    //横に何アイテム入るか
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Location", LocationSchema);
