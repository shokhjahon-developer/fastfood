const Joi = require("joi");
const Category = require("../models/categories.model");
const Product = require("../models/products.model");
const path = require("path");
const { v4: uuid } = require("uuid");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.json({ message: "Success", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const { photo } = req.files;

    const schema = Joi.object({
      name: Joi.string().min(3).max(64).required(),
      category: Joi.string().required(),
      photo: Joi.required(),
      price: Joi.string().required(),
    });

    const { error } = schema.validate({ name, category, photo, price });
    if (error) return res.status(400).json({ message: error.message });

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const photoName = `${uuid()}${path.extname(photo.name)}`;
    photo.mv(`${process.cwd()}/src/uploads/${photoName}`);

    const newProduct = await Product.create({
      name,
      category,
      photo: photoName,
      price,
    });

    res.status(201).json({ message: "Success!", data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const { photo } = req.files;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const photoName = `${uuid()}${path.extname(photo.name)}`;
    photo.mv(`${process.cwd()}/src/uploads/${photoName}`);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: { name, category, photo: photoName, price },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
};
