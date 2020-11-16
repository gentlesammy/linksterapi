const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { SECRET, DB_LINK, PORT } = require("./config/index");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected");
  }
);

app.listen(PORT, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.send("hello world");
});
