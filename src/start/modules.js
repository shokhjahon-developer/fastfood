require("dotenv/config");

const cors = require("cors");
const fileUpload = require("express-fileupload");

const categoriesRoute = require("../routes/categories.route");
const adminsRoute = require("../routes/auth.route");
const productsRoute = require("../routes/products.route");

const modules = (express, app) => {
  app.use(express.json());
  app.use(cors());
  app.use(fileUpload());
  app.use(express.static(`${process.cwd()}/src/uploads`));

  app.use("/api/admin", adminsRoute);
  app.use("/api/category", categoriesRoute);
  app.use("/api/products", productsRoute);
};

module.exports = modules;
