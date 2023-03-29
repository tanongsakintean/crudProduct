const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database/market.db",
});

const tb_product = sequelize.define("tb_product", {
  pro_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pro_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pro_price: { type: Sequelize.INTEGER, allowNull: false },
  pro_amount: { type: Sequelize.INTEGER, allowNull: false },
  cat_id: { type: Sequelize.INTEGER, allowNull: false },
});

const tb_category = sequelize.define("tb_category", {
  cat_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cat_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cat_totalPro: { type: Sequelize.INTEGER, allowNull: false },
});

sequelize.sync();

module.exports = { tb_category, tb_product };
