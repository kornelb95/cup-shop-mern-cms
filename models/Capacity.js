const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CapacitySchema = new Schema({
  capacity: {
    type: Number,
    required: true
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "unit"
  }
});

module.exports = Capacity = mongoose.model("capacity", CapacitySchema);
