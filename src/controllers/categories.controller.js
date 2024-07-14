const Joi = require("joi");
const Category = require("../models/categories.model");
const path = require("path");
const { v4: uuid } = require("uuid");

const get = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({ message: "Success", categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    const { photo } = req.files;

    const schema = Joi.object({
      name: Joi.string().min(3).max(64).required(),
      photo: Joi.required(),
    });

    const { error } = schema.validate({ name, photo });
    if (error) return res.status(400).json({ message: error.message });

    const photoName = `${uuid()}${path.extname(photo.name)}`;
    photo.mv(`${process.cwd()}/src/uploads/${photoName}`);

    const newCategory = await Category.create({
      name,
      photo: photoName,
    });

    res.status(201).json({ message: "Success!", data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { photo } = req.files;

    const photoName = `${uuid()}${path.extname(photo.name)}`;
    photo.mv(`${process.cwd()}/src/uploads/${photoName}`);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: { name: name, photo: photoName },
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", data: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", deletedCategory: deleteCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  get,
  post,
  put,
  remove,
};
