const express = require("express");
const router = express.Router();
const proRouter = require("./product");
const cateRouter = require("./category");

router.use("/products", proRouter);
router.use("/category", cateRouter);

module.exports = router;
