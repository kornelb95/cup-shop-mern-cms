const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});
module.exports = ProductCategory = mongoose.model(
  "productCategory",
  ProductCategorySchema
);
