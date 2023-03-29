const express = require("express");
const { tb_category, tb_product } = require("../config");
const router = express.Router();

router.get("/", (req, res) => {
  tb_category
    .findAll()
    .then((category) => {
      res.status(200).send({ status: true, category, message: "" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.get("/:id", (req, res) => {
  tb_category
    .findByPk(req.params.id)
    .then((category) => {
      res.status(200).send({ status: true, category, message: "" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.post("/", (req, res) => {
  tb_category
    .create(req.body)
    .then((category) => {
      res
        .status(200)
        .send({ status: true, category, message: "เพิ่มประเภทสินค้าสำเร็จ" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.put("/:id", (req, res) => {
  tb_category
    .findByPk(req.params.id)
    .then((category) => {
      category
        .update(req.body)
        .then(() => {
          res
            .status(200)
            .send({ status: true, message: "แก้ไขประเภทสินค้าสำเร็จ" });
        })
        .catch((err) => {
          res.status(500).send({ status: false, message: err });
        });
    })
    .catch(() => {
      res.status(500).send({ status: false, message: err });
    });
});

router.get("/list/:id", (req, res) => {
  tb_product.belongsTo(tb_category, { foreignKey: "cat_id" });
  tb_category.hasMany(tb_product, { foreignKey: "cat_id" });
  tb_product
    .findAll({
      where: { cat_id: req.params.id },
      include: [tb_category],
    })
    .then((products) => {
      res.status(200).send({ status: true, products, message: "" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.delete("/:id", (req, res) => {
  tb_category
    .findByPk(req.params.id)
    .then((category) => {
      if (category.cat_totalPro > 0) {
        res.status(200).send({
          status: false,
          message: "ไม่สามารถลบประเภทสินค้าได้มีสินค้าอยู่",
        });
      } else {
        category
          .destroy()
          .then(() => {
            res
              .status(200)
              .send({ status: true, message: "ลบประเภทสินค้าสำเร็จ" });
          })
          .catch((err) => {
            res.status(500).send({ status: false, message: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

module.exports = router;
