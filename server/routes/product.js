const express = require("express");
const { tb_product, tb_category } = require("../config");
const router = express.Router();

router.get("/", (req, res) => {
  tb_product.belongsTo(tb_category, { foreignKey: "cat_id" });
  tb_category.hasMany(tb_product, { foreignKey: "cat_id" });
  tb_product
    .findAll({
      include: [tb_category],
    })
    .then((products) => {
      res.status(200).send({ status: true, products, message: "" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.get("/:id", (req, res) => {
  tb_product
    .findByPk(req.params.id)
    .then((product) => {
      res.status(200).send({ status: true, product, message: "" });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.post("/", (req, res) => {
  tb_category
    .findByPk(req.body.cat_id)
    .then((category) => {
      category
        .update({ cat_totalPro: category.cat_totalPro + 1 })
        .then(() => {
          tb_product
            .create(req.body)
            .then((product) => {
              res
                .status(200)
                .send({ status: true, product, message: "เพิ่มสินค้าสำเร็จ" });
            })
            .catch((err) => {
              res.status(500).send({ status: false, message: err });
            });
        })
        .catch((err) => {
          res.status(500).send({ status: false, message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

router.put("/:id", (req, res) => {
  tb_product
    .findByPk(req.params.id)
    .then((product) => {
      product
        .update(req.body)
        .then(() => {
          res.status(200).send({ status: true, message: "แก้ไขสินค้าสำเร็จ" });
        })
        .catch((err) => {
          res.status(500).send({ status: false, message: err });
        });
    })
    .catch(() => {
      res.status(500).send({ status: false, message: err });
    });
});

router.delete("/:id", (req, res) => {
  tb_product
    .findByPk(req.params.id)
    .then((product) => {
      console.log(product);
      tb_category.findByPk(product.cat_id).then((category) => {
        category
          .update({ cat_totalPro: category.cat_totalPro - 1 })
          .then(() => {
            product
              .destroy()
              .then(() => {
                res
                  .status(200)
                  .send({ status: true, message: "ลบสินค้าสำเร็จ" });
              })
              .catch((err) => {
                res.status(500).send({ status: false, message: err });
              });
          })
          .catch(() => {
            res.status(500).send({ status: false, message: err });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err });
    });
});

module.exports = router;
