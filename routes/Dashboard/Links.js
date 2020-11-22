const express = require("express");
const linkRoutes = express.Router();

linkRoutes.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = linkRoutes;
