const express = require("express");
require("dotenv").config();
const Axios = require("axios");
const router = express.Router();
const baseUrl = process.env.BASEURL;

router.get("/", (req, res) => {
  Axios.get(baseUrl + "/category").then((resp) => {
    let { category } = resp.data;
    res.render("category", { category });
  });
});

router.get("/create", (req, res) => {
  res.render("addCategory");
});

router.post("/create", (req, res) => {
  Axios.post(baseUrl + "/category", req.body).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/category" });
  });
});

router.get("/edit/:id", async (req, res) => {
  let category = await Axios.get(baseUrl + `/category/${req.params.id}`);
  res.render("editCategory", {
    category: category.data.category,
  });
});

router.get("/list/:id", async (req, res) => {
  let pro = await Axios.get(baseUrl + `/category/list/${req.params.id}`);
  res.render("list", {
    products: pro.data.products,
  });
});

router.post("/edit/:id", (req, res) => {
  Axios.put(baseUrl + `/category/${req.params.id}`, req.body).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/category" });
  });
});

router.get("/del/:id", (req, res) => {
  Axios.delete(baseUrl + `/category/${req.params.id}`).then((resp) => {
    let { message } = resp.data;
    res.render("alert", { message, page: "/category" });
  });
});

module.exports = router;
