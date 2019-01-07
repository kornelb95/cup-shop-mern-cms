const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikedProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});
module.exports = LikedProduct = mongoose.model(
  "likedProduct",
  LikedProductSchema
);
