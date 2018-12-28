const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  unit: {
    type: String,
    required: true
  }
});

module.exports = Unit = mongoose.model("unit", UnitSchema);
