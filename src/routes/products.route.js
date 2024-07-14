const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/is-admin");
const {
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.post("/", isAdmin, postProduct);
router.put("/:id", isAdmin, putProduct);
router.delete("/:id", isAdmin, removeProduct);

module.exports = router;
