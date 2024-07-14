const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
