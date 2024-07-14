const { Schema, model } = require("mongoose");

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categoriesSchema);

module.exports = Category;
