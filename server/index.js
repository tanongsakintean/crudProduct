const express = require("express");
const router = require("./routes");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server run on port : ${port}`);
});
