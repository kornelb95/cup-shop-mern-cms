const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  }
});
module.exports = ProductType = mongoose.model("productType", ProductTypeSchema);
