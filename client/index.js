const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
