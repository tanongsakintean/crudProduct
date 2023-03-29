const express = require("express");
require("dotenv").config();
const Axios = require("axios");
const router = express.Router();
const baseUrl = process.env.BASEURL;

router.get("/", (req, res) => {
  Axios.get(baseUrl + "/products").then((resp) => {
    let { products } = resp.data;
    res.render("product", { products });
  });
});

router.get("/create", (req, res) => {
  Axios.get(baseUrl + "/category").then((resp) => {
    let { category } = resp.data;
    res.render("addProduct", { category });
  });
});

router.post("/create", (req, res) => {
  Axios.post(baseUrl + "/products", req.body).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/" });
  });
});

router.get("/edit/:id", async (req, res) => {
  let product = await Axios.get(baseUrl + `/products/${req.params.id}`);
  let category = await Axios.get(baseUrl + "/category");
  res.render("editProduct", {
    category: category.data.category,
    product: product.data.product,
  });
});

router.post("/edit/:id", (req, res) => {
  Axios.put(baseUrl + `/products/${req.params.id}`, req.body).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/" });
  });
});

router.get("/del/:id", (req, res) => {
  Axios.delete(baseUrl + `/products/${req.params.id}`).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/" });
  });
});

module.exports = router;
