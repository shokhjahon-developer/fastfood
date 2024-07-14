const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const {
  get,
  post,
  put,
  remove,
} = require("../controllers/categories.controller");

const router = Router();

router.get("/", get);
router.post("/", isAdmin, post);
router.put("/:id", isAdmin, put);
router.delete("/:id", isAdmin, remove);

module.exports = router;
