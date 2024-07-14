const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Product = model("Product", productsSchema);

module.exports = Product;
