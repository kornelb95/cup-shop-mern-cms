const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  productType: {
    type: Schema.Types.ObjectId,
    ref: "productType"
  },
  productCategory: {
    type: Schema.Types.ObjectId,
    ref: "productCategory"
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  purches: {
    type: Number,
    min: 0
  },
  productImage: {
    type: String,
    required: true
  }
});
module.exports = Product = mongoose.model("product", ProductSchema);
